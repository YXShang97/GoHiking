const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { hikingtrailSchema } = require("../schemas");
const { isLoggedIn } = require("../middleware");

const ExpressError = require("../utils/ExpressError");
const HikingTrail = require("../models/hikingtrail");

const validateHikingTrail = (req, res, next) => {
  const { error } = hikingtrailSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router.get(
  "/",
  catchAsync(async (req, res) => {
    const hikingtrails = await HikingTrail.find({});
    res.render("hikingtrails/index", { hikingtrails });
  })
);

router.get("/new", isLoggedIn, (req, res) => {
  res.render("hikingtrails/new");
});

router.post(
  "/",
  isLoggedIn,
  validateHikingTrail,
  catchAsync(async (req, res) => {
    const hikingtrail = new HikingTrail(req.body.hikingtrail);
    await hikingtrail.save();
    req.flash("success", "Successfully made a new hiking trail!");
    res.redirect(`/hikingtrails/${hikingtrail._id}`);
  })
);

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const hikingtrail = await HikingTrail.findById(req.params.id).populate(
      "reviews"
    );
    if (!hikingtrail) {
      req.flash("error", "Cannot find the hiking trail!");
      return res.redirect("/hikingtrails");
    }
    res.render("hikingtrails/show", { hikingtrail });
  })
);

router.get(
  "/:id/edit",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const hikingtrail = await HikingTrail.findById(req.params.id);
    if (!hikingtrail) {
      req.flash("error", "Cannot find the hiking trail!");
      return res.redirect("/hikingtrails");
    }
    res.render("hikingtrails/edit", { hikingtrail });
  })
);

router.put(
  "/:id",
  isLoggedIn,
  validateHikingTrail,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const hikingtrail = await HikingTrail.findByIdAndUpdate(id, {
      ...req.body.hikingtrail,
    });
    req.flash("success", "Successfully updated hiking trail!");
    res.redirect(`/hikingtrails/${hikingtrail._id}`);
  })
);

router.delete(
  "/:id",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await HikingTrail.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted hiking trail!");
    res.redirect("/hikingtrails");
  })
);

module.exports = router;
