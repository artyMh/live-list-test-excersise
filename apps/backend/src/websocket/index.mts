import { Server as SocketIOServer } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'

import type { Server } from 'node:http'
import type { ApplicationNotificationModel, ListItemModel } from '@app/core'
import type { NewListItem, NewListItemChildren, UpdateListItem } from '../models/list.model.mjs'

import { ApplicationActionType, ApplicationError } from '@app/core'
import UsersService from '../services/users.service.mjs'
import logger from '../logger.mjs'
import { listPlaceholder } from '../data/list-placeholder.mjs'
import { ListItemsService } from '../services/list-items.service.mjs'

const usersService = new UsersService()
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
      return next(new Error(ApplicationError.ERROR_INVALID_USERNAME))
    }

    // TODO: Add validation for username
    if (usersService.isUserExist(username)) {
      logger.info(`Username "${username}" already exists`)
      const err = new Error(ApplicationError.ERROR_USERNAME_ALREADY_TAKEN)
      // FIXME: why this code from docs dont work
      // const errorData: ApplicationActionModel = {
      //   type: ApplicationActionType.ERROR,
      //   description: 'Such username already exist'
      // }
      // err.data = errorData

      return next(err)
    }

    usersService.saveUser(username)

    next()
  })

  socketIO.on('connection', (socket) => {
    const username = socket.handshake.auth.username
    logger.info(`[Socket:connection]: User '${username}' connected`)

    socket.broadcast.emit('applicationNotification', {
      type: ApplicationActionType.INFO,
      description: `User "${username}" joined`
    })
    socket.broadcast.emit('currentUsers', usersService.getUsers())

    socket.on('getCurrentData', () => {
      socket.emit('newList', listItemService.listItems)
      socket.emit('currentUsers', usersService.getUsers())
    })

    socket.on('quickAddNewItem', (newItem: NewListItem) => {
      // TODO: Add data validation
      const isAdded = listItemService.addItem({
        id: uuidv4(),
        completed: false,
        label: newItem.label,
        cost: 0,
      })
      if (isAdded) {
        logger.info(`[Socket:quickAddNewItem]: User '${username}' added new item: '${newItem.label}'`)
        socket.emit('newList', listItemService.listItems)
        socket.broadcast.emit('newList', listItemService.listItems)
      } else {
        logger.error(`[Socket:quickAddNewItem] User '${username}' couldn't add new item with label '${newItem.label}'"`)
        const appNotification: ApplicationNotificationModel = {
          type: ApplicationActionType.ERROR,
          description: `Error occured adding '${newItem.label}' item`
        }
        socket.emit('applicationNotification', appNotification)
      }
    })

    socket.on('updateItem', (changedListItem: UpdateListItem) => {
      // TODO: Add data validation
      const updatedItem = listItemService.updateItem(changedListItem.id, changedListItem)

      if (updatedItem !== null) {
        logger.info(`[Socket:updateItem]: User '${username}' updated item: '${updatedItem.label}'`)
        socket.emit('newList', listItemService.listItems)
        socket.broadcast.emit('newList', listItemService.listItems)
      } else {
        logger.error(`[Socket:updateItem] Couldn't find item with id '${changedListItem.id}':'${changedListItem.label}'`)
        const appNotification: ApplicationNotificationModel = {
          type: ApplicationActionType.ERROR,
          description: `Error occured updating '${changedListItem.label}' item`
        }
        socket.emit('applicationNotification', appNotification)
      }
    })

    socket.on('createItemChildren', (newItemChild: NewListItemChildren) => {
      // TODO: Add data validation
      const newChildItem = listItemService.addChildrenToItem(newItemChild)

      if (newChildItem !== null) {
        socket.emit('newList', listItemService.listItems)
        socket.broadcast.emit('newList', listItemService.listItems)
      } else {
        logger.error(`[Socket:createItemChildren] Couldn't find item with id '${newItemChild.parentId}':'${newItemChild.label}'`)
        const appNotification: ApplicationNotificationModel = {
          type: ApplicationActionType.ERROR,
          description: `Error occured adding ${newItemChild.label} item in '${newItemChild.parentId}'`
        }
        socket.emit('applicationNotification', appNotification)
      }
    })
  
    socket.on('deleteItem', (id: string) => {
      // TODO: Add id validation
      const itemForDelete = listItemService.findItemById(id)

      if (itemForDelete === null) {
        logger.error(`[Socket:deleteItem]: User '${username}' can't find item for delete: '${id}'`)
        const appNotification: ApplicationNotificationModel = {
          type: ApplicationActionType.ERROR,
          description: `Error occured deleting item with id '${id}' item`
        }
        socket.emit('applicationNotification', appNotification)
        
        return
      }

      const isDeleted = listItemService.deleteItem(id)

      if (isDeleted) {
        logger.info(`[Socket:deleteItem]: User '${username}' deleted item: '${id}':'${itemForDelete.label}'`)
        socket.emit('newList', listItemService.listItems)
        socket.broadcast.emit('newList', listItemService.listItems)
      } else {
        logger.error(`[Socket:deleteItem] Couldn't delete item with id: '${id}':"${itemForDelete.label}"`)
        const appNotification: ApplicationNotificationModel = {
          type: ApplicationActionType.ERROR,
          description: `Error occured deleting '${itemForDelete.label}' item`
        }
        socket.emit('applicationNotification', appNotification)
      }
    })
  
    socket.on('disconnect', () => {
      const infoMessage = `User '${username}' disconnected`
      socket.disconnect()
      socket.broadcast.emit('applicationNotification', {
        type: ApplicationActionType.INFO,
        description: infoMessage
      })
      usersService.deleteUser(socket.handshake.auth.username)
      socket.broadcast.emit('currentUsers', usersService.getUsers())
      logger.info(`[Socket:disconnect]: ${infoMessage}`)
    })
  })
}
