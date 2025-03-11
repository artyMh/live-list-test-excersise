import { create, StateCreator } from 'zustand'
import { io } from 'socket.io-client'

import type { Socket } from 'socket.io-client'
import type { ListItemModel, NewListItem, NewListItemChildren, UpdateListItem } from 'backend-models/list.model'
import type { ApplicationActionModel } from 'backend-models/application-action.model'
import type { NotificationType } from '@helpers/notifications.helper'

import NotificationsService from '@services/notifications.service'
import { ApplicationActionType } from 'backend-models/application-action.model'
import { ApplicationError } from 'backend-models/application-error.model'

export enum WsConnectionState {
  IDLE,
  CONNECTING,
  CONNECTED,
  DISCONNECTED,
  ERROR,
}

type LiveConnectionState = {
  wsConnectionState: WsConnectionState
  connectedToWs: boolean
  username: string
  loggedIn: boolean
  listData: ListItemModel[]
  connectedUsers: string[]
}

type LiveConnectionActions = {
  init: () => void
  connect: (username: string) => void
  setConnectedValue: (connectedToWs: boolean) => void
  setConnectionStateValue: (wsConnectionState: WsConnectionState) => void
  setLoggedIn: (username: string, connectedToWs: boolean) => void
  setListData: (listData: ListItemModel[]) => void
  addListItem: (newItem: NewListItem) => void
  updateListItem: (updatedItem: UpdateListItem) => void
  deleteListItem: (id: string) => void
  createChildrenListItem: (newChildrenItem: NewListItemChildren) => void
  updateConnectedUsers: (connectedUsers: string[]) => void
}

type LiveConnectionStore = LiveConnectionState & LiveConnectionActions

const initialState: LiveConnectionState = {
  wsConnectionState: WsConnectionState.IDLE,
  connectedToWs: false,
  loggedIn: false,
  username: '',
  listData: [],
  connectedUsers: [],
}

const createLiveConnectionSlice: StateCreator<LiveConnectionStore> = (set) => {
  const socket: Socket = io(import.meta.env.VITE_WEBSOCKET_SERVER_URL, { autoConnect: false })

  const store: LiveConnectionStore = {
    ...initialState,

    init: () => set(() => initialState),
    connect: (username: string) => {
      socket.auth = { username }
      socket.connect()
      set(() => ({ username, wsConnectionState: WsConnectionState.CONNECTING }))
    },
    setConnectedValue: (connectedToWs: boolean) => set(() => ({ connectedToWs })),
    setConnectionStateValue: (wsConnectionState: WsConnectionState) => set(() => ({ wsConnectionState })),
    setLoggedIn: (username: string, connectedToWs: boolean) => set({
      username,
      connectedToWs,
      loggedIn: true,
      wsConnectionState: WsConnectionState.CONNECTED
    }),
    setListData: (listData: ListItemModel[]) => set(() => ({ listData })),

    addListItem: (newItem: NewListItem) => {
      socket.emit('quickAddNewItem', newItem)
    },
    updateListItem: (updatedItem: UpdateListItem) => {
      socket.emit('updateItem', updatedItem)
    },
    deleteListItem: (id: string) => {
      socket.emit('deleteItem', id)
    },
    createChildrenListItem: (newChildrenItem: NewListItemChildren) => {
      socket.emit('createItemChildren', newChildrenItem)
    },
    updateConnectedUsers: (connectedUsers: string[]) => set(() => ({ connectedUsers }))
  }

  // For debug reasons
  socket.onAny((event, ...args) => {
    console.log('EVENT', event, args)
  })

  socket.on('connect', () => {
    // TODO: fix this somehow, otherwise direct use of `socket.auth.username` lead to 
    // type error "Property 'auth' does not exist on type"
    const socketAuth = socket.auth as { username: string }
    store.setLoggedIn(socketAuth.username, socket.connected)
    NotificationsService.applicationNotification('success', 'Success', 'Successfully connected')
    socket.emit('getCurrentData') // Get data after success login/connect
  })
  
  socket.on('newList', (data: ListItemModel[]) => {
    store.setListData(data)
    NotificationsService.applicationNotification('info', 'Update', 'New list recevied')
  })

  socket.on('applicationNotification', (data: ApplicationActionModel) => {
    const message = data.description
    let type: NotificationType = 'info'
    let title = 'Info'

    if (data.type === ApplicationActionType.ERROR) {
      type = 'error'
      title = 'Server error'
    }

    NotificationsService.applicationNotification(type,  title, message)
  })

  socket.on('currentUsers', (data: string[]) => {
    store.updateConnectedUsers(data)
  })

  socket.on('disconnect', () => {
    store.setConnectedValue(socket.connected)
    store.setConnectionStateValue(WsConnectionState.DISCONNECTED)
    NotificationsService.applicationNotification('error', 'Server error', 'Disconnected')
  })

  socket.on('connect_error', (err) => {
    if (err instanceof Error) {
      console.log('WHAT?', err)
      switch (err.message) {
        case ApplicationError.ERROR_INVALID_USERNAME:
          NotificationsService.applicationNotification('error', '', 'Invalid username')
          break

        case ApplicationError.ERROR_USERNAME_ALREADY_TAKEN:
          NotificationsService.applicationNotification('error', '', 'This username already taken')
          break

        default:
          NotificationsService.applicationNotification('error', 'Error', 'Unexpected error occured, check console for details')
          console.error('Error in socker.io:', err)
      }
    } else {
      console.error('Undefined error in socker.io:', err)
    }

    store.setConnectionStateValue(WsConnectionState.ERROR)
  })

  return store
}

export const useLiveConnectionStore = create<LiveConnectionStore>()(createLiveConnectionSlice)
