import { Socket } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'

import type { ApplicationNotificationModel, NewListItem, NewListItemChildren, UpdateListItem } from '@app/core'
import type { IUsersStoreService } from '~/websocket/users-store.service.mjs'
import type { IListItemsService } from './list-items.service.mjs'


import { ApplicationActionType, AppSocketEvent } from '@app/core'
import logger from '~/logger.mjs'

export interface IUserWebSocketHandlerService {
  quickAddNewItem(newItem: NewListItem): void
  updateItem(changedListItem: UpdateListItem): void
  createItemChildren(newItemChild: NewListItemChildren): void
  deleteItem(id: string): void
}

export class UserWebSocketHandlerService implements IUserWebSocketHandlerService {
  #socket: Socket
  #username: string
  #usersStoreService: IUsersStoreService
  #listItemService: IListItemsService

  constructor(socket: Socket, UsersStoreService: IUsersStoreService, listItemService: IListItemsService) {
    this.#socket = socket
    this.#username = socket.handshake.auth.username
    this.#usersStoreService = UsersStoreService
    this.#listItemService = listItemService
  }

  quickAddNewItem(newItem: NewListItem): void {
    const isAdded = this.#listItemService.addItem({
      id: uuidv4(),
      completed: false,
      label: newItem.label,
      cost: 0,
    })

    if (isAdded) {
      logger.info(`[UserWebSocketHandler:quickAddNewItem]: User '${this.#username}' added new item: '${newItem.label}'`)
      this.#socket.emit(AppSocketEvent.NewList, this.#listItemService.listItems)
      this.#socket.broadcast.emit(AppSocketEvent.NewList, this.#listItemService.listItems)
    } else {
      logger.error(`[UserWebSocketHandler:quickAddNewItem] User '${this.#username}' couldn't add new item with label '${newItem.label}'"`)
      const appNotification: ApplicationNotificationModel = {
        type: ApplicationActionType.ERROR,
        description: `Error occured adding '${newItem.label}' item`
      }
      this.#socket.emit(AppSocketEvent.ApplicationNotification, appNotification)
    }
  }

  updateItem(changedListItem: UpdateListItem): void {
    const updatedItem = this.#listItemService.updateItem(changedListItem.id, changedListItem)

    if (updatedItem !== null) {
      logger.info(`[UserWebSocketHandler:updateItem]: User '${this.#username}' updated item: '${updatedItem.label}'`)
      this.#socket.emit(AppSocketEvent.NewList, this.#listItemService.listItems)
      this.#socket.broadcast.emit(AppSocketEvent.NewList, this.#listItemService.listItems)
    } else {
      logger.error(`[UserWebSocketHandler:updateItem] Couldn't find item with id '${changedListItem.id}':'${changedListItem.label}'`)
      const appNotification: ApplicationNotificationModel = {
        type: ApplicationActionType.ERROR,
        description: `Error occured updating '${changedListItem.label}' item`
      }
      this.#socket.emit(AppSocketEvent.ApplicationNotification, appNotification)
    }
  }

  createItemChildren(newItemChild: NewListItemChildren): void {
    const newChildItem = this.#listItemService.addChildrenToItem(newItemChild)

    if (newChildItem !== null) {
      logger.info(`[UserWebSocketHandler:createItemChildren]: User '${this.#username}' added child '${newItemChild.label}' to '${newItemChild.parentId}'`)
      this.#socket.emit(AppSocketEvent.NewList, this.#listItemService.listItems)
      this.#socket.broadcast.emit(AppSocketEvent.NewList, this.#listItemService.listItems)
    } else {
      logger.error(`[UserWebSocketHandler:createItemChildren] Couldn't find item with id '${newItemChild.parentId}':'${newItemChild.label}'`)
      const appNotification: ApplicationNotificationModel = {
        type: ApplicationActionType.ERROR,
        description: `Error occured adding ${newItemChild.label} item in '${newItemChild.parentId}'`
      }
      this.#socket.emit(AppSocketEvent.ApplicationNotification, appNotification)
    }
  }

  deleteItem(id: string): void {
    const itemForDelete = this.#listItemService.findItemById(id)

    if (itemForDelete === null) {
      logger.error(`[UserWebSocketHandler:deleteItem]: User '${this.#username}' can't find item for delete: '${id}'`)
      const appNotification: ApplicationNotificationModel = {
        type: ApplicationActionType.ERROR,
        description: `Error occured deleting item with id '${id}' item`
      }
      this.#socket.emit(AppSocketEvent.ApplicationNotification, appNotification)
      
      return
    }

    const isDeleted = this.#listItemService.deleteItem(id)

    if (isDeleted) {
      logger.info(`[UserWebSocketHandler:deleteItem]: User '${this.#username}' deleted item: '${id}':'${itemForDelete.label}'`)
      this.#socket.emit(AppSocketEvent.NewList, this.#listItemService.listItems)
      this.#socket.broadcast.emit(AppSocketEvent.NewList, this.#listItemService.listItems)
    } else {
      logger.error(`[UserWebSocketHandler:deleteItem] Couldn't delete item with id: '${id}':"${itemForDelete.label}"`)
      const appNotification: ApplicationNotificationModel = {
        type: ApplicationActionType.ERROR,
        description: `Error occured deleting '${itemForDelete.label}' item`
      }
      this.#socket.emit(AppSocketEvent.ApplicationNotification, appNotification)
    }
  }
}
