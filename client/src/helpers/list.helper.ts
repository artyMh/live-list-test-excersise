import { ListItemModel } from 'backend-models/list.model'
import { ListItemFilter } from 'src/common/models/list-item.model'

export function labelValidator(labelValue: string): string | null {
  if (!/^[A-Za-z0-9\s]+$/.test(labelValue)) {
    return 'Label name should contain only letters and numbers'
  }

  if (labelValue.length > 26) {
    return 'Label name should not be longer than 26 symbols'
  }

  return null
}

export function filterList(data: ListItemModel[], filterType: ListItemFilter): ListItemModel[] {
  if (filterType === 'all') {
    return data
  }
  const completeValue = filterType === 'completed' ? true : false

  return filterListByComplete(completeValue, data)
}

function filterListByComplete(completeValue: boolean, array: ListItemModel[]): ListItemModel[] {
  const res = []
  for (let i = 0; i <= array.length - 1; i++) {
    let isThere = false

    if (array[i].children) {
      array[i].children = filterListByComplete(completeValue, array[i].children)
      isThere = isThereAnyCompleteValue(completeValue, array[i].children)
    }
    if (array[i].completed === completeValue || isThere) {
      res.push(array[i])
    }
  }
  
  return res
}

function isThereAnyCompleteValue(completeValue: boolean, array: ListItemModel[]): boolean {
  for (const node of array) {
    if (node.completed === completeValue) {
      return true
    }
    
    if (node.children) {
      return isThereAnyCompleteValue(completeValue, node.children)
    }
  }

  return false
}
