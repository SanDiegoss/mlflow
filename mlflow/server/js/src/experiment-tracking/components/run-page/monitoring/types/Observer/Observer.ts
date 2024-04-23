import { NotificationInfo, NotificationMethod } from ".";

export interface Observer {
    method: NotificationMethod,
    info: NotificationInfo
}