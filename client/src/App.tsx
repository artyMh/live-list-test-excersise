
import { ErrorBoundary } from 'react-error-boundary'
import { Center, Container, Grid } from '@mantine/core'

import Header from './common/components/header/header.component'
import ErrorFallback from './common/components/error-boundary.component'
import AppRoutes from './app-routes'

function App() {
  const reloadPage = () => window.location.reload()

  return (
    <>
      <Header />
      <div className="app-container">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={reloadPage}
        >
          <Container mt="md">
            <Center>
              <Grid>
                <Grid.Col span="auto">
                  <AppRoutes />
                </Grid.Col>
              </Grid>
            </Center>
          </Container>
        </ErrorBoundary>
      </div>
    </>
  )
}

export default App
