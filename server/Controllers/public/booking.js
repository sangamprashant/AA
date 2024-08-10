const { validationResult } = require("express-validator");
const Booking = require("../../Models/bookings");
const sendBookingConfirmationEmail = require("../../Mail/createBooking");
const sendAdminNotificationEmail = require("../../Mail/sendAdminNotification");
const sendBookingUpdateEmail = require("../../Mail/sendBookingUpdateEmail");
const User = require("../../Models/users");

const userCreateBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), success: false });
  }

  try {
    // Find all employees
    const employees = await User.find({ role: "employee" });
    if (employees.length === 0) {
      throw new Error("No employees found");
    }

    // Assign a random employee
    const randomEmployee =
      employees[Math.floor(Math.random() * employees.length)];

    // Create the booking object
    const newBooking = new Booking({
      ...req.body,
      assignedEmployee: randomEmployee._id, // Set the assigned employee here
      checked: false,
    });

    // Notify admin about the new booking
    const bookingDetails = `
      <p><b>Name:</b> ${newBooking.firstName} ${newBooking.lastName}</p>
      <p><b>Email:</b> ${newBooking.email}</p>
      <p><b>Phone Number:</b> ${newBooking.phoneNumber}</p>
      <p><b>Selected Class:</b> ${newBooking.selectedClass}</p>
      <p><b>Date of Class:</b> ${newBooking.doc}</p>
    `;

    // Add notification to the randomly assigned employee
    const notificationMessage = `You have been assigned a new booking:
        Name: ${newBooking.firstName} ${newBooking.lastName}
        Email: ${newBooking.email}
        Phone Number: ${newBooking.phoneNumber}
        Selected Class: ${newBooking.selectedClass}
        Date of Class: ${newBooking.doc.toISOString()}`;

    randomEmployee.notifications.push({
      message: notificationMessage,
      seen: false,
    });

    // Save the updated employee
    await randomEmployee.save();

    // Save the booking and send emails concurrently
    await Promise.all([
      newBooking.save(),
      sendBookingConfirmationEmail(newBooking),
      sendAdminNotificationEmail("Booking", bookingDetails),
    ]);

    // Respond with success
    res
      .status(201)
      .json({ message: "Booking created successfully", success: true });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = {
  userCreateBooking,
};
