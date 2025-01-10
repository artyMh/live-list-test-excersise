import { memo } from 'react'
import { Alert, Button, Grid } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'

type ErrorFallbackProps = {
  error: Error
  resetErrorBoundary: () => void
  errorText?: string
}

const ErrorFallback = ({ error, resetErrorBoundary, errorText }: ErrorFallbackProps): JSX.Element => {
  const icon = <IconInfoCircle/>

  return (
    <Grid justify="center">
      <Grid.Col span="content">
        <Alert variant="light" color="red" title="Error" icon={icon}>
          {errorText ?? <p>Something went wrong:</p>}
          <pre>{error.message}</pre>
          <Button variant="light" color="red" onClick={resetErrorBoundary}>Reload page</Button>
        </Alert>
      </Grid.Col>
    </Grid>
    
  )
}

export default memo(ErrorFallback)
