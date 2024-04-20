const bookingsData = [
  {
    user: "609b39d8f2bfb52e9cf462b8", // User ID
    bookedItem: {
      item: "609b3a6ef2bfb52e9cf462bb", // Tour ID
      price: 100, // Price
      numberOfPersons: 2, // Number of persons
      tourDate: {
        startDate: new Date("2024-04-10T09:00:00Z"), // Start date
        finishDate: new Date("2024-04-15T09:00:00Z"), // Finish date
      },
    },
    bookedUserInfo: {
      fullName: "John Doe",
      cnic: "12345-1234567-1",
      gender: "Male",
    },
    travellersInfo: [
      {
        email: "john@example.com",
        cnic: "12345-1234567-1",
        number: "1234567890",
      },
      {
        email: "jane@example.com",
        cnic: "98765-7654321-2",
        number: "0987654321",
      },
    ],
    paymentType: "Credit Card",
    isStatus: true,
    bookingAt: new Date("2024-04-09T08:00:00Z"), // Booking date
  },
  {
    user: "609b39d8f2bfb52e9cf462b9", // User ID
    bookedItem: {
      item: "609b3a6ef2bfb52e9cf462bc", // Tour ID
      price: 150, // Price
      numberOfPersons: 1, // Number of persons
      tourDate: {
        startDate: new Date("2024-04-20T09:00:00Z"), // Start date
        finishDate: new Date("2024-04-25T09:00:00Z"), // Finish date
      },
    },
    bookedUserInfo: {
      fullName: "Jane Smith",
      cnic: "98765-7654321-2",
      gender: "Female",
    },
    travellersInfo: [
      {
        email: "jane@example.com",
        cnic: "98765-7654321-2",
        number: "0987654321",
      },
    ],
    paymentType: "PayPal",
    isStatus: true,
    bookingAt: new Date("2024-04-19T08:00:00Z"), // Booking date
  },
];

module.exports = bookingsData;
