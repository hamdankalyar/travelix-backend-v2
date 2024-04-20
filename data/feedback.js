const feedbackData = [
  {
    user: "6616ef806d2f432fc8b4d049", // ObjectId of the user who posted the review
    targetId: "6616fcb495eff00cb5bfe784", // ObjectId of the car being reviewed
    rating: 4,
    comment:
      "Great car! Smooth ride and very comfortable. GPS was a lifesaver.",
    createdAt: new Date("2022-07-28T08:30:00Z"),
  },
  {
    user: "6611c73223926fe85b01ed6f", // ObjectId of the user who posted the review
    targetId: "6611c73323926fe85b01ed77", // ObjectId of the car being reviewed
    rating: 4,
    comment:
      "Great car! Smooth ride and very comfortable. GPS was a lifesaver.",
    createdAt: new Date("2022-07-28T08:30:00Z"),
  },
];

module.exports = feedbackData;
