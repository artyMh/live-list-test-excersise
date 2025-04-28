import { notifications } from '@mantine/notifications'

import { NotificationType, buildNotification } from '~/helpers/notifications.helper'

export default class NotificationsService {

  static applicationNotification = (type: NotificationType, title: string, message: string) => {
    notifications.show(buildNotification({
      type,
      title,
      message,
      autoClose: 4000,
    }))
  }
}
