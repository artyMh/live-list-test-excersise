import { Server as SocketIOServer } from 'socket.io'
import { v4 as uuidv4 } from 'uuid'

import type { Server } from 'node:http'
import type { ListItemModel, NewListItem, NewListItemChildren, UpdateListItem } from '../models/list.model'

import logger from '../logger'
import { calculateCost, clearListItemChildren, findListItem, setCompleteValueForListItem } from '../helpers/list-item.helper'
import { ApplicationActionModel, ApplicationActionType } from '../models/application-action.model'
import UsersService from '../services/users.service'

let todoList: ListItemModel[] = [
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

const usersService = new UsersService()

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
      return next(new Error('Invalid username'))
    }

    // TODO: Add validation for username
    if (usersService.isUserExist(username)) {
      logger.info('Username already exists !!!!!!!')
      
      return next(new Error('Such username already exist'))
    }

    usersService.saveUser(username)

    next()
  })

  socketIO.on('connection', (socket) => {
    logger.info(`[Socket:connection]: User "${socket.handshake.auth.username}" connected`)

    socket.broadcast.emit('applicationNotification', { type: ApplicationActionType.INFO, description: `User "${socket.handshake.auth.username}" joined`})
    socket.broadcast.emit('currentUsers', usersService.getUsers())

    socket.on('getCurrentData', () => {
      socket.emit('newList', todoList)
      socket.emit('currentUsers', usersService.getUsers())
    })

    socket.on('quickAddNewItem', (newItem: NewListItem) => {
      const newListItem: ListItemModel = {
        id: uuidv4(),
        completed: false,
        label: newItem.label,
        cost: 0,
      }
      todoList.unshift(newListItem)
      calculateCost(todoList)
      
      socket.emit('newList', todoList)
      socket.broadcast.emit('newList', todoList)
    })

    socket.on('updateItem', (updatedListItem: UpdateListItem) => {
      const item = findListItem(updatedListItem.id, todoList)

      if (item) {
        item.label = updatedListItem.label
        item.completed = updatedListItem.completed
        item.cost = updatedListItem.cost

        
        if (item.children) {
          setCompleteValueForListItem(updatedListItem.completed, item.children)
        }
        
        calculateCost(todoList)

        socket.emit('newList', todoList)
        socket.broadcast.emit('newList', todoList)
      } else {
        logger.error(`[Socket:updateItem] Couldn't find item with id "${updatedListItem.id}"`)
        const appNotification: ApplicationActionModel = {
          type: ApplicationActionType.ERROR,
          description: 'Error occured performing update'
        }
        socket.emit('applicationNotification', appNotification)
      }
    })

    socket.on('createItemChildren', (newItemChild: NewListItemChildren) => {
      const item = findListItem(newItemChild.parentId, todoList)

      if (item) {
        const newChildListItem: ListItemModel = {
          id: uuidv4(),
          completed: newItemChild.completed,
          label: newItemChild.label,
          cost: newItemChild.cost ?? 0
        }
        if (item.children) {
          item.children.push(newChildListItem)
        } else {
          item.children = [ newChildListItem ]
        }

        calculateCost(todoList)
        socket.emit('newList', todoList)
        socket.broadcast.emit('newList', todoList)
      } else {
        logger.error(`[Socket:createItemChildren] Couldn't find item with id "${newItemChild.parentId}"`)
        const appNotification: ApplicationActionModel = {
          type: ApplicationActionType.ERROR,
          description: 'Error occured performing create'
        }
        socket.emit('applicationNotification', appNotification)
      }
    })
  
    socket.on('deleteItem', (id: string) => {
      todoList = clearListItemChildren(id, todoList)
      calculateCost(todoList)
      socket.emit('newList', todoList)
      socket.broadcast.emit('newList', todoList)
    })
  
    socket.on('disconnect', () => {
      const infoMessage = `User "${socket.handshake.auth.username}" disconnected`
      socket.disconnect()
      socket.broadcast.emit('applicationNotification', { type: ApplicationActionType.INFO, description: infoMessage })
      usersService.deleteUser(socket.handshake.auth.username)
      socket.broadcast.emit('currentUsers', usersService.getUsers())
      logger.info(`[Socket:disconnect]: ${infoMessage}`)
    })
  })
}
