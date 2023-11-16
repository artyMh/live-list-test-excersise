import { useEffect, useState } from 'react'

import { notifications } from '@mantine/notifications'
import { io } from 'socket.io-client'

import type { ListItemModel, NewListItem, NewListItemChildren, UpdateListItem } from 'backend-models/list.model'
import type { ListItemFilter } from 'src/common/models/list-item.model'
import type { ApplicationActionModel } from 'backend-models/application-action.model'

import { filterList } from '../../helpers/list.helper'
import { NotificationType, successNotification } from '../../helpers/notifications.helper'

import List from './components/list.component'
import QuickAddListItem from './components/list-item/list-item-quick-add.component'
import ListItemFilters from './components/list-item/list-item-filters.component'


let listDataCache: ListItemModel[]

const socket = io('http://localhost:4000')

const ListFeature = (): JSX.Element => {
  const [ listData, setListData ] = useState<ListItemModel[]>([])

  const onAddListItem = (newItem: NewListItem) => {
    socket.emit('quickAddNewItem', newItem)
  }
  
  const onUpdateListItem = (updatedItem: UpdateListItem) => {
    socket.emit('updateItem', updatedItem)
  }

  const onDeleteListItem = (id: string) => {
    socket.emit('deleteItem', id)
  }

  const onCreateChildrenListItem = (newChildrenItem: NewListItemChildren) => {
    socket.emit('createItemChildren', newChildrenItem)
  }

  const onFilterChange = (filterValue: ListItemFilter) => {
    setListData(filterList(structuredClone(listDataCache), filterValue))
  }

  useEffect(() => {
    socket.on('newList', (data: ListItemModel[]) => {
      console.log('[List Feature] List arrived',data)
      listDataCache = structuredClone(data)
      setListData(data)
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
    console.log('[List Feature] Emitting "getList"')
    socket.emit('getList')
  }, [])

  console.log('[List Feature] Render')
  
  return(
    <>
      <QuickAddListItem onAddItem={onAddListItem} />
      <ListItemFilters onFilterChange={onFilterChange}/>
      <List
        listData={listData}
        updateItem={onUpdateListItem}
        deleteItem={onDeleteListItem}
        createChildrenItem={onCreateChildrenListItem}
      />
    </>
  )
}

export default ListFeature
