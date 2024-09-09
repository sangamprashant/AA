import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../../../../config";
import { openNotification } from "../../../../../functions";
import { CountryOption } from "../../../../../strings";
import { AuthContext } from "../../../../context/AuthProvider";
import EmployeeWrapper from "../../EmployeeWrapper";

const { Option } = Select;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phoneNumber: string;
  selectedClass: string;
  doc: string;
}

type FormAction = "reset" | "navigate";

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  phoneNumber: "",
  selectedClass: "",
  doc: "",
};

const CreateBooking: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [form] = Form.useForm(); // Ant Design's form instance
  const globles = useContext(AuthContext);
  if (!globles) return null;
  const { token } = globles;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (
    name: keyof FormData,
    value: string | undefined
  ) => {
    if (value !== undefined) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleCountryChange = (value: string) => {
    handleInputChange("country", value);
  };

  const handleSubmit = async (action: FormAction) => {
    try {
      setLoading(true);
      const response = await axios.post(`${config.SERVER}/employee/booking`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        openNotification("Success", "Booking created successfully", "success");
        if (action === "reset") {
          window?.location?.reload()
        } else {
          navigate(`/employee/leads-bucket`);
        }
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      openNotification("Error", errorMessage, "error");
      console.error("Error creating booking:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5 className="text-uppercase">LEADS - Create</h5>
        <div className="d-flex gap-2">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            onClick={() => handleSubmit("reset")}
          >
            Add and Reset
          </Button>
          <Button
            type="primary"
            onClick={() => handleSubmit("navigate")}
            loading={loading}
          >
            Add and Go Back
          </Button>
          <Button danger type="dashed" onClick={() => navigate(`/employee/leads-bucket`)}>
            Cancel
          </Button>
        </div>
      </div>

      <EmployeeWrapper>
        <Form
          form={form} // Connect the form instance
          layout="vertical"
          initialValues={formData}
          className="p-4 card m-1 shadow-sm"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "Please enter your first name" }]}
              >
                <Input
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter First Name"
                  value={formData.firstName}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "Please enter your last name" }]}
              >
                <Input
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              type="email"
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter Email"
              value={formData.email}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: "Please select your country" }]}
              >
                <AutoComplete
                  style={{ width: "100%" }}
                  options={CountryOption.map((option) => ({
                    value: option.phoneCode,
                    label: `${option.label} ${option.phoneCode}`,
                  }))}
                  placeholder="Select a Country"
                  filterOption={(inputValue, option) =>
                    option!.label.toUpperCase().includes(inputValue.toUpperCase())
                  }
                  onChange={handleCountryChange}
                  value={formData.country}
                />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true, message: "Please enter your phone number" }]}
              >
                <Input
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder="Enter Phone Number"
                  value={formData.phoneNumber}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Class Selection"
                name="selectedClass"
                rules={[{ required: true, message: "Please select a class" }]}
              >
                <Select
                  onChange={(value) => handleInputChange("selectedClass", value)}
                  placeholder="Select a Class"
                  value={formData.selectedClass}
                >
                  <Option value="">Select a Class</Option>
                  {[...Array(12)].map((_, index) => (
                    <Option key={index + 1} value={`Class ${index + 1}`}>
                      {`Class ${index + 1}`}
                    </Option>
                  ))}
                  <Option value="higher-studies">Higher Studies</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Date of Class (DOC)"
                name="doc"
                rules={[{ required: true, message: "Please select a date" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={(_, dateString) => {
                    handleInputChange("doc", dateString.toString());
                  }}
                  placeholder="Select Date of Class"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </EmployeeWrapper>
    </>
  );
};

export default CreateBooking;
