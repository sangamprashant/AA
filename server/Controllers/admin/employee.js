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

module.exports = {
  employeeGetTheirBookings,
};
