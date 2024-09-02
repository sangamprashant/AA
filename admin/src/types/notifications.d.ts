export interface NotificationProps {
  _id: string; 
  message: string;
  seen: boolean;
  timestamp: Date;
}

export interface NotificationPropsData {
  notifications: NotificationProps[];
  unseenCount: number;
}
