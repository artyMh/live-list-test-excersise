import { useState } from 'react'
import { Center, Container, Grid, SegmentedControl, SegmentedControlItem } from '@mantine/core'

import { ListItemFilter } from 'src/core/models/list-item.model'

export type ListItemFiltersProps = Readonly<{
  onFilterChange: (filterValue: ListItemFilter) => void
}>

const ListItemFilters = ({ onFilterChange }: ListItemFiltersProps): JSX.Element => {
  const [filterFalue, setFilter] = useState('all')

  const onChange = (filterValue: string) => {
    setFilter(filterValue)
    onFilterChange(filterValue as ListItemFilter)
  }

  const filterData: SegmentedControlItem[] = [
    { label: 'All', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Not completed', value: 'notCompleted' },
  ]

  return (
    <Container mt="xs" mb="xs">
      <Center>
        <Grid>
          <Grid.Col span="auto">
            <SegmentedControl
              color="blue"
              radius="lg"
              value={filterFalue}
              onChange={onChange}
              data={filterData}
            />
          </Grid.Col>
        </Grid>
      </Center>
    </Container>
    
  )
}

export default ListItemFilters
