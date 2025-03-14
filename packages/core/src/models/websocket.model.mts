export type SocketIoDisconnectReason = 'io server disconnect' | 'io client disconnect' | 'ping timeout' | 'transport close' | 'transport error'

export enum AppSocketEvent {
  GetCurrentData = 'getCurrentData',
  CurrentUsers = 'currentUsers',
  ApplicationNotification = 'applicationNotification',
  NewList = 'newList',
  QuickAddNewItem = 'quickAddNewItem',
  UpdateItem = 'updateItem',
  DeleteItem = 'deleteItem',
  CreateItemChildren = 'createItemChildren',
}
