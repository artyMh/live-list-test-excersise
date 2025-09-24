import { Socket } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'

import type { AppNotification, NewListItemDTO, NewListItemChildrenDTO, UpdateListItemDTO, UpdatedListDTO, ListItemDTO } from '@app/core'
import type { IUsersStoreService } from '~/services/users-store.service.js'
import type { IListItemsService } from './list-items.service.js'

import { AppNotificationType, AppSocketEvent, ListUpdateType } from '@app/core'
import logger from '~/logger.js'

export interface IUserWebSocketHandlerService {
  quickAddNewItem(newItem: NewListItemDTO): void
  updateItem(changedListItem: UpdateListItemDTO): void
  createItemChildren(newItemChild: NewListItemChildrenDTO): void
  deleteItem(id: string): void
}

export class UserWebSocketHandlerService implements IUserWebSocketHandlerService {
  #socket: Socket
  #username: string
  #usersStoreService: IUsersStoreService
  #listItemService: IListItemsService

  constructor(socket: Socket, usersStoreService: IUsersStoreService, listItemService: IListItemsService) {
    this.#socket = socket
    this.#username = socket.handshake.auth.username
    this.#usersStoreService = usersStoreService
    this.#listItemService = listItemService
  }

  quickAddNewItem(newItem: NewListItemDTO): void {
    const isAdded = this.#listItemService.addItem({
      id: uuidv4(),
      completed: false,
      label: newItem.label,
      cost: 0,
    })

    if (isAdded) {
      logger.info(`[UserWebSocketHandler:quickAddNewItem]: User '${this.#username}' added new item: '${newItem.label}'`)
      const updatedList: UpdatedListDTO =  this.#createUpdatedList(ListUpdateType.ADDED_ITEM)
      this.#socket.emit(AppSocketEvent.NewList, updatedList)
      this.#socket.broadcast.emit(AppSocketEvent.NewList, updatedList)
    } else {
      logger.error(`[UserWebSocketHandler:quickAddNewItem] User '${this.#username}' couldn't add new item with label '${newItem.label}'"`)
      const appNotification: AppNotification = {
        type: AppNotificationType.ERROR,
        description: `Error occured adding '${newItem.label}' item`,
      }
      this.#socket.emit(AppSocketEvent.ApplicationNotification, appNotification)
    }
  }

  updateItem(changedListItem: UpdateListItemDTO): void {
    const updatedItem = this.#listItemService.updateItem(changedListItem.id, changedListItem)

    if (updatedItem !== null) {
      logger.info(`[UserWebSocketHandler:updateItem]: User '${this.#username}' updated item: '${updatedItem.label}'`)
      const updatedList: UpdatedListDTO =  this.#createUpdatedList(ListUpdateType.UPDATED_ITEM)
      this.#socket.emit(AppSocketEvent.NewList, updatedList)
      this.#socket.broadcast.emit(AppSocketEvent.NewList, updatedList)
    } else {
      logger.error(`[UserWebSocketHandler:updateItem] Couldn't find item with id '${changedListItem.id}':'${changedListItem.label}'`)
      const appNotification: AppNotification = {
        type: AppNotificationType.ERROR,
        description: `Error occured updating '${changedListItem.label}' item`,
      }
      this.#socket.emit(AppSocketEvent.ApplicationNotification, appNotification)
    }
  }

  createItemChildren(newItemChild: NewListItemChildrenDTO): void {
    const newChildItem = this.#listItemService.addChildrenToItem(newItemChild)

    if (newChildItem !== null) {
      logger.info(`[UserWebSocketHandler:createItemChildren]: User '${this.#username}' added child '${newItemChild.label}' to '${newItemChild.parentId}'`)
      const updatedList: UpdatedListDTO =  this.#createUpdatedList(ListUpdateType.ADDED_CHILD_ITEM)
      this.#socket.emit(AppSocketEvent.NewList, updatedList)
      this.#socket.broadcast.emit(AppSocketEvent.NewList, updatedList)
    } else {
      logger.error(`[UserWebSocketHandler:createItemChildren] Couldn't find item with id '${newItemChild.parentId}':'${newItemChild.label}'`)
      const appNotification: AppNotification = {
        type: AppNotificationType.ERROR,
        description: `Error occured adding ${newItemChild.label} item in '${newItemChild.parentId}'`,
      }
      this.#socket.emit(AppSocketEvent.ApplicationNotification, appNotification)
    }
  }

  deleteItem(id: string): void {
    const itemForDelete = this.#listItemService.findItemById(id)

    if (itemForDelete === null) {
      logger.error(`[UserWebSocketHandler:deleteItem]: User '${this.#username}' can't find item for delete: '${id}'`)
      const appNotification: AppNotification = {
        type: AppNotificationType.ERROR,
        description: `Error occured deleting item with id '${id}' item`,
      }
      this.#socket.emit(AppSocketEvent.ApplicationNotification, appNotification)
      
      return
    }

    const isDeleted = this.#listItemService.deleteItem(id)

    if (isDeleted) {
      logger.info(`[UserWebSocketHandler:deleteItem]: User '${this.#username}' deleted item: '${id}':'${itemForDelete.label}'`)
      const updatedList: UpdatedListDTO = this.#createUpdatedList(ListUpdateType.DELETED_ITEM)
      this.#socket.emit(AppSocketEvent.NewList, updatedList)
      this.#socket.broadcast.emit(AppSocketEvent.NewList, updatedList)
    } else {
      logger.error(`[UserWebSocketHandler:deleteItem] Couldn't delete item with id: '${id}':"${itemForDelete.label}"`)
      const appNotification: AppNotification = {
        type: AppNotificationType.ERROR,
        description: `Error occured deleting '${itemForDelete.label}' item`,
      }
      this.#socket.emit(AppSocketEvent.ApplicationNotification, appNotification)
    }
  }

  #createUpdatedList(updateType: ListUpdateType): UpdatedListDTO {
    return {
      list: this.#listItemService.listItems as unknown as ListItemDTO[],
      updateSource: this.#username,
      updateType,
    }
  }
}
