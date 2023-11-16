export interface ListItemModel {
  id: string
  completed: boolean
  label: string
  cost: number
  children?: ListItemModel[]
}

export type NewListItem = Pick<ListItemModel, 'label'>

export type UpdateListItem = ListItemModel

export type NewListItemChildren = Pick<ListItemModel, 'completed' | 'label' | 'cost'> & {
  parentId: string
}
