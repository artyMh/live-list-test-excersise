import { Center, Container, Grid, rem } from '@mantine/core'

import ListFeature from '../../features/list/list.feature'

const HomePage = (): JSX.Element => {
  return(
    <Container w={rem(500)}>
      <Center>
        <Grid>
          <Grid.Col span={12}>
            <ListFeature />
          </Grid.Col>
        </Grid>
      </Center>
    </Container>
  )
}

export default HomePage
