import { useMemo } from 'react'

import type { NewListItemDTO } from '@app/core'
import type { ListItemFilter } from 'src/core/models/list-item.model'

import List from './components/list.component'
import QuickAddListItem from './components/list-item/list-item-quick-add.component'
import ListItemFilters from './components/list-item/list-item-filters.component'

import { filterList } from '~/helpers/list.helper'
import { useLiveConnectionStore } from '~/core/store/live-connection.store'
import { useListStore } from './list.store'

const ListFeature = (): JSX.Element => {
  const listData = useLiveConnectionStore(state => state.listData)
  const addListItem = useLiveConnectionStore(state => state.addListItem)

  const filterValue = useListStore(state => state.filterValue)
  const setFilterValue = useListStore(state => state.setFilterValue)
  
  const filteredListData = useMemo(() => filterList(structuredClone(listData), filterValue), [filterValue, listData])

  const onAddListItem = (newItem: NewListItemDTO) => {
    addListItem(newItem)
  }

  const onFilterChange = (filterValue: ListItemFilter) => {
    setFilterValue(filterValue)
  }

  return(
    <>
      <QuickAddListItem onAddItem={onAddListItem} />
      <ListItemFilters onFilterChange={onFilterChange}/>
      <List listData={filteredListData} />
    </>
  )
}

export default ListFeature
