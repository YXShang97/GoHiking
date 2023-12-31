const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const HikingTrail = require("../models/hikingtrail");

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/hiking-trail";
// const dbUrl = "mongodb://127.0.0.1:27017/hiking-trail";
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await HikingTrail.deleteMany({});
  for (let i = 0; i < 500; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const trail = new HikingTrail({
      author: "64cafcc1959a8338f6b08520",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // image: "https://source.unsplash.com/collection/371513",
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia nesciunt eos facilis quo laboriosam earum libero vero neque laudantium? Alias saepe deserunt distinctio. Quidem iure cum tenetur praesentium iusto voluptas?",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dxs1ss1av/image/upload/v1691082564/GoHiking/vjjigeucuj7vjwkrrmxp.jpg",
          filename: "GoHiking/vjjigeucuj7vjwkrrmxp",
        },
        {
          url: "https://res.cloudinary.com/dxs1ss1av/image/upload/v1691082564/GoHiking/drelleonh9npx6wmjgdn.jpg",
          filename: "GoHiking/drelleonh9npx6wmjgdn",
        },
      ],
    });
    await trail.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
