import { v4 as uuidv4 } from 'uuid'

import type { ListItemModel, NewListItemChildren } from '@app/core'

export class ListItemsService {
  #listItems: ListItemModel[]

  get listItems(): ListItemModel[] {
    return this.#listItems
  }

  constructor(listItems: ListItemModel[]) {
    this.#listItems = listItems
  }

  addItem(newItem: ListItemModel): boolean {
    const currentItemCount = this.#listItems.length
    const updatedItemCount = this.#listItems.unshift(newItem)

    if (updatedItemCount > currentItemCount) {
      // this.#recalculateAllCosts()

      return true
    }

    return false
  }

  updateItem(itemId: string, updatedItem: ListItemModel): ListItemModel | null {
    const item = this.#findItem(itemId)
    
    if (item !== null) {
      item.label = updatedItem.label
      item.completed = updatedItem.completed
      item.cost = updatedItem.cost
      
      if (item.children) {
        this.#setCompletedForItem(updatedItem.completed, item.children)
      }
      this.#recalculateAllCosts()

      return updatedItem
    }

    return null
  }

  addChildrenToItem(newItemChild: NewListItemChildren): ListItemModel | null {
    const item = this.#findItem(newItemChild.parentId)

    if (item !== null) {
      const newChildItem: ListItemModel = {
        id: uuidv4(),
        completed: newItemChild.completed,
        label: newItemChild.label,
        cost: newItemChild.cost ?? 0
      }
      if (item.children) {
        item.children.push(newChildItem)
      } else {
        item.children = [ newChildItem ]
      }

      this.#recalculateAllCosts()

      return newChildItem
    }

    return null
  }

  deleteItem(id: string): boolean {
    this.#listItems = this.#clearListItemChildren(id)
    this.#recalculateAllCosts()

    return true
  }

  findItemById(id: string): ListItemModel | null {
    return this.#findItem(id)
  }

  #findItem(id: string, arrayNeedle: ListItemModel[] = this.#listItems): ListItemModel | null {
    for (const node of arrayNeedle) {
      if (node.id === id) {
        return node
      }
  
      if (node.children) {
        const child = this.#findItem(id, node.children)
  
        if (child) {
          return child
        }
      }
    }
  
    return null
  }

  #clearListItemChildren(id: string, arrayNeedle: ListItemModel[] = this.#listItems): ListItemModel[] {
    for (let i = 0; i <= arrayNeedle.length - 1; i++) {
      if (arrayNeedle[i].id === id) {
        const res = arrayNeedle.filter(item => item.id !== id)
  
        return res
      }
  
      if (arrayNeedle[i].children) {
        arrayNeedle[i].children = this.#clearListItemChildren(id, arrayNeedle[i].children)
      }
    }
  
    return arrayNeedle
  }

  #setCompletedForItem(value: boolean, arrayNeedle: ListItemModel[] = this.#listItems): void {
    for (const item of arrayNeedle) {
      item.completed = value
  
      if (item.children) {
        this.#setCompletedForItem(value, item.children)
      }
    }
  }

  #recalculateAllCosts(): void {
    for (const item of this.#listItems) {
      if (item.children) {
        item.cost = this.#calculateItemCost(item.children, 0)
      }
    }
  }

  #calculateItemCost(listItems: ListItemModel[], sum: number): number {
    for (const item of listItems) {
      if (item.children) {
        item.cost = this.#calculateItemCost(item.children, sum)
      }
  
      sum += item.cost
    }
  
    return sum
  }
}
