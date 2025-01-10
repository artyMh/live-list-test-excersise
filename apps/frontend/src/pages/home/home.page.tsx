import { Container, rem } from '@mantine/core'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

import ErrorFallback from '@components/error-boundary.component'
import { reloadPage } from '@helpers/common.helper'
import LoginFeature from '@features/login/login.feature'

const HomePage = (): JSX.Element => {
  const errorFallback = (props: FallbackProps) => <ErrorFallback {...props} errorText='Something happened on home page'/>
  
  return(
    <ErrorBoundary
      onReset={reloadPage}
      fallbackRender={errorFallback}
    >
      <Container w={rem(500)}>
        <LoginFeature />
      </Container>
    </ErrorBoundary>
  )
}

export default HomePage
