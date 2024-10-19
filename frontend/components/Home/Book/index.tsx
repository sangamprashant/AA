"use client"
import { heroImg } from "@/assets/links";
import { CountryOption } from "@/strings";
import type { NotificationArgsProps } from "antd";
import { Alert, AutoComplete, notification } from "antd";
import axios from "axios";
import { motion } from "framer-motion";
import { ChangeEvent, FormEvent, useState } from "react";
import { config } from "../../../config";
import Section from "../../Reuse/Section";

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

  const handleCountryChange = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      country: value,
    }));
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
              <motion.h1 className="bold-text">
                Book a <span className="text-warning">Free</span> Demo Class
              </motion.h1>
              <motion.p>
                Get ready for an amazing journey with the best mentors who turn
                every challenge into a chance to boost your career.
              </motion.p>
              <motion.form onSubmit={handleSubmit}>
                <div className="row">
                  <motion.div className="col-md-6 mt-3">
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
                  <motion.div className="col-md-6 mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter Last Name"
                      required
                    />
                  </motion.div>
                  <motion.div className="col-md-12 mt-3">
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

                  <motion.div className="col-md-12 mt-3">
                    <div className="input-container gap-2">
                      <AutoComplete
                        style={{ width: 150, height: 40 }}
                        options={CountryOption.map((option) => ({
                          value: option.phoneCode,
                          label: `${option.label} ${option.phoneCode}`,
                        }))}
                        placeholder="Enter a Country"
                        filterOption={(inputValue, option) =>
                          option!.label
                            .toUpperCase()
                            .includes(inputValue.toUpperCase())
                        }
                        onChange={handleCountryChange}
                        value={formData.country}
                      />
                      <input
                        type="number"
                        className="phone-input form-control"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Enter Phone Number"
                        required
                      />
                    </div>
                  </motion.div>
                  <motion.div className="col-md-6 mt-3">
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
                      <option key="higher-studies" value="higher studies">
                        Higher Studies
                      </option>
                    </select>
                  </motion.div>
                  <motion.div className="col-md-6 mt-3">
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
                      className={`opacity-${alert.type ? "100" : "0"
                        } mt-4 w-100`}
                    />
                  </div>
                  <div className="col-md-6 text-end">
                    <motion.button
                      type="submit"
                      className="btn theme-btn mt-4"
                      whileHover={{ scale: 1.05 }}
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
              viewport={{ once: true }}
            >
              <img
                src={`${heroImg.chatPic}?cache-control=max-age=31536000`}
                alt=""
                loading="lazy" 
                style={{
                  width: '100%'
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default BookClass;
