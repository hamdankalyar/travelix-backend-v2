const packagesData = [
  {
    place: "Murree",
    title: "Sunny Beaches",
    images: ["neom3.jpg", "neom2.jpg", "neom4.jpg"],
    duration: "3 days & 2 nights",
    personsAllowed: 2,
    price: 15000,
    amenities: [
      "Beachfront view 🏖️",
      "Complimentary breakfast 🍳",
      "Homestays with local families 🏡",
      "Private chauffeur service 🚗",
      "Spa and wellness treatments 💆",
      "Gourmet dining experiences 🍷",
      "Exclusive access to cultural events 🎭",
      "Luxurious cruise or yacht trip ⛴️",
    ],

    availableDates: [
      {
        startDate: new Date("2024-01-15"),
        finishDate: new Date("2024-01-18"),
      },
      {
        startDate: new Date("2024-01-22"),
        finishDate: new Date("2024-01-25"),
      },
    ],

    city: "Goa, India",
    description:
      "Indulge in the serene charm of Goa's sun-kissed beaches, where every moment is a delightful embrace of relaxation and tranquility. Embrace the warm sands beneath your feet as you bask in the golden glow of the sun, casting its radiant hues upon the azure waters of the Arabian Sea. Experience the vibrant coastal culture as you stroll along the palm-fringed shores, where the rhythmic sounds of the waves create a soothing melody. Engage in exhilarating water sports or simply unwind with a refreshing drink in hand, savoring the panoramic vistas that stretch to the horizon. Immerse yourself in the laid-back ambiance of beachside shacks, where delectable seafood delights await to tantalize your taste buds. Discover hidden coves and secret alcoves that offer moments of solitude amidst nature's grandeur. Whether seeking adventure or seeking solace, Goa's beaches offer a perfect escape, promising unforgettable memories etched against a backdrop of sun, sand, and sea.",
    latitude: 33.907,
    longitude: 73.3943,
    rating: 4.5,
    noOfReviews: 21,
  },
  {
    place: "Kashmir",
    title: "Mountain Retreat",
    images: ["neom1.jpg", "neom5.jpg", "neom6.jpg", "neom7.jpg"],
    duration: "7 days & 6 nights",
    personsAllowed: 4,
    price: 30000,
    amenities: [
      "Mountain view 🏔️",
      "Guided hiking tours 🥾",
      "Local cuisine tasting 🍲",
      "Dance and music shows 🎶",
      "Guided historical city tours 🏛️",
      "Visits to iconic landmarks 🗼",
      "Cultural workshops and classes 🎨",
    ],
    availableDates: [
      {
        startDate: new Date("2024-01-15"),
        finishDate: new Date("2024-01-18"),
      },
      {
        startDate: new Date("2024-01-22"),
        finishDate: new Date("2024-01-25"),
      },
    ],
    city: "Manali, Himachal Pradesh, India",
    description:
      "Embark on a journey to the serene mountains of Manali, where majestic peaks pierce the cerulean sky and lush valleys unfold in all their verdant splendor. Experience a retreat from the hustle and bustle of everyday life as you immerse yourself in the tranquil embrace of nature's bounty. Traverse winding pathways adorned with vibrant flora, each step leading you closer to the heart of this enchanting paradise.",
    latitude: 33.907,
    longitude: 73.3943,
    rating: 4,
    noOfReviews: 10,
  },
  {
    place: "Lahore",
    title: "Historic City Tour",
    images: ["akira.jpg", "colin.jpg", "oscar.jpg", "neom5.jpg"],
    duration: "4 days & 3 nights",
    price: 18000,
    personsAllowed: 5,
    amenities: [
      "City guide included 🗺️",
      "Cultural experience 🏛️",
      "Traditional music and dance performances 🎶",
      "Local handicraft shopping 🛍️",
      "Cooking classes for regional cuisine 🍳",
      "Historical reenactments and festivals 🎉",
      "Historical reenactments and festivals 🎉",
      "Historical reenactments and festivals 🎉",
      "Historical reenactments and festivals 🎉",
      "Historical reenactments and festivals 🎉",
      "Historical reenactments and festivals 🎉",
      "Historical reenactments and festivals 🎉",
      "Historical reenactments and festivals 🎉",
      "Historical reenactments and festivals 🎉",
      "Historical reenactments and festivals 🎉",
    ],

    availableDates: [
      {
        startDate: new Date("2024-01-15"),
        finishDate: new Date("2024-01-18"),
      },
      {
        startDate: new Date("2024-01-22"),
        finishDate: new Date("2024-01-25"),
      },
    ],
    city: "Rome, Italy",
    description:
      "Embark on an enriching journey through the storied streets of Rome, where the echoes of ancient history resonate with every step. Delve into the rich tapestry of the Eternal City's past as our knowledgeable guides unveil its timeless secrets and captivating tales.   ",
    latitude: 33.907,
    longitude: 73.3943,
    rating: 5,
    noOfReviews: 8,
  },
];

module.exports = packagesData;
