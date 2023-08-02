const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { reviewSchema } = require("../schemas");

const ExpressError = require("../utils/ExpressError");
const HikingTrail = require("../models/hikingtrail");
const Review = require("../models/review");

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.post(
  "/",
  validateReview,
  catchAsync(async (req, res) => {
    const hikingtrail = await HikingTrail.findById(req.params.id);
    const review = new Review(req.body.review);
    hikingtrail.reviews.push(review);
    await review.save();
    await hikingtrail.save();
    req.flash("success", "Created new review!");
    res.redirect(`/hikingtrails/${hikingtrail._id}`);
  })
);

router.delete(
  "/:reviewId",
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await HikingTrail.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted review!");
    res.redirect(`/hikingtrails/${id}`);
  })
);

module.exports = router;
