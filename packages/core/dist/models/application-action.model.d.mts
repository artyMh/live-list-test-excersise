export declare enum ApplicationActionType {
    ERROR = 0,
    INFO = 1,
    WARNING = 2
}
export interface ApplicationActionModel {
    type: ApplicationActionType;
    description: string;
}
