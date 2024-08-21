import { create } from 'zustand'
import { io } from 'socket.io-client'
import { notifications } from '@mantine/notifications'

import type { Socket } from 'socket.io-client'
import type { ListItemModel, NewListItem, NewListItemChildren, UpdateListItem } from 'backend-models/list.model'
import type { ApplicationActionModel } from 'backend-models/application-action.model'

import { NotificationType, successNotification } from '../../helpers/notifications.helper'

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

export type LiveConnectionStore = LiveConnectionState & LiveConnectionActions

const initialState: LiveConnectionState = {
  connectedToWs: false,
  listData: []
}

const socket: Socket = io(import.meta.env.VITE_WEBSOCKET_SERVER_URL)

export const useLiveConnectionStore = create<LiveConnectionStore>()((set) => {
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
    notifications.show(successNotification({
      type: 'success',
      title: 'Hoorai!',
      message: 'Successfully connected!',
      autoClose: 4000,
    }))
  })
  
  socket.on('newList', (data: ListItemModel[]) => {
    store.setListData(data)
   
    notifications.show(successNotification({
      type: 'info',
      title: 'Update',
      message: 'New list arrived! ',
      autoClose: 4000,
    }))
  })

  socket.on('applicationNotification', (data: ApplicationActionModel) => {
    const message = data.description
    let type: NotificationType = 'info'
    let title = 'Info'

    if (data.type === 0) {
      type = 'error'
      title = 'Server error'
    }

    notifications.show(successNotification({
      type,
      title,
      message,
      autoClose: 4000,
    }))
  })

  socket.on('disconnect', () => {
    store.setConnectedValue(socket.connected)

    notifications.show(successNotification({
      type: 'error',
      title: 'Server error',
      message: 'Disconnected',
      autoClose: 4000,
    }))
  })

  socket.emit('getList')

  return store
})
