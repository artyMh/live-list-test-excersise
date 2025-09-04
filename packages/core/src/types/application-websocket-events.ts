export type SocketIoDisconnectReason = 'io server disconnect' | 'io client disconnect' | 'ping timeout' | 'transport close' | 'transport error'

export enum AppSocketEvent {
  GetInitialData = 'getInitialData',
  InitialData = 'getInitialData',
  ApplicationNotification = 'applicationNotification', 
  CurrentUsers = 'currentUsers',
  NewList = 'newList',
  QuickAddNewItem = 'quickAddNewItem',
  UpdateItem = 'updateItem',
  DeleteItem = 'deleteItem',
  CreateItemChildren = 'createItemChildren',
}
