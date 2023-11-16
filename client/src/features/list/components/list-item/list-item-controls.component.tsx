import { ActionIcon, Badge, Box, Flex } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus, IconTrash, IconEdit } from '@tabler/icons-react'

import { ListItemModel, NewListItemChildren, UpdateListItem } from 'backend-models/list.model'
import EditItemModal, { EditItemModalMode } from './list-item-edit-modal.component'

export type ListItemControlsProps = {
  listItem: ListItemModel
  updateItem: (updatedItem: UpdateListItem) => void
  deleteItem: (id: string) => void
  createChildrenItem: (newChildren: NewListItemChildren) => void
}

const ListItemControls = ({ listItem, updateItem, deleteItem, createChildrenItem }: ListItemControlsProps): JSX.Element => {
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false)
  const [addChildrenModalOpened, { open: openAddChildrenModal, close: closeAddChildrenModal }] = useDisclosure(false)

  const onUpdateItem = (editedItem: UpdateListItem) => {
    updateItem(editedItem)
  }

  const onDelete = () => {
    deleteItem(listItem.id)
  }

  const onCreateChildren = (newChildren: NewListItemChildren) => {
    createChildrenItem(newChildren)
  } 

  return (
    <Flex align="center">
      <ActionIcon color="red" variant="light" size="sm" mr="xs">
        <IconTrash onClick={onDelete} />
      </ActionIcon>
      <ActionIcon color="grape" variant="light" size="sm" mr="xs">
        <IconEdit onClick={openEditModal} />
      </ActionIcon>
      <ActionIcon color="green" variant="light" size="sm" mr="xs">
        <IconPlus onClick={openAddChildrenModal} />
      </ActionIcon>
      <Box>
        {listItem.label}
      </Box>
      <Badge color="orange" size="sm" variant="light">
        € {listItem.cost}
      </Badge>
      <EditItemModal
        opened={addChildrenModalOpened}
        onClose={closeAddChildrenModal}
        mode={EditItemModalMode.ADD_ITEM_CHILDREN}
        listItem={listItem}
        updateItem={onUpdateItem}
        addChildrenToItem={onCreateChildren}
      />
      <EditItemModal
        opened={editModalOpened}
        onClose={closeEditModal}
        mode={EditItemModalMode.EDIT_ITEM}
        listItem={listItem}
        updateItem={onUpdateItem}
        addChildrenToItem={onCreateChildren}
      />
    </Flex>
  )
}

export default ListItemControls