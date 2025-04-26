import { ActionIcon, Badge, Box, Flex } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus, IconTrash, IconEdit } from '@tabler/icons-react'

import { ListItemDTO, NewListItemChildrenDTO, UpdateListItemDTO } from '@app/core'
import { EditItemModalMode } from '~/core/types/edit-item-modal'
import EditItemModal from './list-item-edit-modal.component'

export type ListItemControlsProps = Readonly<{
  listItem: ListItemDTO
  updateItem: (updatedItem: UpdateListItemDTO) => void
  deleteItem: (id: string) => void
  createChildrenItem: (newChildren: NewListItemChildrenDTO) => void
}>

const ListItemControls = ({ listItem, updateItem, deleteItem, createChildrenItem }: ListItemControlsProps): JSX.Element => {
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] = useDisclosure(false)
  const [addChildrenModalOpened, { open: openAddChildrenModal, close: closeAddChildrenModal }] = useDisclosure(false)

  const onUpdateItem = (editedItem: UpdateListItemDTO) => {
    updateItem(editedItem)
  }

  const onDelete = () => {
    deleteItem(listItem.id)
  }

  const onCreateChildren = (newChildren: NewListItemChildrenDTO) => {
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
      <Badge color="orange" size="md" variant="light" ml="xs" mr="xs">
        € {listItem.cost.toFixed(2)}
      </Badge>
      <Box ml="auto">
        {listItem.label}
      </Box>
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
