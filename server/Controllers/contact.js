const { validationResult, check } = require("express-validator");
const Contact = require("../models/Contact");
const sendAdminNotificationEmail = require("../Mail/sendAdminNotification");
const sendContactEmail = require("../Mail/createContact");
const sendContactResponse = require("../Mail/sendContactResponse");

const validateContact = [
  check("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha()
    .withMessage("First name should contain only alphabets"),
  check("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isAlpha()
    .withMessage("Last name should contain only alphabets"),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  check("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isNumeric()
    .withMessage("Phone number should contain only numbers")
    .isLength({ min: 10, max: 15 })
    .withMessage("Phone number should be between 10 and 15 digits"),
  check("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 1 })
    .withMessage("Message should contain at least 1 character"),
];

const validateReply = [
  check("responseMessage")
    .trim()
    .notEmpty()
    .withMessage("Response message is required")
    .isLength({ min: 1 })
    .withMessage("Response message should contain at least 1 character"),
];

const userCreateBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, phoneNumber, message } = req.body;

  try {
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    });

    const newContactDeteils = `
    <p><b>Name:</b> ${newContact.firstName} ${newContact.lastName}</p>
    <p><b>Email:</b> ${newContact.email}</p>
    <p><b>Phone Number:</b> ${newContact.phoneNumber}</p>
    <p><b>Selected Class:</b> ${newContact.message}</p>
  `;

    await Promise.all([
      newContact.save(),
      sendContactEmail(newContact),
      sendAdminNotificationEmail("Contact", newContactDeteils),
    ]);

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const viewContact = async (req, res) => {
  try {
    const { status } = req.params;
    let query = {};

    if (status === "responded") {
      query.checked = true;
    } else if (status === "received") {
      query.checked = false;
    } else {
      return res
        .status(400)
        .json({ message: "Invalid status parameter", success: false });
    }
    const contacts = await Contact.find(query);
    res.status(200).json({ success: true, contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const replyContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const { responseMessage } = req.body;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res
        .status(404)
        .json({ success: false, message: "Contact not found" });
    }
    contact.checked = true;
    contact.responseMessage = responseMessage;
    await Promise.all([contact.save(), sendContactResponse(contact)]);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res
        .status(404)
        .json({ message: "Contact not found", success: false });
    }
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = {
  validateContact,
  validateReply,
  userCreateBooking,
  viewContact,
  replyContact,
  deleteContact,
};
