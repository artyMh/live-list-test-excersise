import { Container, Grid, Paper, rem, Title, Text, TextInput, Group, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useNavigate } from 'react-router-dom'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

import ErrorFallback from '@components/error-boundary.component'
import { reloadPage } from '@helpers/common.helper'
import { usernameValidator } from '@helpers/user.helper'
import { useLiveConnectionStore } from '@store/live-connection.store'
import { RoutesMap } from '../../routing/routes-map'

const HomePage = (): JSX.Element => {
  const errorFallback = (props: FallbackProps) => <ErrorFallback {...props} errorText='Something happened on home page'/>
  const connect = useLiveConnectionStore(store => store.connect)
  const navigate = useNavigate()

  const form = useForm<{ username: string}>({
    initialValues: {
      username: ''
    },
    validate: {
      username: (value: string) => usernameValidator(value),
    },
  })

  const onSubmit = (formData: { username: string}) => {
    connect(formData.username)
    navigate(RoutesMap.LIVE)
  }
  
  return(
    <ErrorBoundary
      onReset={reloadPage}
      fallbackRender={errorFallback}
    >
      <Container w={rem(500)}>
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
      </Container>
    </ErrorBoundary>
  )
}

export default HomePage
