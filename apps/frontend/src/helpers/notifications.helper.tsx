import { MantineColor, rem } from '@mantine/core'
import { NotificationData } from '@mantine/notifications'
import { IconCheck, IconInfoSmall, IconQuestionMark, IconX, IconServer } from '@tabler/icons-react'

const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />
const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />
const infoIcon = <IconInfoSmall style={{ width: rem(40), height: rem(40) }} />
const questionIcon = <IconQuestionMark style={{ width: rem(20), height: rem(20) }}/>
const serverIcon = <IconServer style={{ width: rem(20), height: rem(20) }} />

export type NotificationType = 'success' | 'error' | 'info' | 'server'

export type NotificationExpandedData = NotificationData & Readonly<{
  type: NotificationType
}>

export function buildNotification(notificationData: NotificationExpandedData): NotificationData {
  let icon: JSX.Element
  let color: MantineColor

  switch (notificationData.type) {
    case 'success': {
      icon = checkIcon
      color = 'green'
      break
    }

    case 'error': {
      icon = xIcon
      color = 'red'
      break
    }

    case 'info': {
      icon = infoIcon
      color = 'blue'
      break
    }

    case 'server': {
      icon = serverIcon
      color = 'dark'
      break
    }

    default: {
      icon = questionIcon
      color = 'gray'
    }
  }

  return {
    ...notificationData,
    icon,
    color,
    withCloseButton: true,
  }
}
