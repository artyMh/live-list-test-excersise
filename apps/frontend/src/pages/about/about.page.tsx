import { Center, Container, Grid, List, ThemeIcon, Title, rem } from '@mantine/core'
import { IconCircleCheck, IconUser } from '@tabler/icons-react'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'

import ErrorFallback from '~/common/components/error-boundary.component'
import { pointsDone, additionalPointsDone } from '~/common/data/about.data.json'
import { reloadPage } from '~/helpers/common.helper'

const AboutPage = (): JSX.Element => {
  const errorFallback = (props: FallbackProps) => <ErrorFallback {...props} errorText='Something happened on about page'/>
                  
  return(
    <ErrorBoundary
      onReset={reloadPage}
      fallbackRender={errorFallback}
    >
      <Container>
        <Center>
          <Grid>
            <Grid.Col span={12}>
              <Title order={4} mb="md">Stories done:</Title>
              <List
                spacing="lg"
                size="sm"
                center
                icon={
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
                  </ThemeIcon>
                }
              >
                {pointsDone.map(({ title }, index) => <List.Item key={index}>{title}</List.Item>)}
              </List>

              <Title order={4} mt="xl" mb="md">Additional stories done:</Title>
              <List
                spacing="lg"
                size="sm"
                center
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconUser style={{ width: rem(16), height: rem(16) }} />
                  </ThemeIcon>
                }
              >
                {additionalPointsDone.map(({ title }, index) => <List.Item key={index}>{title}</List.Item>)}
              </List>
            </Grid.Col>
          </Grid>
        </Center>
      </Container>
    </ErrorBoundary>
  )
}

export default AboutPage
