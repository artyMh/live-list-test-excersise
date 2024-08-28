import { Badge, rem } from '@mantine/core'
import { IconAt } from '@tabler/icons-react'

import { useLiveConnectionStore } from '../../common/store/live-connection.store'

const ConnectionStatusFeature = (): JSX.Element => {
  const connectedToWs = useLiveConnectionStore(store => store.connectedToWs)
  const username = useLiveConnectionStore(store => store.username)
  const connectedUsers = useLiveConnectionStore(store => store.connectedUsers)

  return (
    <>
      <Badge 
        fullWidth
        mt="xl"
        variant="light"
        color={connectedToWs ? 'green' : 'red'}
      >
        {connectedToWs ? `Connected as "${username}"` : 'Disconnected'}
      </Badge>
      {connectedUsers.map((connectedUser) => (
        <Badge ml="xs" variant="light" key={connectedUser} leftSection={<IconAt style={{ width: rem(12), height: rem(12) }} />} tt="none">
          {connectedUser}
        </Badge>
      ))}
    </>
  )
}

export default ConnectionStatusFeature
