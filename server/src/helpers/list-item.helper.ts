import { ListItemModel } from '../models/list.model'

export function findListItem(id: string, array: ListItemModel[]): ListItemModel | null {
  for (const node of array) {
    if (node.id === id) {
      return node
    }
    
    if (node.children) {
      const child = findListItem(id, node.children)

      if (child) {
        return child
      }
    }
  }

  return null
}

export function clearListItemChildren(id: string, array: ListItemModel[]): ListItemModel[] {
  for (let i = 0; i <= array.length - 1; i++) {
    if (array[i].id === id) {
      const res = array.filter(item => item.id !== id)

      return res
    }

    if (array[i].children) {
      array[i].children = clearListItemChildren(id, array[i].children)
    }
  }

  return array
}

export function setCompleteValueForListItem(value: boolean, listItems: ListItemModel[]): void {
  for (const item of listItems) {
    item.completed = value
    
    if (item.children) {
      setCompleteValueForListItem(value, item.children)
    }
  }
}
