export enum ApplicationActionType {
  ERROR,
  INFO,
  WARNING,
}

export interface ApplicationActionModel {
  type: ApplicationActionType
  description: string
}
