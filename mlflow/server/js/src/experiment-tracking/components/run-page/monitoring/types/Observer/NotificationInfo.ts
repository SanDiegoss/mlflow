import { NotificationMethod } from "./NotificationMethod";

export interface MethodInfo {
  [prop: string]: string | number;
}

export interface NotificationInfo {
  method: NotificationMethod,
  info: MethodInfo
}

export interface TelegramMethodInfo extends MethodInfo {
  userId: number;
}
