const express = require("express");
const Joi = require("joi");
const { User, ValidateUser } = require("../models/user");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const router = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const nodemailer = require("nodemailer");
//Get Users List


const { storage } = require("../config/firebase"); // Assuming you have a Firebase configuration file

// Function to upload file to Firebase and return the URL
async function uploadToFirebase(file) {
  console.log("sdfagd", file.name)

  const filename = `${Date.now()}_${file.name}`;
  const blob = storage.bucket().file(filename);
  const blobStream = blob.createWriteStream({
    metadata: { contentType: file.mimetype },
  });

  await new Promise((resolve, reject) => {
    blobStream.on('error', (error) => {
      console.error("Error uploading file to Firebase:", error);
      reject(error);
    });
    blobStream.on('finish', resolve);
    blobStream.end(file.data);
  });
  await blob.makePublic();
  return `https://storage.googleapis.com/${storage.bucket().name}/${filename}`;
}


router.post("/register", async (req, res) => {
  const { error } = ValidateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  console.log("Received files", req.files);
  const { image, idCardImage } = req.files || {};

  console.log("Image", image);
  console.log("idCardImage", idCardImage);

  try {
    let exists = await User.findOne({ email: req.body.email });
    if (exists) {
      return res.status(400).send("User already exists!");
    }

    // Initialize an array to store image URLs or empty strings
    let imageUrls = [];

    if (image) {
      const imageUrl = await uploadToFirebase(image);
      imageUrls.push(imageUrl);
    } else {
      imageUrls.push(""); // Push an empty string if no image
    }

    if (idCardImage) {
      const idCardImageUrl = await uploadToFirebase(idCardImage);
      imageUrls.push(idCardImageUrl);
    } else {
      imageUrls.push(""); // Push an empty string if no ID card image
    }

    console.log("Uploaded Image URLs", imageUrls);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      image: imageUrls[0], // First URL or empty string
      role: req.body.role,
      accountName: req.body.accountName,
      idCardImage: imageUrls[1], // Second URL or empty string
      address: req.body.address,
      accountNumber: req.body.accountNumber,
      bankName: req.body.bankName,
    });

    await user.save();
    const token = user.generateAuthToken();
    res
      .header("x-auth-token", token)
      .status(200)
      .send(_.pick(user, [
        "_id", "name", "email", "image", "role", "phone", "accountName", "idCardImage", "address", "accountNumber", "bankName"
      ]));
  } catch (ex) {
    console.log(ex);
    res.status(400).send(ex.message);
  }
});





router.post("/login", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Invalid.");
    } else {
      const salt = await bcrypt.genSalt(10);
      const isValid = await bcrypt.compare(req.body.password, user.password);

      if (!isValid) {
        return res.status(400).send("Invalid email or password.");
      }
      const token = user.generateAuthToken();
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
        token: token,
        phone: user.phone ? user.phone : undefined,
        accountName: user.accountName ? user.accountName : undefined,
        idCardImage: user.idCardImage ? user.idCardImage : undefined,
        address: user.address ? user.address : undefined,
        accountNumber: user.accountNumber ? user.accountNumber : undefined,
        bankName: user.bankName ? user.bankName : undefined,
      });
    }
  } catch (ex) {
    res.status(400).send(ex.message);
  }
});




router.post("/resetUserInfo", async (req, res) => {
  const { _id, name, password } = req.body;
  console.log("kkljhjkhkj", req.files);
  const file = req.files?.image;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name) user.name = name;
    if (password) user.password = password;
    if (file) {
      const imageUrl = await uploadToFirebase(file);
      user.image = imageUrl;
    }

    await user.save();
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});


const validateUser = (user) => {
  const schema = {
    email: Joi.string().email().required().email(),
    password: Joi.string().min(8).max(255).required(),
  };

  return Joi.validate(user, schema);
};
function compare(s1, s2) {
  if (s1 == s2) {
    return true;
  }
  return false;
}

async function sendResetCodeEmail(email, code) {
  console.log("Receiver Email is:- " + email);

  const password = "cmno mkvn sdjp pvlj";
  const port = 587;

  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: port, // or your SMTP server port
      secure: false, // false for TLS - as a boolean not string - if true, use port 465
      auth: {
        user: "travlix567@gmail.com",
        pass: password,
      },
    });

    // Define email options
    let mailOptions = {
      from: "travlix567@gmail.com",
      to: email, // Receiver address
      subject: "Reset Password", // Email subject
      text: `Your reset code is ${code}`, // Email body
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Create a function to remove resetCode from users after 20 minutes
const removeExpiredResetCodes = async () => {
  // Calculate the timestamp 20 minutes ago
  console.log("Removing resetCode");

  try {
    // Find users with resetCode set and created before 20 minutes ago
    const usersToUpdate = await User.find({
      resetCode: { $exists: true },
    });

    // Loop through users and remove resetCode
    for (const user of usersToUpdate) {
      user.resetCode = undefined; // Or you can use $unset to remove the property
      await user.save();
      console.log("Done and Dusted!!");
    }
  } catch (error) {
    console.error("Error removing expired reset codes:", error);
  }
};

// Call the function every 3 minutes

router.post("/forget-password", async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Generate random code
    const randomCode = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit random code

    // Set the resetCode property of the user object
    user.resetCode = randomCode;

    // Save the user object back to the database
    await user.save();

    // Send email with reset code
    await sendResetCodeEmail(email, randomCode);
    setTimeout(removeExpiredResetCodes, 3 * 60 * 1000);
    res.status(200).send(true);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.post("/reset-password", async (req, res) => {
  const { email, resetCode, newPassword } = req.body;

  console.log(email, resetCode, newPassword);

  try {
    // Find user by email and reset code
    const user = await User.findOne({ email, resetCode });

    if (!user) {
      return res.status(400).send("Invalid reset code");
    }

    // Reset password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await User.updateOne(
      { _id: user._id },
      { $set: { password: hashedPassword } }
    );

    // Clear the reset code from the database after password reset
    await User.updateOne({ _id: user._id }, { $unset: { resetCode: "" } });

    res.status(200).send("Password reset successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
router.put("/updateRole", async (req, res) => {
  try {
    const { ownerId } = req.body;
    console.log(ownerId);

    // Find the user by ID
    let user = await User.findById(ownerId);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Check if the requester is a club owner and update the role
    if (user.role === "clubOwner") {
      user.role = "user";
      user.isTourOwner = true;
      await user.save();
      return res.status(200).send(user);
    } else {
      return res
        .status(403)
        .send("You are not authorized to update this user's role.");
    }
  } catch (ex) {
    res.status(400).send(ex.message);
  }
});

router.put("/updateRoleForUser", async (req, res) => {
  try {
    const { ownerId } = req.body;

    // Find the user by ID
    let user = await User.findById(ownerId);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    // Check if the requester is a club owner and update the role
    if (user.role === "user") {
      user.role = "clubOwner";
      user.isTourOwner = false;
      await user.save();
      return res.status(200).send(user);
    } else {
      return res
        .status(403)
        .send("You are not authorized to update this role.");
    }
  } catch (ex) {
    res.status(400).send(ex.message);
  }
});

router.put("/change-password", async (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;

  try {
    // Find user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if old password matches
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);

    if (!isValidPassword) {
      return res.status(400).send("Old password is incorrect");
    }

    

    // Update the user's password
    user.password = newPassword;
    await user.save();

    res.status(200).send("Password changed successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
module.exports = router;
