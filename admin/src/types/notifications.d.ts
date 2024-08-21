export interface NotificationProps {
  message: string;
  seen: boolean;
  timestamp: Date;
}

export interface NotificationPropsData {
  notifications: NotificationProps[];
  unseenCount: number;
}
