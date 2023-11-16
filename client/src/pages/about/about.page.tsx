import { Center, Container, Grid, rem } from '@mantine/core'


const AboutPage = (): JSX.Element => {

  return(
    <Container w={rem(500)}>
      <Center>
        <Grid>
          <Grid.Col span={12}>
            IM about page
          </Grid.Col>
        </Grid>
      </Center>
    </Container>
  )
}

export default AboutPage
