import type { NewListItem, NewListItemChildren, UpdateListItem } from 'backend-models/list.model'
import type { ListItemFilter } from 'src/common/models/list-item.model'

import List from './components/list.component'
import QuickAddListItem from './components/list-item/list-item-quick-add.component'
import ListItemFilters from './components/list-item/list-item-filters.component'

import { useListStore } from './list.store'

const ListFeature = (): JSX.Element => {
  const listData = useListStore(state => state.listData)
  const addListItem = useListStore(state => state.addListItem)
  const updateListItem = useListStore(state => state.updateListItem)
  const deleteListItem = useListStore(state => state.deleteListItem)
  const createChildrenListItem = useListStore(state => state.createChildrenListItem)
  const setFilterValue = useListStore(state => state.setFilterValue)
  // const createChildrenListItem = useListStore(state => state.filterValue)


  const onAddListItem = (newItem: NewListItem) => {
    addListItem(newItem)
  }
  
  const onUpdateListItem = (updatedItem: UpdateListItem) => {
    updateListItem(updatedItem)
  }

  const onDeleteListItem = (id: string) => {
    deleteListItem(id)
  }

  const onCreateChildrenListItem = (newChildrenItem: NewListItemChildren) => {
    createChildrenListItem(newChildrenItem)
  }

  const onFilterChange = (filterValue: ListItemFilter) => {
    setFilterValue(filterValue)
    // setListData(filterList(structuredClone(listDataCache), filterValue))
  }

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
