import { Container, Grid, rem } from '@mantine/core'

import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

import ErrorFallback from 'src/common/components/error-boundary.component'
import { reloadPage } from 'src/helpers/common.helper'
import ListFeature from 'src/features/list/list.feature'

const HomePage = (): JSX.Element => {
  const errorFallback = (props: FallbackProps) => <ErrorFallback {...props} errorText='Something happened on list page'/>
  
  return(
    <ErrorBoundary
      onReset={reloadPage}
      fallbackRender={errorFallback}
    >
      <Container w={rem(500)}>
        <Grid>
          <Grid.Col span={12}>
            <ListFeature />
          </Grid.Col>
        </Grid>
      </Container>
    </ErrorBoundary>
  )
}

export default HomePage
