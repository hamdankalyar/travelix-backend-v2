const vehicleBookingsData = [
  {
    bookedItem: {
      item: "6613fc9a374321d2bdbfa96d", // Replace with valid ObjectId of vehicle
      price: 1000,
      bookingDate: {
        startDate: new Date("2024-04-10"),
        finishDate: new Date("2024-04-15"),
      },
    },
    bookedUserInfo: {
      fullName: "John Doe",
      cnic: "12345-1234567-1",
      gender: "Male",
    },
    paymentType: "Credit Card",
    isStatus: false,
    bookingAt: new Date("2024-04-05"),
  },
  {
    bookedItem: {
      item: "6613fc9a374321d2bdbfa96d", // Replace with valid ObjectId of vehicle
      price: 1500,
      bookingDate: {
        startDate: new Date("2024-05-01"),
        finishDate: new Date("2024-05-05"),
      },
    },
    bookedUserInfo: {
      fullName: "Jane Smith",
      cnic: "54321-7654321-2",
      gender: "Female",
    },
    paymentType: "PayPal",
    isStatus: true,
    bookingAt: new Date("2024-04-07"),
  },
  {
    bookedItem: {
      item: "6613fc9a374321d2bdbfa96d", // Replace with valid ObjectId of vehicle
      price: 1200,
      bookingDate: {
        startDate: new Date("2024-05-20"),
        finishDate: new Date("2024-05-25"),
      },
    },
    bookedUserInfo: {
      fullName: "Alice Johnson",
      cnic: "98765-0987654-3",
      gender: "Female",
    },
    paymentType: "Cash",
    isStatus: false,
    bookingAt: new Date("2024-04-10"),
  },
];

module.exports = vehicleBookingsData;
