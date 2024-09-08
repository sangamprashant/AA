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
import React, { useState } from "react";
import { CountryOption } from "../../../../../strings";
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

  const handleSubmit = (values: FormData) => {
    console.log(values);
    // Handle form submission logic here
  };

  return (
    <>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5>LEADS - Create</h5>
        <div className="d-flex gap-2">
          <Button
            type="primary"
            htmlType="submit"
            // loading
            onClick={() => handleSubmit(formData)}
          >
            Add and Reset
          </Button>
          <Button type="primary" loading>
            Add and Go Back
          </Button>
          <Button danger type="dashed">
            Cancel
          </Button>
        </div>
      </div>

      <EmployeeWrapper>
        <Form
          layout="vertical"
          initialValues={formData}
          onFinish={handleSubmit}
          className="mt-5"
        >
          <Row gutter={16}>
            <Col span={12}>
              {" "}
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  placeholder="Enter First Name"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  placeholder="Enter Last Name"
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
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label="Country"
                name="country"
                rules={[
                  { required: true, message: "Please select your country" },
                ]}
              >
                <AutoComplete
                  style={{ width: "100%" }}
                  options={CountryOption.map((option) => ({
                    value: option.phoneCode,
                    label: `${option.label} ${option.phoneCode}`,
                  }))}
                  placeholder="Select a Country"
                  filterOption={(inputValue, option) =>
                    option!.label
                      .toUpperCase()
                      .includes(inputValue.toUpperCase())
                  }
                  onChange={handleCountryChange}
                />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value)
                  }
                  placeholder="Enter Phone Number"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              {" "}
              <Form.Item
                label="Class Selection"
                name="selectedClass"
                rules={[{ required: true, message: "Please select a class" }]}
              >
                <Select
                  onChange={(value) =>
                    handleInputChange("selectedClass", value)
                  }
                  placeholder="Select a Class"
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
              {" "}
              <Form.Item
                label="Date of Class (DOC)"
                name="doc"
                rules={[{ required: true, message: "Please select a date" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={(date, dateString) => {
                    console.log({ date });
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
