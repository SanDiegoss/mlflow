import { NotificationMethod } from '.';

export interface Observer {
  id: number;
  method: NotificationMethod;
  [key: string]: any;
}

export interface TelegramObserver extends Observer {
  user_id: number;
}
