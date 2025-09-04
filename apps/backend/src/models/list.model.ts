export interface ListItemModel {
  id: string
  completed: boolean
  label: string
  cost: number
  children?: ListItemModel[]
}
