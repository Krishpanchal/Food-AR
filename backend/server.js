const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");

process.on("uncaughtException", (err) => {
  console.log("Unhandled Exception 💥 Shutting Down");
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful!"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`App is running of port ${port}...`);
});
