import { Paper, TextInput, Group, Button } from '@mantine/core'
import { useForm } from '@mantine/form'

import { usernameValidator } from '~/helpers/user.helper'

export type LoginFormProps = Readonly<{
  onSubmit: (values: { username: string }) => void
}>

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const form = useForm<{ username: string}>({
    initialValues: {
      username: ''
    },
    validate: {
      username: (value: string) => usernameValidator(value),
    },
  })

  return (
    <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <TextInput label="Your name" required {...form.getInputProps('username')}/>
        <Group justify="center" mt="lg">
          <Button type="submit">Join</Button>
        </Group>
      </form>
    </Paper>
  )
}

export default LoginForm
