import { create } from 'zustand'

import type { ListItemFilter } from '@models/list-item.model'

type ListStoreState = {
  filterValue: ListItemFilter
}

type ListStoreActions = {
  setFilterValue: (filterValue: ListItemFilter) => void
}

type ListStore = ListStoreState & ListStoreActions

export const useListStore = create<ListStore>()((set) => {
  const store: ListStore = {
    filterValue: 'all',
  
    setFilterValue: (filterValue: ListItemFilter) => set(() => ({ filterValue }))
  }

  return store
})
