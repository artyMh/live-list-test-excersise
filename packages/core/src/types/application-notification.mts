export enum AppNotificationType {
  ERROR,
  INFO,
  WARNING,
}

export interface AppNotification {
  type: AppNotificationType
  description: string
}
