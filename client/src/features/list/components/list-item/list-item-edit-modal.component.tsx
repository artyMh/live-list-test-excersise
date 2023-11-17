import { Button, Checkbox, Group, Modal, ModalProps, TextInput, NumberInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconEdit, IconPlus, IconCurrencyEuro } from '@tabler/icons-react'

import type { ListItemModel, NewListItemChildren } from 'backend-models/list.model'

import { labelValidator } from '../../../../helpers/list.helper'

export enum EditItemModalMode {
  EDIT_ITEM = 'edit_item',
  ADD_ITEM_CHILDREN = 'add_item_children'
}

export type EditItemModalProps = ModalProps & {
  mode: EditItemModalMode
  listItem: ListItemModel
  updateItem: (updatedItem: ListItemModel) => void
  addChildrenToItem: (newChildren: NewListItemChildren) => void
}

type ListItemForm = Pick<ListItemModel, 'id' | 'completed' | 'label' | 'cost'>

const EditItemModal = ({ opened, onClose, mode, listItem, updateItem, addChildrenToItem }: EditItemModalProps): JSX.Element => {
  const isEditMode = mode === EditItemModalMode.EDIT_ITEM
  const form = useForm<ListItemForm>({
    initialValues: {
      id: isEditMode ? listItem.id : '',
      label: isEditMode ? listItem.label : '',
      completed: isEditMode ? listItem.completed : false,
      cost: isEditMode ? (listItem.cost ?? 0) : 0,
    },

    validate: {
      label: (value: string) => labelValidator(value),
    },
  })

  const onSubmit = (itemFormValues: ListItemForm) => {
    if (isEditMode) {
      updateItem(itemFormValues as ListItemModel)
    } else {
      const newChildren: NewListItemChildren = { ...itemFormValues, parentId: listItem.id}  
      addChildrenToItem(newChildren)
    }
    onClose()
  }

  let title

  if (isEditMode) {
    title = (
      <>
        <IconEdit></IconEdit>Edit: {listItem.label}
      </>
    )
  } else {
    title = (
      <>
        <IconPlus></IconPlus>Add children to: {listItem.label}
      </>
    )
  }

  return(
    <Modal opened={opened} onClose={onClose} title={title} centered>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput
          type="hidden"
          {...form.getInputProps('id')}
        />
        <TextInput
          withAsterisk
          data-autofocus
          label="Label"
          {...form.getInputProps('label')}
        />
        <NumberInput
          withAsterisk
          label="Cost"
          mt="md"
          decimalScale={2}
          fixedDecimalScale
          leftSection={<IconCurrencyEuro />}
          {...form.getInputProps('cost')}
        />
        <Checkbox
          mt="md"
          label="Is item completed"
          {...form.getInputProps('completed', { type: 'checkbox' })}
        />
        <Group justify="flex-end" mt="md">
          <Button variant="light" color="gray" onClick={onClose}>Close</Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  )
}

export default EditItemModal
