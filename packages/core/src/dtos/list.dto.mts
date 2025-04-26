export type ListItemDTO = {
  id: string
  completed: boolean
  label: string
  cost: number
  children?: ListItemDTO[]
}

export type NewListItemDTO = Pick<ListItemDTO, 'label'>

export type UpdateListItemDTO = ListItemDTO

export type NewListItemChildrenDTO = Pick<ListItemDTO, 'completed' | 'label' | 'cost'> & {
  parentId: string
}

export enum ListUpdateType {
  ADDED_ITEM,
  ADDED_CHILD_ITEM,
  UPDATED_ITEM,
  DELETED_ITEM
}

export type UpdatedListDTO = {
  list: ListItemDTO
  updateSource: string // User name
  updateType: ListUpdateType
}
