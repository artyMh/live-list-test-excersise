import { Center, Container, Grid, List, ThemeIcon, Title, rem } from '@mantine/core'
import { IconCircleCheck, IconUser } from '@tabler/icons-react'

const AboutPage = (): JSX.Element => {

  return(
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
              <List.Item
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconUser style={{ width: rem(16), height: rem(16) }} />
                  </ThemeIcon>
                }
              >
                Notifications based on socket state & actions
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon color="blue" size={24} radius="xl">
                    <IconUser style={{ width: rem(16), height: rem(16) }} />
                  </ThemeIcon>
                }
              >
                Error boundary to give user proper UX about errors
              </List.Item>
              <List.Item>I as a user can create to-do items, such as a grocery list</List.Item>
              <List.Item>I as another user can collaborate in real-time with user - so that we can (for example) edit our family shopping-list together</List.Item>
              <List.Item>I as a user can mark to-do items as “done” - so that I can avoid clutter and focus on things that are still pending</List.Item>
              <List.Item>I as a user can filter the to-do list and view items that were marked as done - so that I can retrospect on my prior progress</List.Item>
              <List.Item>I as a user can add sub-tasks to my to-do items - so that I could make logical groups of tasks and see their overall progress</List.Item>
              <List.Item>I as a user can specify cost/price for a task or a subtask - so that I can track my expenses / project cost</List.Item>
              <List.Item>I as a user can see the sum of the subtasks aggregated in the parent task - so that in my shopping list I can see what contributes to the overall sum.</List.Item>
              <List.Item>I as a user can make infinite nested levels of subtasks</List.Item>
            </List>
          </Grid.Col>
        </Grid>
      </Center>
    </Container>
  )
}

export default AboutPage
