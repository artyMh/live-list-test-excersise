import { Navigate } from 'react-router-dom'

import type { ReactNode } from 'react'

import { RoutesMap } from './routes-map'
import { useLiveConnectionStore } from '../common/store/live-connection.store'
import DefinedGlobalNotificationsService from '../common/services/defined-global-notifications.service'

type ProtectedRouteProps = {
  children?: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps): ReactNode => {
  const connectedToWs = useLiveConnectionStore(store => store.connectedToWs)

  if (connectedToWs) {
    DefinedGlobalNotificationsService.applicationNotification('error', 'Error', 'You must be connected')

    return <Navigate to={RoutesMap.HOME} />
  }

  return children
}
  