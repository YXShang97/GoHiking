const express = require("express");
const router = express.Router();
const hikingtrails = require("../controllers/hikingtrails");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateHikingTrail } = require("../middleware");

const HikingTrail = require("../models/hikingtrail");

router
  .route("/")
  .get(catchAsync(hikingtrails.index))
  .post(
    isLoggedIn,
    validateHikingTrail,
    catchAsync(hikingtrails.createHikingTrail)
  );

router.get("/new", isLoggedIn, hikingtrails.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(hikingtrails.showHikingTrail))
  .put(
    isLoggedIn,
    isAuthor,
    validateHikingTrail,
    catchAsync(hikingtrails.updateHikingTrail)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(hikingtrails.deleteHikingTrail));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(hikingtrails.renderEditForm)
);

module.exports = router;
