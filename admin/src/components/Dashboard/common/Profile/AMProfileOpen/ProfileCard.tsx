import { Button, Input, Form, notification } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import { ProfileContext } from "../AMProfile";
import axios from "axios";
import { User } from "../../../../../types/booking";

const ProfileCard = () => {
  const admin = useContext(AuthContext);
  if (!admin) return null;
  const globles = useContext(ProfileContext);
  if (!globles) return null;
  const { profileUser, setProfileUser } = globles;

  const [update, setUpdate] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      // Determine which fields to update (email or password)
      const updateData: { email?: string; password?: string } = {};
      if (values.email && values.email !== profileUser?.email) {
        updateData.email = values.email;
      }
      if (values.password) {
        updateData.password = values.password;
      }

      // Make an API call to update user email or password
      await axios.post('/api/update-profile', updateData);

      // Update the profile locally if the email was changed
      if (updateData.email) {
        setProfileUser((prev: User) => ({
          ...prev,
          email: updateData.email,
        }));
      }

      notification.success({
        message: "Success",
        description: "Profile updated successfully!",
      });
      setUpdate(false); // Exit edit mode after successful update
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to update profile. Please try again.",
      });
    }
  };

  return (
    <div>
      <div className="card p-3 d-flex justify-content-between align-self-center">
        <div>
          <div className="mb-3">
            <label className="form-label fw-bold m-0">Name:</label>
            <p className="card-text m-0">{profileUser?.name}</p>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold m-0">Email:</label>
            {!update ? (
              <p className="card-text m-0">{profileUser?.email}</p>
            ) : (
              <Form.Item
                name="email"
                initialValue={profileUser?.email}
                rules={[{ required: true, message: "Please input the email!" }]}
              >
                <Input placeholder="Enter new email" />
              </Form.Item>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold m-0">Role:</label>
            <p className="card-text m-0">{profileUser?.role}</p>
          </div>
        </div>

        {admin.user?.role === "admin" && (
          <Button type="primary" onClick={() => setUpdate((prev) => !prev)}>
            {update ? "Cancel" : "Edit"}
          </Button>
        )}

        {update && (
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <div className="mb-3">
              <label className="form-label fw-bold m-0">Password:</label>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please input the password!" }]}
              >
                <Input.Password placeholder="Enter new password" />
              </Form.Item>
            </div>

            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
