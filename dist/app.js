"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _path = require('path');

require('./database');

var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _expressdelay = require('express-delay'); var _expressdelay2 = _interopRequireDefault(_expressdelay);

var _homeRoutes = require('./routes/homeRoutes'); var _homeRoutes2 = _interopRequireDefault(_homeRoutes);
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _alunoRoutes = require('./routes/alunoRoutes'); var _alunoRoutes2 = _interopRequireDefault(_alunoRoutes);
var _fotoRoutes = require('./routes/fotoRoutes'); var _fotoRoutes2 = _interopRequireDefault(_fotoRoutes);

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
    this.app = _express2.default.call(void 0, )
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(_cors2.default.call(void 0, corsOptions))
    this.app.use(_helmet2.default.call(void 0, ))
    this.app.use(_expressdelay2.default.call(void 0, 200))
    this.app.use(_express2.default.urlencoded({ extended: true, limit: '10mb' }))
    this.app.use(_express2.default.json({ limit: '10mb' }))
    this.app.use('/images/', (req, res, next) => {
      res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin')
      next()
    }, _express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads', 'images')))
  }

  routes() {
    this.app.use('/', _homeRoutes2.default)
    this.app.use('/users/', _userRoutes2.default)
    this.app.use('/tokens/', _tokenRoutes2.default)
    this.app.use('/alunos/', _alunoRoutes2.default)
    this.app.use('/fotos/', _fotoRoutes2.default)
  }
}

exports. default = new App().app
