import { create, StateCreator } from 'zustand'
import { io } from 'socket.io-client'

import type { Socket } from 'socket.io-client'
import type { ListItemModel, NewListItem, NewListItemChildren, UpdateListItem } from 'backend-models/list.model'
import type { ApplicationActionModel } from 'backend-models/application-action.model'
import type { NotificationType } from 'src/helpers/notifications.helper'

import DefinedGlobalNotificationsService from '../services/defined-global-notifications.service'

type LiveConnectionState = {
  connectedToWs: boolean
  listData: ListItemModel[]
}

type LiveConnectionActions = {
  init: () => void
  setConnectedValue: (connectedToWs: boolean) => void

  setListData: (listData: ListItemModel[]) => void
  addListItem: (newItem: NewListItem) => void
  updateListItem: (updatedItem: UpdateListItem) => void
  deleteListItem: (id: string) => void
  createChildrenListItem: (newChildrenItem: NewListItemChildren) => void
}

type LiveConnectionStore = LiveConnectionState & LiveConnectionActions

const initialState: LiveConnectionState = {
  connectedToWs: false,
  listData: []
}

const createLiveConnectionSlice: StateCreator<LiveConnectionStore> = (set) => {
  const socket: Socket = io(import.meta.env.VITE_WEBSOCKET_SERVER_URL)

  const store: LiveConnectionStore = {
    connectedToWs: false,
    listData: [],

    init: () => set(() => initialState),
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
  }

  socket.on('connect', () => {
    store.setConnectedValue(socket.connected)
    DefinedGlobalNotificationsService.connected()
  })
  
  socket.on('newList', (data: ListItemModel[]) => {
    store.setListData(data)
    DefinedGlobalNotificationsService.newListReceived()
  })

  socket.on('applicationNotification', (data: ApplicationActionModel) => {
    const message = data.description
    let type: NotificationType = 'info'
    let title = 'Info'

    if (data.type === 0) {
      type = 'error'
      title = 'Server error'
    }

    DefinedGlobalNotificationsService.applicationNotification(type,  title, message)
  })

  socket.on('disconnect', () => {
    store.setConnectedValue(socket.connected)
    DefinedGlobalNotificationsService.disconnected()
  })

  socket.emit('getList')

  return store
}

export const useLiveConnectionStore = create<LiveConnectionStore>()(createLiveConnectionSlice)
