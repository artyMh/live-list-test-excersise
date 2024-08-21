import { Badge } from '@mantine/core'

import { useLiveConnectionStore } from '../../common/store/live-connection.store'

const ConnectionStatusFeature = (): JSX.Element => {
  const connectedToWs = useLiveConnectionStore(store => store.connectedToWs)

  return (
    <Badge 
      fullWidth
      mt="xl"
      variant="light"
      color={connectedToWs ? 'green' : 'red'}
    >
      {connectedToWs ? 'Connected' : 'Disconnected'}
    </Badge>
  )
}

export default ConnectionStatusFeature
