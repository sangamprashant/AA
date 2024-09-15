import { Button, Input, Form, notification } from "antd";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import { ProfileContext } from "../AMProfile";
import axios from "axios";
import { config } from "../../../../../config";

const ProfileCard = () => {
  const admin = useContext(AuthContext);
  if (!admin) return null;
  const globles = useContext(ProfileContext);
  if (!globles) return null;
  const { token } = admin
  const { profileUser, setProfileUser } = globles;
  const [update, setUpdate] = useState<boolean>(false);
  const [email, setEmail] = useState<string | undefined>("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    setEmail(profileUser?.email)
  }, [profileUser])

  const onFinish = async () => {
    try {
      let updateData = {
        email: email || undefined,
        password: password || undefined
      };

      const response = await axios.post(`${config.SERVER}/admin/user-update-profile`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: profileUser?._id
        }
      });

      if (response.data.success) {
        notification.success({
          message: "Success",
          description: "Profile updated successfully!",
        });
        setProfileUser(response.data.user)
      }
      setUpdate(false);
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error.response.data.message || "Failed to update profile. Please try again.",
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
            <label className="form-label fw-bold m-0">Role:</label>
            <p className="card-text m-0">{profileUser?.role}</p>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold m-0">Email:</label>
            {!update ? (
              <p className="card-text m-0">{profileUser?.email}</p>
            ) : (
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Please input the email!" }]}
              >
                <Input placeholder="Enter new email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>
            )}
          </div>
        </div>
        {update && (
          <Form layout="vertical">
            <div className="mb-3">
              <label className="form-label fw-bold m-0">Password:</label>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please input the password!" }]}
              >
                <Input.Password placeholder="Enter new password" onChange={(e) => setPassword(e.target.value)} value={password} />
              </Form.Item>
            </div>


          </Form>
        )}
        {admin.user?.role === "admin" && <>
          {
            update ? <div className="d-flex gap-2"> <Button type="primary" htmlType="submit" onClick={onFinish}>
              Save Changes
            </Button>
              <Button type="primary" danger className="w-100" onClick={() => setUpdate((prev) => !prev)}>
                Cancel
              </Button>
            </div> : <> <Button type="primary" className="w-100" onClick={() => setUpdate((prev) => !prev)}>
              Edit
            </Button></>
          }
        </>}
      </div>
    </div>
  );
};

export default ProfileCard;
