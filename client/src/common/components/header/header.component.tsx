import { Link,  useLocation } from 'react-router-dom'
import { Burger, Container, Group, Image, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { RoutesMap } from '../../../routing/routes-map'
import { useLiveConnectionStore } from '@store/live-connection.store'

import liveIcon from '/live-icon.svg'
import classes from './header.module.css'

const links = [
  { link: RoutesMap.HOME, label: 'Home' },
  { link: RoutesMap.LIVE, label: 'Live' },
  { link: RoutesMap.ABOUT, label: 'About' },
]

const Header = (): JSX.Element => {
  const [opened, { toggle }] = useDisclosure(false)
  const location = useLocation()
  const loggedIn = useLiveConnectionStore(store => store.loggedIn)

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={link.link ===  location.pathname || undefined}
      data-disabled={!loggedIn || undefined}
    >
      {link.label}
    </Link>
  ))

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Image
          h={40}
          radius="md"
          w="auto"
          fit="contain"
          src={liveIcon}
        />

        <Title order={5} className={classes.title}>Home assignment</Title>

        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  )
}

export default Header
