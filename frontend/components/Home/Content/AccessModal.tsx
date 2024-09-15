"use client"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button, Form, Input, Modal, notification, Select } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { config } from "../../../config";
import { AppContext } from "@/context/AppProvider";
import LoadingUI from "@/components/LoadingUI";
import { useRouter } from 'next/navigation';
// import Image from "next/image";

interface FormValues {
  email?: string;
  phone?: string;
  otp?: string;
}

interface handleGenerateOtpProps {
  email?: string;
  phone?: string;
  Class?: number
}

interface handleVerifyOtpProps {
  email?: string;
  phone?: string;
  otp?: string;
  Class?: number
}

type Steps = 0 | 1 | 2 | 3 | 4 | 5;

const AccessModal: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [form] = Form.useForm();
  const [step, setStep] = useState<Steps>(0);
  const [formValues, setFormValues] = useState<FormValues>({});
  const navigate = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const appContext = useContext(AppContext);
  if (!appContext) {
    return <LoadingUI />;
  }
  const { locked, handleLock, setClassesUnlocked } = appContext;

  useEffect(() => {
    setVisible(locked);
  }, [locked]);

  const handleNext = () => {
    form
      .validateFields()
      .then((values) => {
        setFormValues((prevValues) => ({ ...prevValues, ...values }));
        setStep((step + 1) as Steps);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleSubmit = (values: FormValues) => {
    setFormValues((prevValues) => ({ ...prevValues, ...values }));
    if (step === 2) {
      handleGenerateOtp({ ...formValues, ...values });
    } else if (step === 4) {
      handleVerifyOtp({ ...formValues, ...values });
    }
  };

  useEffect(() => {
    if (step === 3) {
      setTimeout(() => setStep(4), 3000);
    }
  }, [step]);

  return (
    <Modal
      title="Access Required"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      centered
      width={400}
    >
      <div style={{ minHeight: "250px" }}>
        {(step === 0 || step === 1 || step === 2) && (
          <>
            <p>
              To access the content, please provide us with your email and phone
              number. This information will not be shared and will only be used
              to enhance your user experience.
            </p>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              {step === 0 && (<>
                <Imagee url="class" h={100} />
                <Form.Item
                  label="Class"
                  name="Class"
                  rules={[
                    {
                      required: true,
                      type: "number",
                      message: "Please select a valid class!",
                    },
                  ]}
                >
                  <Select placeholder="Please select a class">
                    {Array.from({ length: 12 }, (_, index) => (
                      <Select.Option key={index + 1} value={index + 1}>
                        Class {index + 1}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="button"
                    block
                    onClick={handleNext}
                  >
                    Next Step <ArrowForwardIosIcon fontSize="small" />
                  </Button>
                </Form.Item>
              </>)}
              {step === 1 && (
                <>
                  <Imagee url="phone" h={100} />
                  <Form.Item
                    label="Phone Number"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your phone number!",
                      },
                      {
                        len: 10,
                        message: "Phone number must be 10 digits long!",
                      },
                      {
                        pattern: /^[6-9][0-9]{9}$/,
                        message:
                          "Phone number must be numeric and start with a digit greater than 5!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your phone number" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="button"
                      block
                      onClick={handleNext}
                    >
                      Next Step <ArrowForwardIosIcon fontSize="small" />
                    </Button>
                  </Form.Item>
                </>
              )}
              {step === 2 && (
                <>
                  <Imagee url="email" h={100} />
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        type: "email",
                        message: "Please enter a valid email!",
                      },
                      {
                        validator: (_, value) => {
                          if (
                            value &&
                            !/^[\w-.]+@(gmail\.com|yahoo\.com|outlook\.com)$/.test(
                              value
                            )
                          ) {
                            return Promise.reject(
                              "Email must be from a known domain (gmail.com, yahoo.com, outlook.com)!"
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="button"
                      block
                      onClick={() => form.submit()}
                      disabled={loading}
                    >
                      {loading ? "Loading" : "Generate OTP"}
                      {loading && <img src="/loading.svg" height={30} alt="" />}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form>
          </>
        )}
        {step === 3 && (
          <>
            <h5 className="text-center mt-3">
              Thank you for your time. An OTP has been sent to you.
            </h5>
            <p className="text-center">
              Please enter it to access the content.
            </p>
            <Imagee url="sent" h={200} />
          </>
        )}
        {step === 4 && (
          <>
            <h5 className="text-center mt-3">Enter your OTP here</h5>
            <Imagee url="otp" h={100} />
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Form.Item
                label="OTP"
                name="otp"
                rules={[
                  {
                    required: true,
                    message: "Please enter the OTP sent to your email!",
                  },
                  {
                    len: 6,
                    message: "OTP must be 6 digits long!",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "OTP must be numeric!",
                  },
                ]}
              >
                <Input placeholder="Enter the OTP" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="button"
                  block
                  onClick={() => form.submit()}
                  disabled={loading}
                >
                  {loading ? "Loading" : "Submit OTP"}
                  {loading && <img src="/loading.svg" height={30} alt="" />}
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
        {step === 5 && (
          <>
            <h5 className="text-center mt-3">
              Thank you for verifying your details.
            </h5>
            <p className="text-center">
              You now have full access to the content.
            </p>
            <Imagee url="unlock" h={100} />
            <Form.Item>
              <Button
                type="primary"
                htmlType="button"
                block
                onClick={handleCancel}
              >
                Close
              </Button>
            </Form.Item>
          </>
        )}
      </div>
    </Modal >
  );

  async function handleVerifyOtp({ email, phone, otp, Class }: handleVerifyOtpProps) {
    try {
      setLoading(true);
      const response = await fetch(`${config.SERVER}/access-content/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone, otp, Class }),
      });

      const data = await response.json();

      if (data.success) {
        const user = { email, phone };
        await saveAccessesClasses(Class); // Ensure to save the class properly
        localStorage.setItem("access-content", JSON.stringify(user));

        notification.success({
          message: "Verification Successful",
          description: "You have successfully verified your details.",
        });

        setStep(5); // Move to the next step after success
        handleLock(true)
      } else {
        notification.warning({
          message: "Warning",
          description: data.message || "Something went wrong. Please try again later.",
        });
      }
    } catch (error: any) {
      console.error("Error during OTP verification:", error);

      if (error.response && error.response.status === 500) {
        notification.error({
          message: "Error",
          description: "Something went wrong. Please try again later.",
        });
      } else {
        notification.warning({
          message: "Warning",
          description:
            error.response?.data?.message || "Something went wrong. Please try again later.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateOtp({ email, phone, Class }: handleGenerateOtpProps) {
    try {
      setLoading(true);
      const res = await axios.post(`${config.SERVER}/access-content`, { email, phone, Class });

      if (res.data.success) {
        if (res.data.verified) {
          setStep(5); // Move to the next step after verification
          notification.success({
            message: "OTP Verified",
            description: res.data.message,
          });

          setClassesUnlocked(res.data.classes)
          handleLock(true)
          localStorage.setItem("access-classes", JSON.stringify(res.data.classes));
        } else {
          notification.success({
            message: "OTP Generated",
            description: "An OTP has been sent to your email.",
          });
          setStep(3); // Move to the OTP input step
        }
      } else {
        notification.error({
          message: "Error",
          description: res.data.message,
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel() {
    if (locked) {
      notification.warning({
        message: "Action Canceled",
        description:
          "You have canceled the process. Please complete the action to unlock the content and view it.",
      });
      navigate.push("/free-study-material");
    } else[
      setVisible(false)
    ]
  }

  async function saveAccessesClasses(Class: number | undefined): Promise<number | void> {
    if (Class === undefined) {
      return;
    }

    try {
      const classes = JSON.parse(localStorage.getItem("access-classes") || "[]");

      if (classes.includes(Class)) {
        return 1;
      }

      classes.push(Class);
      localStorage.setItem("access-classes", JSON.stringify(classes));

      return 0;
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return -1;
    }
  }


};

export default AccessModal;

interface ImageProps {
  url: string;
  h: number;
}

const Imagee = ({ url, h }: ImageProps) => {
  return (
    <div className="d-flex justify-content-center">
      <img src={`/access/${url}.png`} alt="" height={h} />
    </div>
  );
};
