export type SocketIoDisconnectReason = 'io server disconnect' | 'io client disconnect' | 'ping timeout' | 'transport close' | 'transport error'

export enum WebSocketAction {
  Connect = 'connect',
  NewList = 'newList',
  ApplicationNotification = 'applicationNotification',
  SendMessage = 'sendMessage',
  ReceiveMessage = 'receiveMessage',
}