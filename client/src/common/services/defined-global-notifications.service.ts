import { notifications } from '@mantine/notifications'

import { NotificationType, successNotification } from '../../helpers/notifications.helper'

export default class DefinedGlobalNotificationsService {
  
  static connected = () => {
    notifications.show(successNotification({
      type: 'success',
      title: 'Hoorai!',
      message: 'Successfully connected',
      autoClose: 4000,
    }))
  }

  static disconnected = () => {
    notifications.show(successNotification({
      type: 'error',
      title: 'Server error',
      message: 'Disconnected',
      autoClose: 4000,
    }))
  }

  static newListReceived = () => {
    notifications.show(successNotification({
      type: 'info',
      title: 'Update',
      message: 'New list recevied',
      autoClose: 4000,
    }))
  }
  
  static applicationNotification = (type: NotificationType, title: string, message: string) => {
    notifications.show(successNotification({
      type,
      title,
      message,
      autoClose: 4000,
    }))
  }
}
