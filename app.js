const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const catchAsync = require("./utils/catchAsync");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const HikingTrail = require("./models/hikingtrail");

mongoose.connect("mongodb://127.0.0.1:27017/hiking-trail");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get(
  "/hikingtrails",
  catchAsync(async (req, res) => {
    const hikingtrails = await HikingTrail.find({});
    res.render("hikingtrails/index", { hikingtrails });
  })
);

app.get("/hikingtrails/new", (req, res) => {
  res.render("hikingtrails/new");
});

app.post(
  "/hikingtrails",
  catchAsync(async (req, res) => {
    const hikingtrail = new HikingTrail(req.body.hikingtrail);
    await hikingtrail.save();
    res.redirect(`/hikingtrails/${hikingtrail._id}`);
  })
);

app.get(
  "/hikingtrails/:id",
  catchAsync(async (req, res) => {
    const hikingtrail = await HikingTrail.findById(req.params.id);
    res.render("hikingtrails/show", { hikingtrail });
  })
);

app.get(
  "/hikingtrails/:id/edit",
  catchAsync(async (req, res) => {
    const hikingtrail = await HikingTrail.findById(req.params.id);
    res.render("hikingtrails/edit", { hikingtrail });
  })
);

app.put(
  "/hikingtrails/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const hikingtrail = await HikingTrail.findByIdAndUpdate(id, {
      ...req.body.hikingtrail,
    });
    res.redirect(`/hikingtrails/${hikingtrail._id}`);
  })
);

app.delete(
  "/hikingtrails/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await HikingTrail.findByIdAndDelete(id);
    res.redirect("/hikingtrails");
  })
);

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
