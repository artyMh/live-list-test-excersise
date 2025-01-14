import { Grid, Title, Text, LoadingOverlay, Box } from '@mantine/core'

import LoginForm from './components/login-form.component'

export type LoginFormProps = Readonly<{
  onLoading: boolean
  onLoginSubmit: (username: string) => void
}>

const LoginFeature = ({ onLoading = false, onLoginSubmit }: LoginFormProps): JSX.Element => {
  const onSubmit = (formData: { username: string}) => {
    onLoginSubmit(formData.username)
  }
  
  return (
    <Grid>
      <Grid.Col span={12}>
        <Title ta="center">
          Login
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Write your name to connect to chat
        </Text>

        <Box pos="relative">
          <LoadingOverlay visible={onLoading} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
          <LoginForm onSubmit={onSubmit} />
        </Box>
      </Grid.Col>
    </Grid>
  )
}

export default LoginFeature
