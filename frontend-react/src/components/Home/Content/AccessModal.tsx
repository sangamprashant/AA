import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button, Form, Input, Modal, notification } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingUI } from "../../../App";
import { AppContext } from "../../../AppProvider";
import { config } from "../../../config";

interface FormValues {
  email?: string;
  phone?: string;
  otp?: string;
}

interface handleGenerateOtpProps {
  email?: string;
  phone?: string;
}

interface handleVerifyOtpProps {
  email?: string;
  phone?: string;
  otp?: string;
}

type Steps = 1 | 2 | 3 | 4 | 5;

const AccessModal: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [form] = Form.useForm();
  const [step, setStep] = useState<Steps>(1);
  const [formValues, setFormValues] = useState<FormValues>({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const appContext = useContext(AppContext);
  if (!appContext) {
    return <LoadingUI />;
  }
  const { locked, handleLock } = appContext;
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
        {(step === 1 || step === 2) && (
          <>
            <p>
              To access the content, please provide us with your email and phone
              number. This information will not be shared and will only be used
              to enhance your user experience.
            </p>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              {step === 1 && (
                <>
                  <Image url="phone" h={100} />
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
                  <Image url="email" h={100} />
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
                      {loading && <img src="/loading.svg" height={30} />}
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
            <Image url="sent" h={200} />
          </>
        )}
        {step === 4 && (
          <>
            <h5 className="text-center mt-3">Enter your OTP here</h5>
            <Image url="otp" h={100} />
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
                  {loading && <img src="/loading.svg" height={30} />}
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
            <Image url="unlock" h={100} />
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
    </Modal>
  );

  async function handleVerifyOtp({ email, phone, otp }: handleVerifyOtpProps) {
    try {
      setLoading(true);
      const response = await fetch(`${config.SERVER}/access-content/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone, otp }),
      });
      const data = await response.json();
      if (data.success) {
        const user = {
          email,
          phone,
        };
        localStorage.setItem("access-content", JSON.stringify(user));
        notification.success({
          message: "Verification Successful",
          description: "You have successfully verified your details.",
        });
        setStep(5);
      } else {
        notification.warning({
          message: "Warning",
          description:
            data.message || "Something went wrong. Please try again later.",
        });
      }
    } catch (error: any) {
      console.error(error);
      if (error.response.status === 500) {
        notification.error({
          message: "Error",
          description: "Something went wrong. Please try again later.",
        });
      } else {
        notification.warning({
          message: "Warning",
          description:
            error.response.data.message ||
            "Something went wrong. Please try again later.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateOtp({ email, phone }: handleGenerateOtpProps) {
    try {
      setLoading(true);
      const res = await axios.post(`${config.SERVER}/access-content`, {
        email,
        phone,
      });
      if (res.data.success) {
        if (res.data.verified) {
          const user = {
            email,
            phone,
          };
          localStorage.setItem("access-content", JSON.stringify(user));
          setStep(5);
          notification.success({
            message: "OTP Verified",
            description: res.data.message,
          });
        } else {
          notification.success({
            message: "OTP Generated",
            description: "An OTP has been sent to your email.",
          });
          setStep(3);
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
    await handleLock();
    const initialData = await localStorage.getItem("access-content");
    if (!initialData) {
      notification.warning({
        message: "Action Canceled",
        description:
          "You have canceled the process. Please complete the action to unlock the content and view it.",
      });
      navigate("/study-material");
    }
  }
};

export default AccessModal;

interface ImageProps {
  url: string;
  h: number;
}

const Image = ({ url, h }: ImageProps) => {
  return (
    <div className="d-flex justify-content-center">
      <img src={`/access/${url}.png`} alt="" height={h} />
    </div>
  );
};
