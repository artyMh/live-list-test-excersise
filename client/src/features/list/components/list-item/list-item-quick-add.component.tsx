import { Button, Container, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import type { NewListItem } from 'backend-models/list.model'

import { labelRegexValidator } from '../../../../helpers/list.helper'

export type QuickAddItemProps = {
  onAddItem: (newItem: NewListItem) => void
}

type QuickAddListItemForm = {
  label: string
}

const QuickAddListItem = ({ onAddItem }: QuickAddItemProps): JSX.Element => {
  const form = useForm({
    initialValues: {
      label: '',
    },

    validate: {
      label: (value: string) => (labelRegexValidator.test(value) ? null : 'Label name contains special symbols'),
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
