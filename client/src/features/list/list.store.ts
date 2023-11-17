import { create } from 'zustand'
import { io } from 'socket.io-client'
import { notifications } from '@mantine/notifications'

import type { ListItemModel, NewListItem, NewListItemChildren, UpdateListItem } from 'backend-models/list.model'
import type { ApplicationActionModel } from 'backend-models/application-action.model'
import type { ListItemFilter } from 'src/common/models/list-item.model'

import { NotificationType, successNotification } from '../../helpers/notifications.helper'
import { filterList } from '../../helpers/list.helper'

export type ListStore = {
  connectedToWs: boolean
  listData: ListItemModel[]
  filterValue: ListItemFilter
  listDataCache: ListItemModel[]

  setConnectedValue: (connectedToWs: boolean) => void
  setListData: (listData: ListItemModel[]) => void
  setFilterValue: (filterValue: ListItemFilter) => void
  setListDataCache: (listData: ListItemModel[]) => void

  addListItem: (newItem: NewListItem) => void
  updateListItem: (updatedItem: UpdateListItem) => void
  deleteListItem: (id: string) => void
  createChildrenListItem: (newChildrenItem: NewListItemChildren) => void
}

const socket = io(import.meta.env.VITE_WEBSOCKET_SERVER_URL)

export const useListStore = create<ListStore>()((set) => {
  const store: ListStore = {
    connectedToWs: false,
    listData: [],
    filterValue: 'all',
    listDataCache: [],
  
    setConnectedValue: (connectedToWs: boolean) => set(() => ({ connectedToWs })),
    setListData: (listData: ListItemModel[]) => set(() => ({ listData })),
    setListDataCache: (listDataCache: ListItemModel[]) => set(() => ({ listDataCache })),
    setFilterValue: (filterValue: ListItemFilter) => set((state) => ({
      filterValue,
      listData: filterList(structuredClone(state.listDataCache), filterValue)
    })),

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
    store.setListDataCache(structuredClone(data))
   
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
