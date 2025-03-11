import { ListItemModel } from '@app/core'

export class ListItemsService {
  private listItems: ListItemModel[]

  constructor(listItems: ListItemModel[]) {
    this.listItems = listItems
  }

  findListItem(id: string, arrayNeedle: ListItemModel[] = []): ListItemModel | null {
    const listItems = this.prepareArray(arrayNeedle)

    for (const node of listItems) {
      if (node.id === id) {
        return node
      }
  
      if (node.children) {
        const child = this.findListItem(id, node.children)
  
        if (child) {
          return child
        }
      }
    }
  
    return null
  }

  clearListItemChildren(id: string, arrayNeedle: ListItemModel[] = []): ListItemModel[] {
    const array = this.prepareArray(arrayNeedle)

    for (let i = 0; i <= array.length - 1; i++) {
      if (array[i].id === id) {
        const res = array.filter(item => item.id !== id)
  
        return res
      }
  
      if (array[i].children) {
        array[i].children = this.clearListItemChildren(id, array[i].children)
      }
    }
  
    return array
  }

  setCompleteValueForListItem(value: boolean, arrayNeedle: ListItemModel[] = []): void {
    const listItems = this.prepareArray(arrayNeedle)

    for (const item of listItems) {
      item.completed = value
  
      if (item.children) {
        this.setCompleteValueForListItem(value, item.children)
      }
    }
  }

  calculateCost(): void {
    for (const item of this.listItems) {
      if (item.children) {
        item.cost = this.calculateListItemCost(item.children, 0)
      }
    }
  }

  private calculateListItemCost(listItems: ListItemModel[], sum: number): number {
  
    for (const item of listItems) {
      if (item.children) {
        item.cost = this.calculateListItemCost(item.children, sum)
      }
  
      sum += item.cost
    }
  
    return sum
  }

  private prepareArray(arrayNeedle: ListItemModel[]): ListItemModel[] {  
    if (arrayNeedle.length > 0) {
      return  arrayNeedle
    } else {
      return this.listItems
    }
  }
}
