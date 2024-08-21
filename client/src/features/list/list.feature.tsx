import type { NewListItem } from 'backend-models/list.model'
import type { ListItemFilter } from 'src/common/models/list-item.model'

import List from './components/list.component'
import QuickAddListItem from './components/list-item/list-item-quick-add.component'
import ListItemFilters from './components/list-item/list-item-filters.component'

import { useListStore } from './list.store'

const ListFeature = (): JSX.Element => {
  const listData = useListStore(state => state.listData)
  const addListItem = useListStore(state => state.addListItem)
  const setFilterValue = useListStore(state => state.setFilterValue)

  const onAddListItem = (newItem: NewListItem) => {
    addListItem(newItem)
  }

  const onFilterChange = (filterValue: ListItemFilter) => {
    setFilterValue(filterValue)
  }

  return(
    <>
      <QuickAddListItem onAddItem={onAddListItem} />
      <ListItemFilters onFilterChange={onFilterChange}/>
      <List listData={listData} />
    </>
  )
}

export default ListFeature
