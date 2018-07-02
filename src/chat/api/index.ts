import MessageService from '../messages/MessageService'
import SecuredEndpoints from '../../server/SecuredEndpoints'
import Database from '../../database'
import { InitializeEvent } from '../events'
import Endpoints from '../../server/Endpoints';

const event = new InitializeEvent(new Database())
const service = new MessageService(new Database())

const secured: SecuredEndpoints = new SecuredEndpoints()
const unsecured: Endpoints = new Endpoints()

unsecured.router.get('/chat', (req, res) => {
  res.sendFile('index.html', { root: './view/chat' })
})

unsecured.router.get('/login', (req, res) => {
  res.sendFile('index.html', { root: './view/login' })
})

secured.router.get('/chat/init', async (req, res, next) => {
  try {
    if (req.user) {
      const response = await event.handle({ userId: req.user.userId })
      res.json(response)
    } else {
      res.send(new Error('no user'))
    }

  } catch (err) {
    next(err)
  }
})

secured.router.get('/chat/:chatId/messages', async (req, res, next) => {
  const chatId = req.params.chatId

  try {
    const result = await service.getMessagesFromChat(chatId)
    res.json(result)

  } catch (err) {
    next(err)
  }
})

export {
  secured,
  unsecured
}
