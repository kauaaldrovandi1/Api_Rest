import { resolve } from 'path'

import './database'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import delay from 'express-delay'

import homeRoutes from './routes/homeRoutes'
import userRoutes from './routes/userRoutes'
import tokenRoutes from './routes/tokenRoutes'
import alunoRoutes from './routes/alunoRoutes'
import fotoRoutes from './routes/fotoRoutes'

const whiteList = [
  'http://localhost:3000',
  'http://35.247.217.33',
  'https://kauaaldrovandi.com.br',
  'https://react.kauaaldrovandi.com.br',
  'https://apirest.kauaaldrovandi.com.br',
]

const corsOptions = {
  origin(origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

class App {
  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(cors(corsOptions))
    this.app.use(helmet())
    this.app.use(delay(200))
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }))
    this.app.use(express.json({ limit: '10mb' }))
    this.app.use('/images/', (req, res, next) => {
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
      next()
    }, express.static(resolve(__dirname, '..', 'uploads', 'images')))
  }

  routes() {
    this.app.use('/', homeRoutes)
    this.app.use('/users/', userRoutes)
    this.app.use('/tokens/', tokenRoutes)
    this.app.use('/alunos/', alunoRoutes)
    this.app.use('/fotos/', fotoRoutes)
  }
}

export default new App().app
