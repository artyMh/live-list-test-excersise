export enum ApplicationActionType {
  ERROR,
  INFO,
  WARNING,
}

export interface ApplicationNotificationModel {
  type: ApplicationActionType
  description: string
}

export enum ApplicationError {
  ERROR_INVALID_USERNAME = 'ERROR_INVALID_USERNAME',
  ERROR_USERNAME_ALREADY_TAKEN = 'ERROR_USERNAME_ALREADY_TAKEN',
}
