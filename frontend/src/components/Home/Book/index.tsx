import type { NotificationArgsProps } from "antd";
import { Alert, notification } from "antd";
import axios from "axios";
import { motion } from "framer-motion";
import { ChangeEvent, FormEvent, useState } from "react";
import { config } from "../../../config";
import Section from "../../Reuse/Section";
import { CountryOption } from "../../Strings";

type NotificationPlacement = NotificationArgsProps["placement"];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phoneNumber: string;
  selectedClass: string;
  doc: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  phoneNumber: "",
  selectedClass: "",
  doc: "",
};

const BookClass = () => {
  const [api, contextHolder] = notification.useNotification();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [alert, setAlert] = useState<{
    type: "success" | "error" | "warning" | undefined;
    text: string;
  }>({
    type: undefined,
    text: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const openNotification = (message: string) => {
    api.success({
      message: "Booking Created Successfully",
      description: message,
      placement: "bottomRight" as NotificationPlacement,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simple form validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.country ||
      !formData.phoneNumber ||
      !formData.selectedClass ||
      !formData.doc
    ) {
      setAlert({
        type: "warning",
        text: "Please fill out all required fields.",
      });
      return;
    }
    try {
      const response = await axios.post(`${config.SERVER}/booking`, formData);
      if (response.data.success) {
        setAlert({ type: "success", text: "Booking created successfully." });
        setFormData(initialFormData);
        openNotification("Your booking has been successfully created.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      setAlert({
        type: "error",
        text: "Error creating booking. Please try again later.",
      });
    }
  };

  return (
    <Section id="demo-class">
      {contextHolder}
      <div className="">
        <div className="py-5">
          <div className="row align-items-center">
            <motion.div className="col-md-7">
              <motion.h1
                className="bold-text"
                initial={{ opacity: 0, y: 100, x: -100 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Speak with the{" "}
                <span className="text-warning">The A to Z Classes </span>
                Parents Coach
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Get ready for an amazing journey with best mentors who turn
                every challenge into chance to boost your career
              </motion.p>
              <motion.form onSubmit={handleSubmit}>
                <div className="row">
                  <motion.div
                    className="col-md-6 mt-3"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter First Name"
                    />
                  </motion.div>
                  <motion.div
                    className="col-md-6 mt-3"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter Second Name"
                      required
                    />
                  </motion.div>
                  <motion.div
                    className="col-md-12 mt-3"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    viewport={{ once: true }}
                  >
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter Email Address"
                      required
                    />
                  </motion.div>
                  <motion.div
                    className="col-md-12 mt-3"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="input-container">
                      <select
                        className="country-select form-control"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Country</option>
                        {CountryOption.map((option) => (
                          <option
                            key={option.value}
                            value={option.phoneCode}
                            className="w-100"
                          >
                            {option.label} {option.phoneCode}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="phone-input form-control"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter Phone Number"
                        required
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    className="col-md-6 mt-3"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    viewport={{ once: true }}
                  >
                    <select
                      name="selectedClass"
                      id="selectedClass"
                      className="form-control"
                      value={formData.selectedClass}
                      onChange={handleInputChange}
                      required
                    >
                      <option key="class-null" value="">
                        Select a Class
                      </option>
                      {[...Array(12)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                  <motion.div
                    className="col-md-6 mt-3"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    viewport={{ once: true }}
                  >
                    <input
                      type="date"
                      className="form-control"
                      name="doc"
                      value={formData.doc}
                      onChange={handleInputChange}
                      required
                    />
                  </motion.div>
                </div>
                <div className="row mt-1">
                  <div className="col-md-6">
                    <Alert
                      message={alert.text}
                      type={alert.type}
                      className={`opacity-${
                        alert.type ? "100" : "0"
                      } mt-4 w-100`}
                    />
                  </div>
                  <div className="col-md-6 text-end">
                    <motion.button
                      type="submit"
                      className="btn theme-btn mt-4"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                      viewport={{ once: true }}
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </motion.form>
            </motion.div>
            <motion.div
              className="col-md-5 mt-3"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: false }}
            >
              <img
                src="chat.gif?cache-control=max-age=31536000"
                alt=""
                width="100%"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default BookClass;
