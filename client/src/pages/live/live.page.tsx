import { Container, Grid, rem } from '@mantine/core'

import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

import ErrorFallback from '@components/error-boundary.component'
import { reloadPage } from '../../helpers/common.helper'
import ListFeature from '../../features/list/list.feature'
import ConnectionStatusFeature from '../../features/connection-status/connection-status.feature'

const LivePage = (): JSX.Element => {
  const errorFallback = (props: FallbackProps) => <ErrorFallback {...props} errorText='Something happened on live page'/>
  
  return(
    <ErrorBoundary
      onReset={reloadPage}
      fallbackRender={errorFallback}
    >
      <Container w={rem(500)}>
        <Grid>
          <Grid.Col span={12}>
            <ConnectionStatusFeature />
            <ListFeature />
          </Grid.Col>
        </Grid>
      </Container>
    </ErrorBoundary>
  )
}

export default LivePage
