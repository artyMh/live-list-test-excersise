import { Card } from '@mantine/core'
import { Alert } from '@mantine/core'
import { IconInfoCircle } from '@tabler/icons-react'

import type { ListItemDTO } from '@app/core'

import ListItem from './list-item/list-item.component'

export type ListProps = Readonly<{
  listData: ListItemDTO[]
}>

const List = ({ listData }: ListProps): JSX.Element => {
  return (
    <Card shadow="sm" padding="lg" radius="md" mt="xs" withBorder>
      {listData.length > 0 ? 
        listData.map(item =>
          <ListItem
            key={item.id}
            listItem={item}
          />
        ) :
        <Alert variant="light" color="yellow" icon={<IconInfoCircle/>}>
          No items
        </Alert>
      }
      
    </Card>
  )
}

export default List
