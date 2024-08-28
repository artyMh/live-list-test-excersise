export type SocketIoDisconnectReason = 'io server disconnect' | 'io client disconnect' | 'ping timeout' | 'transport close' | 'transport error'

export enum ClientWebSocketEvent {
  Connect = 'connect',
  NewList = 'newList',
  CurrentUsers = 'currentUsers',
  ApplicationNotification = 'applicationNotification',
  SendMessage = 'sendMessage',
  ReceiveMessage = 'receiveMessage',
}