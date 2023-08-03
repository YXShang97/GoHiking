const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const HikingTrail = require("../models/hikingtrail");
const Review = require("../models/review");

const catchAsync = require("../utils/catchAsync");

router.post(
  "/",
  isLoggedIn,
  validateReview,
  catchAsync(async (req, res) => {
    const hikingtrail = await HikingTrail.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    hikingtrail.reviews.push(review);
    await review.save();
    await hikingtrail.save();
    req.flash("success", "Created new review!");
    res.redirect(`/hikingtrails/${hikingtrail._id}`);
  })
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await HikingTrail.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Successfully deleted review!");
    res.redirect(`/hikingtrails/${id}`);
  })
);

module.exports = router;
