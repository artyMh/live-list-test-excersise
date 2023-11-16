import { Card } from '@mantine/core'

import type { ListItemModel, NewListItemChildren, UpdateListItem } from 'backend-models/list.model'

import ListItem from './list-item/list-item.component'

export type ListProps = {
  listData: ListItemModel[]
  updateItem: (updatedItem: UpdateListItem) => void
  deleteItem: (id: string) => void
  createChildrenItem: (newChildren: NewListItemChildren) => void
}

const List = ({ listData, updateItem, deleteItem, createChildrenItem }: ListProps): JSX.Element => {
  return (
    <Card shadow="sm" padding="lg" radius="md" mt="xl" withBorder>
      {listData.map(item =>
        <ListItem
          key={item.id}
          listItem={item}
          updateItem={updateItem}
          deleteItem={deleteItem}
          createChildrenItem={createChildrenItem}
        />
      )}
    </Card>
  )
}

export default List
