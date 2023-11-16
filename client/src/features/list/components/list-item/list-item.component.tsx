import { FormEvent } from 'react'
import { List as MantineList, Checkbox, /*ActionIcon*/ } from '@mantine/core'
// import { IconPlus, IconTrash } from '@tabler/icons-react'

import type { ListItemModel, NewListItemChildren, UpdateListItem } from 'backend-models/list.model'
import ListItemControls from './list-item-controls.component'

export type ListProps = {
  listItem: ListItemModel
  updateItem: (updatedItem: UpdateListItem) => void
  deleteItem: (id: string) => void
  createChildrenItem: (newChildren: NewListItemChildren) => void
  padding?: boolean
}

const ListItem = ({ listItem, padding = false, updateItem, deleteItem, createChildrenItem }: ListProps): JSX.Element => {

  const onCompleteChange = (e: FormEvent<HTMLInputElement>) => {
    updateItem({ ...listItem, completed: e.currentTarget.checked })
  }

  const itemControls = (
    <ListItemControls
      listItem={listItem}
      updateItem={updateItem}
      deleteItem={deleteItem}
      createChildrenItem={createChildrenItem}
    />
  )

  return (  
    <MantineList
      spacing="xs"
      size="sm"
      center
      withPadding={padding}
      listStyleType="none"
    >
      <MantineList.Item pt="xs">
        <Checkbox
          size="md"
          checked={listItem.completed}
          label={itemControls}
          onChange={onCompleteChange}
        />
      </MantineList.Item>
      {listItem.children ? 
        listItem.children.map(childrenItem =>
          <ListItem
            key={childrenItem.id}
            listItem={childrenItem}
            updateItem={updateItem}
            deleteItem={deleteItem}
            createChildrenItem={createChildrenItem}
            padding
          />) :
        null
      }
    </MantineList>
  )
}

export default ListItem
