import { Button, Container, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import type { NewListItem } from '@app/core'

import { labelValidator } from '~/helpers/list.helper'

export type QuickAddItemProps = Readonly<{
  onAddItem: (newItem: NewListItem) => void
}>

type QuickAddListItemForm = {
  label: string
}

const QuickAddListItem = ({ onAddItem }: QuickAddItemProps): JSX.Element => {
  const form = useForm({
    initialValues: {
      label: '',
    },

    validate: {
      label: (value: string) => labelValidator(value),
    },
  })

  const onSubmit = (itemValues: QuickAddListItemForm) => {
    onAddItem({ label: itemValues.label })
  }

  return (
    <Container mt="xl" mb="xl">
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput placeholder="Write list item label" {...form.getInputProps('label')} />
        <Button mt="xs" fullWidth type="submit">Add item</Button>
      </form>
    </Container>
  )
}

export default QuickAddListItem
