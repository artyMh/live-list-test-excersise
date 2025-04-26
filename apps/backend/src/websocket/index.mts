import { Server as SocketIOServer } from 'socket.io'

import type { Server } from 'node:http'
import type { NewListItemDTO, NewListItemChildrenDTO, UpdateListItemDTO } from '@app/core'

import { AppNotificationType, AppError, AppSocketEvent } from '@app/core'
import { UsersStoreService } from './users-store.service.mjs'
import { listPlaceholder } from '~/data/list-placeholder.mjs'
import { ListItemsService } from '~/services/list-items.service.mjs'
import { UserWebSocketHandlerService } from '~/services/user-websocket-handler.service.mjs'

import logger from '../logger.mjs'

const usersStoreService = new UsersStoreService()
const listItemService = new ListItemsService(listPlaceholder)

export default function createWsServer(app: Server) {
  const socketIO = new SocketIOServer(app, {
    cors: {
      origin: process.env.CLIENT_URL
    }
  })

  // SocketIO middleware
  socketIO.use((socket, next) => {
    const username = socket.handshake.auth.username

    if (!username) {
      return next(new Error(AppError.ERROR_INVALID_USERNAME))
    }

    // TODO: Add validation for username
    if (usersStoreService.isUserExist(username)) {
      logger.warn(`Username '${username}' already exists`)
      const err = new Error(AppError.ERROR_USERNAME_ALREADY_TAKEN)
      // FIXME: why this code from docs dont work
      // const errorData: ApplicationActionModel = {
      //   type: AppNotificationType.ERROR,
      //   description: 'Such username already exist'
      // }
      // err.data = errorData

      return next(err)
    }

    usersStoreService.saveUser(username)

    next()
  })

  socketIO.on('connection', (socket) => {
    const username = socket.handshake.auth.username
    logger.info(`[Socket:connection]: User '${username}' connected`)

    socket.broadcast.emit(AppSocketEvent.ApplicationNotification, {
      type: AppNotificationType.INFO,
      description: `User "${username}" joined`
    })
    socket.broadcast.emit(AppSocketEvent.CurrentUsers, usersStoreService.getUsers())

    socket.on(AppSocketEvent.GetCurrentData, () => {
      socket.emit(AppSocketEvent.NewList, listItemService.listItems)
      socket.emit(AppSocketEvent.CurrentUsers, usersStoreService.getUsers())
    })

    const userWebSocketHandlerService = new UserWebSocketHandlerService(socket, usersStoreService, listItemService)

    socket.on(AppSocketEvent.QuickAddNewItem, (newItem: NewListItemDTO) => {
      // TODO: Add data validation
      logger.info(`[Socket:quickAddNewItem]: '${username}' adding new item: '${newItem.label}'`)
      userWebSocketHandlerService.quickAddNewItem(newItem)
    })

    socket.on(AppSocketEvent.UpdateItem, (changedListItem: UpdateListItemDTO) => {
      // TODO: Add data validation
      logger.info(`[Socket:UpdateItem]: '${username}' updating item: '${changedListItem.id}:${changedListItem.label}'`)
      userWebSocketHandlerService.updateItem(changedListItem)
    })

    socket.on(AppSocketEvent.CreateItemChildren, (newItemChild: NewListItemChildrenDTO) => {
      // TODO: Add data validation
      logger.info(`[Socket:CreateItemChildren]: '${username}' creating item children in parent: '${newItemChild.parentId}:${newItemChild.label}'`)
      userWebSocketHandlerService.createItemChildren(newItemChild)
    })
  
    socket.on(AppSocketEvent.DeleteItem, (id: string) => {
      // TODO: Add id validation
      logger.info(`[Socket:deleteItem]: '${username}' deleting item: '${id}'`)
      userWebSocketHandlerService.deleteItem(id)
    })
  
    socket.on('disconnect', () => {
      const infoMessage = `User "${username}" disconnected`
      socket.disconnect()
      socket.broadcast.emit(AppSocketEvent.ApplicationNotification, {
        type: AppNotificationType.INFO,
        description: infoMessage
      })
      usersStoreService.deleteUser(username)
      socket.broadcast.emit(AppSocketEvent.CurrentUsers, usersStoreService.getUsers())
      logger.info(`[Socket:disconnect]: ${infoMessage}`)
    })
  })
}
