import { Grid, Title, Text, Paper, TextInput, Group, Button } from '@mantine/core'
import { useForm } from '@mantine/form'

import { usernameValidator } from '@helpers/user.helper'

export type LoginProps = Readonly<{
  onSubmit: (values: { username: string }) => void
}>

const Login = ({ onSubmit }: LoginProps) => {
  const form = useForm<{ username: string}>({
    initialValues: {
      username: ''
    },
    validate: {
      username: (value: string) => usernameValidator(value),
    },
  })

  return (
    <Grid>
      <Grid.Col span={12}>
        <Title ta="center">
          Login
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Write your name to connect to chat
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <TextInput label="Your name" required {...form.getInputProps('username')}/>
            <Group justify="center" mt="lg">
              <Button type="submit">Join</Button>
            </Group>
          </form>
        </Paper>
      </Grid.Col>
    </Grid>
  )
}

export default Login