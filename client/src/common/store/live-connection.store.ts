import { create, StateCreator } from 'zustand'
import { io } from 'socket.io-client'

import type { Socket } from 'socket.io-client'
import type { ListItemModel, NewListItem, NewListItemChildren, UpdateListItem } from 'backend-models/list.model'
import type { ApplicationActionModel } from 'backend-models/application-action.model'
import type { NotificationType } from 'src/helpers/notifications.helper'

import NotificationsService from '@services/notifications.service'

type LiveConnectionState = {
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

  setListData: (listData: ListItemModel[]) => void
  addListItem: (newItem: NewListItem) => void
  updateListItem: (updatedItem: UpdateListItem) => void
  deleteListItem: (id: string) => void
  createChildrenListItem: (newChildrenItem: NewListItemChildren) => void
  updateConnectedUsers: (connectedUsers: string[]) => void
}

type LiveConnectionStore = LiveConnectionState & LiveConnectionActions

const initialState: LiveConnectionState = {
  connectedToWs: false,
  loggedIn: false,
  username: '',
  listData: [],
  connectedUsers: [],
}

const createLiveConnectionSlice: StateCreator<LiveConnectionStore> = (set) => {
  const socket: Socket = io(import.meta.env.VITE_WEBSOCKET_SERVER_URL, { autoConnect: false })
  // const socket: Socket = io(import.meta.env.VITE_WEBSOCKET_SERVER_URL)

  socket.onAny((event, ...args) => {
    console.log('EVENT', event, args)
  })

  const store: LiveConnectionStore = {
    connectedToWs: false,
    loggedIn: true,
    username: '',
    listData: [],
    connectedUsers: [],

    init: () => set(() => initialState),
    connect: (username: string) => {
      socket.auth = { username }
      socket.connect()
      set(() => ({ username, loggedIn: true }))
    },
    setConnectedValue: (connectedToWs: boolean) => set(() => ({ connectedToWs })),
    
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

  socket.on('connect', () => {
    store.setConnectedValue(socket.connected)
    NotificationsService.applicationNotification('success', 'Success', 'Successfully connected')
  })
  
  socket.on('newList', (data: ListItemModel[]) => {
    store.setListData(data)
    NotificationsService.applicationNotification('info', 'Update', 'New list recevied')
  })

  socket.on('applicationNotification', (data: ApplicationActionModel) => {
    const message = data.description
    let type: NotificationType = 'info'
    let title = 'Info'

    if (data.type === 0) {
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
    NotificationsService.applicationNotification('error', 'Server error', 'Disconnected')
  })

  socket.emit('getCurrentData')

  return store
}

export const useLiveConnectionStore = create<LiveConnectionStore>()(createLiveConnectionSlice)
