"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);

class AlunoController {
  async index(req, res) {
    const alunos = await _Aluno2.default.findAll({
      attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
      order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
      include: {
        model: _Foto2.default,
        attributes: ['url', 'filename'],
      },
    })
    res.json(alunos)
  }

  async show(req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        })
      }

      const aluno = await _Aluno2.default.findByPk(id, {
        attributes: ['id', 'nome', 'sobrenome', 'email', 'idade', 'peso', 'altura'],
        order: [['id', 'DESC'], [_Foto2.default, 'id', 'DESC']],
        include: {
          model: _Foto2.default,
          attributes: ['url', 'filename'],
        },
      })

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno does not exist'],
        })
      }

      return res.json(aluno)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }

  async store(req, res) {
    try {
      const novoAluno = await _Aluno2.default.create(req.body)

      const {
        id, nome, sobrenome, email, idade, peso, altura,
      } = novoAluno
      return res.json({
        id, nome, sobrenome, email, idade, peso, altura,
      })
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        })
      }

      const aluno = await _Aluno2.default.findByPk(id)

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno does not exist'],
        })
      }

      await aluno.update(req.body)
      return res.json(aluno)
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        })
      }

      const aluno = await _Aluno2.default.findByPk(id)
      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno does not exist'],
        })
      }

      await aluno.destroy()
      return res.json({
        apagado: true,
      })
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      })
    }
  }
}

exports. default = new AlunoController()
