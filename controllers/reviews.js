const { model } = require("mongoose");
const HikingTrail = require("../models/hikingtrail");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  const hikingtrail = await HikingTrail.findById(req.params.id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  hikingtrail.reviews.push(review);
  await review.save();
  await hikingtrail.save();
  req.flash("success", "Created new review!");
  res.redirect(`/hikingtrails/${hikingtrail._id}`);
};

module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await HikingTrail.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted review!");
  res.redirect(`/hikingtrails/${id}`);
};
