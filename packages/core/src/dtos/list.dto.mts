export interface ListItemBaseDTO {
  id: string
  completed: boolean
  label: string
  cost: number
  children?: ListItemBaseDTO[]
}

export type UpdateListItemDTO = ListItemBaseDTO

export type NewListItemDTO = Pick<ListItemBaseDTO, 'label'>

export type NewListItemChildrenDTO = Pick<ListItemBaseDTO, 'completed' | 'label' | 'cost'> & {
  parentId: string
}
