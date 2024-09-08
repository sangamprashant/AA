const Booking = require("../../Models/bookings");
// Validate the type
const validStates = [
  "New leads",
  "Attempt to contacted (1)",
  "Attempt to contacted (2)",
  "Connected",
  "Prospect",
  "Hot leads",
  "Payment Received",
  "Not Interested",
];

const employeeGetTheirBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      assignedEmployee: req.user.id,
      approvedBYHigher: true,
    });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

const employeeCreateBooking = async (req, res) => {
  try {
    const { phoneNumber, email } = req.body;

    if (!phoneNumber && !email) {
      return res.status(400).json({ message: "Phone number or email is required." });
    }

    let existingBookingByPhoneNumber = null;
    let existingBookingByEmail = null;

    if (phoneNumber) {
      existingBookingByPhoneNumber = await Booking.findOne({
        phoneNumber: { $regex: phoneNumber, $options: 'i' }
      });
    }

    if (email) {
      existingBookingByEmail = await Booking.findOne({
        email: { $regex: email, $options: 'i' }
      });
    }

    if (existingBookingByPhoneNumber && existingBookingByEmail) {
      return res.status(400).json({ message: "A booking with this phone number and email already exists." });
    } else if (existingBookingByPhoneNumber) {
      return res.status(400).json({ message: "A booking with this phone number already exists." });
    } else if (existingBookingByEmail) {
      return res.status(400).json({ message: "A booking with this email already exists." });
    }

    const newBooking = new Booking({
      ...req.body,
      assignedEmployee: req.user.id,
      checked: false,
      approvedBYHigher: false,
    });

    await newBooking.save();

    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = {
  employeeGetTheirBookings,
  employeeCreateBooking,
};
