import { Card } from '@mantine/core'

import type { ListItemModel } from 'backend-models/list.model'

import ListItem from './list-item/list-item.component'

export type ListProps = {
  listData: ListItemModel[]
}

const List = ({ listData }: ListProps): JSX.Element => {
  return (
    <Card shadow="sm" padding="lg" radius="md" mt="xs" withBorder>
      {listData.map(item =>
        <ListItem
          key={item.id}
          listItem={item}
        />
      )}
    </Card>
  )
}

export default List
