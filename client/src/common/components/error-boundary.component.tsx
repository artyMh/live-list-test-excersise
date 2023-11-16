// import { memo } from 'react'
import { Alert, Button, Grid } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'

type ErrorFallbackProps = {
  error: Error
  resetErrorBoundary: () => void
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps): JSX.Element => {
  const icon = <IconInfoCircle/>

  return (
    <Grid justify="center">
      <Grid.Col span="content">
        <Alert variant="light" color="red" title="Alert title" icon={icon}>
          <p>Something went wrong:</p>
          <pre>{error.message}</pre>
          <Button variant="light" color="red" onClick={resetErrorBoundary}>Reload page</Button>
        </Alert>
      </Grid.Col>
    </Grid>
    
  )
}

export default ErrorFallback
// export default memo(ErrorFallback)
