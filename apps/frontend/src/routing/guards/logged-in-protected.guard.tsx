import { Navigate } from 'react-router-dom'

import type { ReactNode } from 'react'

import { RoutesMap } from '../routes-map'
import { useLiveConnectionStore } from 'src/core/store/live-connection.store'
import NotificationsService from '~/common/services/notifications.service'

type LoggedInProtectedRouteProps = {
  children?: ReactNode
}

export const LoggedInProtectedRoute = ({ children }: LoggedInProtectedRouteProps): ReactNode => {
  const loggedIn = useLiveConnectionStore(store => store.loggedIn)

  if (!loggedIn) {
    NotificationsService.applicationNotification('error', 'Error', 'You must be logged in')

    return <Navigate to={RoutesMap.HOME} />
  }

  return children
}
  