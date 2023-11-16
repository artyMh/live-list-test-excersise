import { Route, Routes } from 'react-router-dom'

import { RoutesMap } from './common/models/routes-map'
import HomePage from './pages/home/home.page'
import AboutPage from './pages/about/about.page'

const AppRoutes = (): JSX.Element => (
  <Routes>
    <Route path={RoutesMap.HOME} element={<HomePage/>} />
    <Route path={RoutesMap.ABOUT} element={<AboutPage/>} />
  </Routes>
)

export default AppRoutes
