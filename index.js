


const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectDb = require("./config/db");
const users = require("./routes/users");
const tours = require("./routes/tourPackage");
const payments = require("./routes/payments");
const bookings = require("./routes/booking");
const hotels = require("./routes/hotels");
const vehicle = require("./routes/vehicle");
const vehicleBooking = require("./routes/vehicleBooking");
const hotelBooking = require("./routes/hotelBooking");
const reviews = require("./routes/feedback");
const response = require("./routes/responseReview");
const auth = require("./routes/auth");
const admin = require('firebase-admin');
const serviceAccount = require('./travelix-37d94-firebase-adminsdk-yf3yn-f9de911052.json'); // Adjust path as necessary
const app = express();
const fileUpload = require('express-fileupload');

dotenv.config();
connectDb();

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV == "development") {
  app.use(morgan("tiny"));
}

// Check if Firebase app is already initialized
if (admin.apps.length === 0) { // If no app is initialized, initialize a new app
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://travelix-37d94.appspot.com" // Replace with your actual bucket URL
  });
}

const bucket = admin.storage().bucket();

app.get("/", (req, res) => {
  res.status(200).send("Travelix!");
});



app.post("/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // Check if `photos` is an array and handle accordingly
  let files = req.files.photos;
  if (!Array.isArray(files)) {
    files = [files];
  }

  const uploadPromises = files.map(file => {
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const blob = bucket.file(filename);

    return new Promise((resolve, reject) => {
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      blobStream.on('error', err => reject(err));

      blobStream.on('finish', () => {
        // Set the file to be publicly readable
        blob.makePublic().then(() => {
          // Assemble the public URL for accessing the file
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          resolve(publicUrl);
        }).catch(err => reject(err));
      });

      blobStream.end(file.data);
    });
  });

  Promise.all(uploadPromises)
    .then(urls => {
      res.status(200).send(urls);
    })
    .catch(error => {
      res.status(500).send({ message: 'Could not upload the files', error: error.message });
    });
});

app.use("/api/vehicle/booking", vehicleBooking);
app.use("/api/hotel/booking", hotelBooking);

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/tours", tours);
app.use("/api/payments", payments);
app.use("/api/bookings", bookings);
app.use("/api/hotels", hotels);
app.use("/api/vehicle", vehicle);
app.use("/api/reviews", reviews);
app.use("/api/responses", response);

const port = process.env.PORT || 4000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`The app is listening on ${port} in ${process.env.NODE_ENV} mode`);
  });
}

module.exports = app; // Export the app for serverless function usage in Vercel

