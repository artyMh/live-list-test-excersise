
import { ErrorBoundary } from 'react-error-boundary'
import { Center, Container, Grid } from '@mantine/core'

import Header from './common/components/header/header.component'
import ErrorFallback from './common/components/error-boundary.component'
import AppRoutes from './routing/app-routes'
import { reloadPage } from './helpers/common.helper'

export default function App() {

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

