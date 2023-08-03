const express = require("express");
const router = express.Router();
const hikingtrails = require("../controllers/hikingtrails");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateHikingTrail } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

const HikingTrail = require("../models/hikingtrail");

router
  .route("/")
  .get(catchAsync(hikingtrails.index))
  .post(
    isLoggedIn,
    upload.array("image"),
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
    upload.array("image"),
    // validateHikingTrail,
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
