const { model } = require("mongoose");
const HikingTrail = require("../models/hikingtrail");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const hikingtrails = await HikingTrail.find({});
  res.render("hikingtrails/index", { hikingtrails });
};

module.exports.renderNewForm = (req, res) => {
  res.render("hikingtrails/new");
};

module.exports.createHikingTrail = async (req, res) => {
  const hikingtrail = new HikingTrail(req.body.hikingtrail);
  // console.log(req.files);
  hikingtrail.images = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));
  // console.log(hikingtrail);
  hikingtrail.author = req.user._id;
  await hikingtrail.save();
  req.flash("success", "Successfully made a new hiking trail!");
  res.redirect(`/hikingtrails/${hikingtrail._id}`);
};

module.exports.showHikingTrail = async (req, res) => {
  const hikingtrail = await HikingTrail.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  if (!hikingtrail) {
    req.flash("error", "Cannot find the hiking trail!");
    return res.redirect("/hikingtrails");
  }
  res.render("hikingtrails/show", { hikingtrail });
};

module.exports.renderEditForm = async (req, res) => {
  const hikingtrail = await HikingTrail.findById(req.params.id);
  if (!hikingtrail) {
    req.flash("error", "Cannot find the hiking trail!");
    return res.redirect("/hikingtrails");
  }
  res.render("hikingtrails/edit", { hikingtrail });
};

module.exports.updateHikingTrail = async (req, res) => {
  const { id } = req.params;
  const hikingtrail = await HikingTrail.findByIdAndUpdate(id, {
    ...req.body.hikingtrail,
  });
  // console.log(req.files);
  const imgs = req.files.map((f) => ({
    url: f.path,
    filename: f.filename,
  }));

  hikingtrail.images.push(...imgs);
  await hikingtrail.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await hikingtrail.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }
  req.flash("success", "Successfully updated hiking trail!");
  res.redirect(`/hikingtrails/${hikingtrail._id}`);
};

module.exports.deleteHikingTrail = async (req, res) => {
  const { id } = req.params;
  await HikingTrail.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted hiking trail!");
  res.redirect("/hikingtrails");
};
