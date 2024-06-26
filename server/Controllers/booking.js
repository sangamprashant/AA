const { validationResult } = require("express-validator");
const Booking = require("../Models/bookings");
const sendBookingConfirmationEmail = require("../Mail/createBooking");
const sendAdminNotificationEmail = require("../Mail/sendAdminNotification");
const sendBookingUpdateEmail = require("../Mail/sendBookingUpdateEmail");

const userCreateBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success: false });
  }
  try {
    const newBooking = new Booking({
      ...req.body,
      checked: false,
    });

    // Notify admin about new booking
    const bookingDetails = `
      <p><b>Name:</b> ${newBooking.firstName} ${newBooking.lastName}</p>
      <p><b>Email:</b> ${newBooking.email}</p>
      <p><b>Phone Number:</b> ${newBooking.phoneNumber}</p>
      <p><b>Selected Class:</b> ${newBooking.selectedClass}</p>
      <p><b>Date of Class:</b> ${newBooking.doc}</p>
    `;

    await Promise.all([
      newBooking.save(),
      sendBookingConfirmationEmail(newBooking),
      sendAdminNotificationEmail("Booking", bookingDetails),
    ]);

    res
      .status(201)
      .json({ message: "Booking created successfully", success: true });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const viewBookings = async (req, res) => {
  try {
    const { status } = req.params;
    let query = {};

    if (status === "verified") {
      query.checked = true;
    } else if (status === "unverified") {
      query.checked = false;
    } else {
      return res
        .status(400)
        .json({ message: "Invalid status parameter", success: false });
    }

    const bookings = await Booking.find(query);
    res.status(200).json({ bookings, success: true });
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const updateBooking = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found", success: false });
    }

    booking.doc = updateData.doc || booking.doc;
    booking.time = updateData.time;
    booking.checked = true;

    await Promise.all([await booking.save(), sendBookingUpdateEmail(booking)]);
    res.status(200).json({
      message: "Booking updated successfully",
      booking,
      success: true,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found", success: false });
    }
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = {
  userCreateBooking,
  viewBookings,
  updateBooking,
  deleteBooking,
};
