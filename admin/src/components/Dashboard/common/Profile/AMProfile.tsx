import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { config } from "../../../../config";
import { SessionDates, User } from "../../../../types/profile";
import { AuthContext } from "../../../context/AuthProvider";
import Spinner from "../Spinner";
import ProfileWrapper from "./AMProfileOpen/ProfileWrapper";

const AMProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const globles = useContext(AuthContext);
  if (!globles) return null;

  useEffect(() => {
    if (id) fetchUser();
  }, [id]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${config.SERVER}/auth/user-profile/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${globles.token}`,
          },
        }
      );
      setProfileUser(response.data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProfileOpenProvider profileId={id} user={profileUser}>
      <div className="nav-bar mb-2 d-flex justify-content-between align-items-center">
        <h5 className=" text-uppercase">PROFILE: {profileUser?.name}</h5>
        <div className="d-flex gap-2"></div>
      </div>
      {loading ? <Spinner /> : <ProfileWrapper />}
    </ProfileOpenProvider>
  );
};

export default AMProfile;

interface ProfileOpenProviderProps {
  children: ReactNode;
  profileId: string | undefined;
  user: User | null;
}

interface ProfileContextType {
  profileId: string | undefined;
  profileUser: User | null;
  sessionDates: SessionDates[];
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
  undefined
);

const ProfileOpenProvider = ({
  children,
  profileId,
  user,
}: ProfileOpenProviderProps) => {
  const [currentProfileId, setCurrentProfileId] = useState<string | undefined>(
    profileId
  );
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [sessionDates, setSessionDated] = useState<SessionDates[] | []>([]);

  useEffect(() => {
    setProfileUser(user);
  }, [user]);

  useEffect(() => {
    setCurrentProfileId(profileId);
  }, [profileId]);

  useEffect(() => {
    const createdAt = user?.createdAt ? new Date(user.createdAt) : undefined;
    if (!createdAt) {
      return;
    }

    const createdYear = createdAt.getFullYear();
    const createdMonth = createdAt.getMonth() + 1;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const data = [];

    for (let year = createdYear; year <= currentYear; year++) {
      let startMonth = year === createdYear ? createdMonth : 1;
      let endMonth = year === currentYear ? currentMonth : 12;

      for (let month = startMonth; month <= endMonth; month++) {
        data.push({ year, month });
      }
    }

    setSessionDated(data.reverse());
  }, [user]);

  return (
    <ProfileContext.Provider
      value={{ profileId: currentProfileId, profileUser, sessionDates }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
