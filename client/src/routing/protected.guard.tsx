import { Navigate } from 'react-router-dom'

import type { ReactNode } from 'react'

import { RoutesMap } from './routes-map'
import { useLiveConnectionStore } from '@store/live-connection.store'
import NotificationsService from '@services/notifications.service'

type ProtectedRouteProps = {
  children?: ReactNode
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps): ReactNode => {
  const loggedIn = useLiveConnectionStore(store => store.loggedIn)

  if (!loggedIn) {
    NotificationsService.applicationNotification('error', 'Error', 'You must be logged in')

    return <Navigate to={RoutesMap.HOME} />
  }

  return children
}
  