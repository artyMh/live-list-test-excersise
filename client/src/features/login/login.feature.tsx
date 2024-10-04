import { useNavigate } from 'react-router-dom'

import { useLiveConnectionStore } from '@store/live-connection.store'
import { RoutesMap } from '@routing/routes-map'
import Login from './components/login.component'

const LoginFeature = (): JSX.Element => {
  const connect = useLiveConnectionStore(store => store.connect)
  const navigate = useNavigate()
  const onSubmit = (formData: { username: string}) => {
    connect(formData.username)
    navigate(RoutesMap.LIVE)
  }
  
  return(
    <>
      <Login onSubmit={onSubmit} />
    </>
  )
}

export default LoginFeature