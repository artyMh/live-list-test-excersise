import { create, StateCreator } from 'zustand'
import { io } from 'socket.io-client'

import type { Socket } from 'socket.io-client'
import type { ListItemDTO, NewListItemDTO, NewListItemChildrenDTO, UpdateListItemDTO, InitialDataDTO, UpdatedListDTO } from '@app/core'
import type { AppNotification } from '@app/core'
import type { NotificationType } from '~/helpers/notifications.helper'

import { AppNotificationType, AppError, AppSocketEvent } from '@app/core'
import NotificationsService from '~/common/services/notifications.service'
import { buildUpdatedListMessge } from '~/helpers/list.helper'

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
  listData: ListItemDTO[]
  connectedUsers: string[]
}

type LiveConnectionActions = {
  init: () => void
  connect: (username: string) => void
  setConnectedValue: (connectedToWs: boolean) => void
  setConnectionStateValue: (wsConnectionState: WsConnectionState) => void
  setLoggedIn: (username: string, connectedToWs: boolean) => void
  setListData: (listData: ListItemDTO[]) => void
  addListItem: (newItem: NewListItemDTO) => void
  updateListItem: (updatedItem: UpdateListItemDTO) => void
  deleteListItem: (id: string) => void
  createChildrenListItem: (newChildrenItem: NewListItemChildrenDTO) => void
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

const createLiveConnectionSlice: StateCreator<LiveConnectionStore> = set => {

  const socket: Socket = io(import.meta.env.VITE_WEBSOCKET_SERVER_URL, {
    autoConnect: false,
  })

  const store: LiveConnectionStore = {
    ...initialState,

    init: () => set(() => initialState),
    connect: (username: string) => {

      socket.auth = {
        username,
      }
      socket.connect()
      set(() => ({
        username, wsConnectionState: WsConnectionState.CONNECTING,
      }))

    },
    setConnectedValue: (connectedToWs: boolean) => set(() => ({
      connectedToWs,
    })),
    setConnectionStateValue: (wsConnectionState: WsConnectionState) => set(() => ({
      wsConnectionState,
    })),
    setLoggedIn: (username: string, connectedToWs: boolean) => set({
      username,
      connectedToWs,
      loggedIn: true,
      wsConnectionState: WsConnectionState.CONNECTED,
    }),
    setListData: (listData: ListItemDTO[]) => set(() => ({
      listData,
    })),

    addListItem: (newItem: NewListItemDTO) => {

      socket.emit(AppSocketEvent.QuickAddNewItem, newItem)

    },
    updateListItem: (updatedItem: UpdateListItemDTO) => {

      socket.emit(AppSocketEvent.UpdateItem, updatedItem)

    },
    deleteListItem: (id: string) => {

      socket.emit(AppSocketEvent.DeleteItem, id)

    },
    createChildrenListItem: (newChildrenItem: NewListItemChildrenDTO) => {

      socket.emit(AppSocketEvent.CreateItemChildren, newChildrenItem)

    },
    updateConnectedUsers: (connectedUsers: string[]) => set(() => ({
      connectedUsers,
    })),
  }

  // For debug reasons
  socket.onAny((event, ...args) => {

    console.log('EVENT', event, args)

  })

  socket.on('connect', () => {

    /*
     * TODO: fix this somehow, otherwise direct use of `socket.auth.username` lead to
     * type error "Property 'auth' does not exist on type"
     */
    const socketAuth = socket.auth as { username: string }
    store.setLoggedIn(socketAuth.username, socket.connected)
    NotificationsService.applicationNotification('success', 'Success', 'Successfully connected')
    socket.emit(AppSocketEvent.GetInitialData) // Get data after success login/connect

  })

  socket.on(AppSocketEvent.InitialData, (initialData: InitialDataDTO) => {

    store.setListData(initialData.list)
    store.updateConnectedUsers(initialData.users)

  })

  socket.on(AppSocketEvent.NewList, (updatedList: UpdatedListDTO) => {

    store.setListData(updatedList.list)
    const message = buildUpdatedListMessge(updatedList)
    NotificationsService.applicationNotification('info', 'Update', message)

  })

  socket.on(AppSocketEvent.CurrentUsers, (data: string[]) => {

    store.updateConnectedUsers(data)

  })

  socket.on(AppSocketEvent.ApplicationNotification, (data: AppNotification) => {

    const message = data.description
    let type: NotificationType = 'server'
    let title = 'Server'

    if (data.type === AppNotificationType.ERROR) {

      type = 'error'
      title = 'Server error'

    }

    NotificationsService.applicationNotification(type, title, message)

  })

  socket.on('disconnect', () => {

    store.setConnectedValue(socket.connected)
    store.setConnectionStateValue(WsConnectionState.DISCONNECTED)
    NotificationsService.applicationNotification('error', 'Server error', 'Disconnected')

  })

  socket.on('connect_error', err => {

    if (err instanceof Error) {

      switch (err.message) {

        case AppError.ERROR_INVALID_USERNAME:
          NotificationsService.applicationNotification('error', '', 'Invalid username')
          break

        case AppError.ERROR_USERNAME_ALREADY_TAKEN:
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
