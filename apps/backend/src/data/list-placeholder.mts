import { v4 as uuidv4 } from 'uuid'

import type { ListItemModel } from '@app/core/models/list.model'

export const listPlaceholder: ListItemModel[] = [
  {
    id: uuidv4(),
    completed: false,
    label: 'Vegetables',
    cost: 3.20,
    children: [
      {
        id: uuidv4(),
        completed: false,
        label: 'Cucumber',
        cost: 1.80
      },
      {
        id: uuidv4(),
        completed: false,
        label: 'Potato',
        cost: 1.40
      },
    ]
  },
  {
    id: uuidv4(),
    completed: false,
    label: 'Fruits',
    cost: 2.80,
    children: [
      {
        id: uuidv4(),
        completed: false,
        label: 'Banana',
        cost: 1.00,
      },
      {
        id: uuidv4(),
        completed: false,
        label: 'Orange',
        cost: 0.50,
      },
      {
        id: uuidv4(),
        completed: false,
        label: 'Melone',
        cost: 1.30,
      },
    ]
  }
]
