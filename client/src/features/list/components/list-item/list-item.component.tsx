import { FormEvent } from 'react'
import { List as MantineList, Checkbox } from '@mantine/core'

import type { ListItemModel } from 'backend-models/list.model'

import { useLiveConnectionStore } from '../../../../common/store/live-connection.store'
import ListItemControls from './list-item-controls.component'
import classes from './list-item.module.css'

export type ListProps = Readonly<{
  listItem: ListItemModel
  padding?: boolean
}>

const ListItem = ({ listItem, padding = false }: ListProps): JSX.Element => {
  const updateListItem = useLiveConnectionStore(state => state.updateListItem)
  const deleteListItem = useLiveConnectionStore(state => state.deleteListItem)
  const createChildrenListItem = useLiveConnectionStore(state => state.createChildrenListItem)

  const onCompleteChange = (e: FormEvent<HTMLInputElement>) => {
    updateListItem({ ...listItem, completed: e.currentTarget.checked })
  }

  const itemControls = (
    <ListItemControls
      listItem={listItem}
      updateItem={updateListItem}
      deleteItem={deleteListItem}
      createChildrenItem={createChildrenListItem}
    />
  )

  const listStyles = {
    itemWrapper: { width: '100%' },
    itemLabel: { width: '100%' },
  }

  const checkboxLabelStyles = {
    body: { width: '100%' },
    labelWrapper: { width: '100%' },
  }

  return (  
    <MantineList
      styles={listStyles}
      className={classes.list}
      size="sm"
      center
      withPadding={padding}
      listStyleType="none"
    >
      <MantineList.Item>
        <Checkbox
          size="md"
          styles={checkboxLabelStyles}
          checked={listItem.completed}
          label={itemControls}
          onChange={onCompleteChange}
        />
      </MantineList.Item>
      {listItem.children ? 
        listItem.children.map(childrenItem =>
          <ListItem
            key={childrenItem.id}
            listItem={childrenItem}
            padding
          />) :
        null
      }
    </MantineList>
  )
}

export default ListItem
