export interface NotificationProps {
  _id: string; // Ensure _id is included
  message: string;
  seen: boolean;
  timestamp: Date;
}

export interface NotificationPropsData {
  notifications: NotificationProps[];
  unseenCount: number;
}
