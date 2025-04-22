import { useNavigate } from 'react-router-dom'
import { Container, rem } from '@mantine/core'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

import { RoutesMap } from '~/routing/routes-map'
import ErrorFallback from '~/common/components/error-boundary.component'
import { reloadPage } from '~/helpers/common.helper'
import LoginFeature from '~/features/login/login.feature'
import { useLiveConnectionStore, WsConnectionState } from 'src/core/store/live-connection.store'

const errorFallback = (props: FallbackProps) => <ErrorFallback {...props} errorText='Something happened on home page'/>

const HomePage = (): JSX.Element => {
  const navigate = useNavigate()
  const connect = useLiveConnectionStore(store => store.connect)
  const wsConnectionState = useLiveConnectionStore(store => store.wsConnectionState)

  const onLoginSubmit = (username: string) => {
    connect(username)
  }

  let onLoading = false
  if (wsConnectionState === WsConnectionState.CONNECTING) {
    onLoading = true
  } else if (wsConnectionState === WsConnectionState.CONNECTED) {
    navigate(RoutesMap.LIVE)
  }

  return(
    <ErrorBoundary
      onReset={reloadPage}
      fallbackRender={errorFallback}
    >
      <Container w={rem(500)}>
        <LoginFeature onLoading={onLoading} onLoginSubmit={onLoginSubmit} />
      </Container>
    </ErrorBoundary>
  )
}

export default HomePage
