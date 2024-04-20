const { Tour } = require("./models/tourPackage");
const { TravelClub } = require("./models/travelClub");
const { User } = require("./models/user");
const { Hotel } = require("./models/hotel");
const { Vehicle } = require("./models/vehicle");
const { HotelBooking } = require("./models/hotelbooking");
const { Feedback } = require("./models/feedback");
const { Response } = require("./models/responseSchema");
const { HotelOwner } = require("./models/hotelOwner");
const { VehicleOwner } = require("./models/vehicleOwner");
const { Booking } = require("./models/booking");
const connectDb = require("./config/db");
const usersData = require("./data/users");
const packagesData = require("./data/packages");
const travelClubsData = require("./data/travelClubs");
const feedbacksData = require("./data/feedback");
const hotelData = require("./data/hotels");
const vehicleData = require("./data/vehicle");
const responseData = require("./data/response");
const vehicleBookingData = require("./data/vehiclebooking");
const hotelBookingData = require("./data/hotelBooking");
const hotelOwnerData = require("./data/hotelOwners");
const vehicleOwnerData = require("./data/vehicleOwner");
const tourBookingsData = require("./data/bookings");
const color = require("colors");
const dotenv = require("dotenv");
const { VehicleBooking } = require("./models/vehiclebooking");

dotenv.config();
connectDb();

const importData = async () => {
  try {
    await User.deleteMany({});
    // await TravelClub.deleteMany({});
    // await Tour.deleteMany({});
    // await Feedback.deleteMany({});
    // await Vehicle.deleteMany({});
    // await Hotel.deleteMany({});
    // await VehicleBooking.deleteMany({});
    // await HotelBooking.deleteMany({});
    // await HotelOwner.deleteMany({});
    // await VehicleOwner.deleteMany({});
    // await Booking.deleteMany({});

    const users = await User.insertMany(usersData);
    // const [, , , , user] = users;
    // const [, , , clubOwner] = users;
    // const [, vehicleOwner] = users;
    // const [, , hotelOwner] = users;

    // const feedbacks = feedbacksData.map((feedback) => {
    //   return {
    //     ...feedback,
    //     user: hotelOwner._id,
    //   };
    // });
    // await Feedback.insertMany(feedbacks);

    // const hotelOwners = hotelOwnerData.map((hotOwner) => {
    //   return {
    //     ...hotOwner,
    //     owner: { ...hotOwner.owner, ownerId: hotelOwner._id },
    //   };
    // });
    // await HotelOwner.insertMany(hotelOwners);

    // const vehicleOwners = vehicleOwnerData.map((vehOwner) => {
    //   return {
    //     ...vehOwner,
    //     owner: { ...vehOwner.owner, ownerId: vehicleOwner._id },
    //   };
    // });
    // await VehicleOwner.insertMany(vehicleOwners);
    // const newTravelClub = travelClubsData.map((travelClub) => {
    //   return {
    //     ...travelClub,
    //     owner: {
    //       ...travelClub.owner,
    //       ownerId: clubOwner._id,
    //     },
    //   };
    // });

    // const club = await TravelClub.insertMany(newTravelClub);
    // const newVehicle = vehicleData.map((vehicle) => {
    //   return {
    //     ...vehicle,
    //     vehicleOwner: vehicleOwner._id,
    //   };
    // });

    // await Vehicle.insertMany(newVehicle);

    // const newHotels = hotelData.map((hotel) => {
    //   return {
    //     ...hotel,
    //     hotelOwner: hotelOwner._id,
    //   };
    // });

    // await Hotel.insertMany(newHotels);

    // const newTours = packagesData.map((package) => {
    //   return {
    //     ...package,
    //     travelClub: club[0]._id,
    //   };
    // });

    // await Tour.insertMany(newTours);

    // const newVehicleBooking = vehicleBookingData.map((booking) => {
    //   return {
    //     ...booking,
    //     user: hotelOwner._id,
    //   };
    // });

    // await VehicleBooking.insertMany(newVehicleBooking);
    // const newBookings = tourBookingsData.map((booking) => {
    //   return booking;
    // });

    // await Booking.insertMany(newBookings);

    // const newHotelBookings = hotelBookingData.map((booking) => {
    //   return {
    //     ...booking,
    //     user: hotelOwner._id,
    //   };
    // });

    // await HotelBooking.insertMany(newHotelBookings);
    console.log("Imported Data Successfully!".bgYellow);
    process.exit();
  } catch (error) {
    console.log(`Unable to Seed Data!${error.message}`.bgRed);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany({});
    await TravelClub.deleteMany({});
    await Tour.deleteMany({});
    await Feedback.deleteMany({});
    await Vehicle.deleteMany({});
    await Hotel.deleteMany({});
    console.log("Destroyed Data Successfully!".bgYellow);
    process.exit();
  } catch (error) {
    console.log(`Unable to destroy Data!${error.message}`.bgRed);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
