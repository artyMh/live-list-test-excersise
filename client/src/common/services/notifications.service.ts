import { notifications } from '@mantine/notifications'

import { NotificationType, successNotification } from '../../helpers/notifications.helper'

export default class NotificationsService {

  static applicationNotification = (type: NotificationType, title: string, message: string) => {
    notifications.show(successNotification({
      type,
      title,
      message,
      autoClose: 4000,
    }))
  }
}
