import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import { RoutesMap } from './routes-map'
import { Loader } from '@mantine/core'

const HomePage = lazy(() => import('../pages/home/home.page'))
const AboutPage = lazy(() => import('../pages/about/about.page'))

const AppRoutes = (): JSX.Element => (
  <Routes>
    <Route path={RoutesMap.HOME} element={<Suspense fallback={<Loader color="gray" />}><HomePage /></Suspense>} />
    <Route path={RoutesMap.ABOUT} element={<Suspense fallback={<Loader color="gray" />}><AboutPage /></Suspense>} />
  </Routes>
)

export default AppRoutes
