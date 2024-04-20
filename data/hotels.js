const hotelsData = [
  {
    hotelName: "Grand Plaza Hotel",
    location: "New York City",
    hotelChain: "Luxury Collection",
    images: [
      "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3460599/pexels-photo-3460599.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    price: 250,
    maxGuestsAllowed: 2,
    description:
      " A luxurious hotel in the heart of New York City offering Deluxe Suite accommodations with amenities such as a king-sized bed, flat-screen TV, complimentary breakfast, access to swimming pool and gym, and valet parking. Rated 4.7 with 350 reviews. Cancellation policy allows free cancellation up to 48 hours before check-in.",
    roomType: "Deluxe Suite",
    amenities: [
      "🛏️ King-sized bed",
      "📺 Flat-screen TV",
      "🌐 Free Wi-Fi",
      "🍳 Complimentary breakfast",
      "🏊‍♂️ Access to swimming pool",
      "🏋️‍♀️ Gym",
      "🚗 Valet parking",
    ],
    latitude: 40.7128, // New York City latitude
    longitude: -74.006, // New York City longitude

    policies: [
      "Cancellation policy: Free cancellation up to 48 hours before check-in.",
    ],
    additionalServices: [
      "🍽️ In-room dining",
      "🧖‍♀️ Spa services",
      "🚖 Airport shuttle",
    ],
    description:
      "Dive into the perfect blend of elegance and performance with the 2017 Toyota Corolla. This sedan is a beacon of reliability, boasting a sleek, aerodynamic exterior that cuts through the air with grace. With its deep blue hue and polished finish, the Corolla makes a statement on the roads without saying a word.",
  },
  {
    hotelName: "Grand Plaza Hotel",
    location: "New York City",
    hotelChain: "Luxury Collection",
    images: [
      "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3460599/pexels-photo-3460599.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    price: 350,
    maxGuestsAllowed: 3,
    description:
      "Experience luxury at The Ritz-Carlton in Los Angeles with its Luxury Suite accommodations featuring amenities like a king-sized bed, flat-screen TV, free Wi-Fi, complimentary breakfast, access to swimming pool and gym, and valet parking. Rated 4.5 with 280 reviews.",
    roomType: "Luxury Suite",
    amenities: [
      "🛏️ King-sized bed",
      "📺 Flat-screen TV",
      "🌐 Free Wi-Fi",
      "🍳 Complimentary breakfast",
      "🏊‍♂️ Access to swimming pool",
      "🏋️‍♀️ Gym",
      "🚗 Valet parking",
    ],
    latitude: 40.7128, // New York City latitude
    longitude: -74.006, // New York City longitude
    policies: [
      "Cancellation policy: Free cancellation up to 48 hours before check-in.",
    ],
    additionalServices: [
      "🍽️ In-room dining",
      "🧖‍♀️ Spa services",
      "🚖 Airport shuttle",
    ],
  },
  {
    hotelName: "Four Seasons Resort",
    location: "Maldives",
    hotelChain: "Four Seasons",
    images: [
      "https://images.unsplash.com/photo-1600359462127-b18ea29c4c29",
      "four_seasons_2.jpg",
      "four_seasons_3.jpg",
    ],
    price: 1000,
    maxGuestsAllowed: 2,
    roomType: "Beach Villa",
    description:
      "Experience luxury at The Ritz-Carlton in Los Angeles with its Luxury Suite accommodations featuring amenities like a king-sized bed, flat-screen TV, free Wi-Fi, complimentary breakfast, access to swimming pool and gym, and valet parking. Rated 4.5 with 280 reviews.",

    amenities: [
      "🛏️ King-sized bed",
      "📺 Flat-screen TV",
      "🌐 Free Wi-Fi",
      "🍳 Complimentary breakfast",
      "🏊‍♂️ Access to private beach",
      "🏋️‍♀️ Gym",
      "🍹 Beachside bar",
    ],
    latitude: 3.2028, // Maldives latitude
    longitude: 73.2207, // Maldives longitude
    rating: 4.9,
    noOfReviews: 500,
    policies: [
      "Cancellation policy: Free cancellation up to 7 days before check-in.",
    ],
    additionalServices: [
      "🚤 Water sports",
      "🍱 All-inclusive dining",
      "🛳️ Sunset cruise",
    ],
  },
];

module.exports = hotelsData;
