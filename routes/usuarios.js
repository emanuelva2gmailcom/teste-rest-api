const express = require('express')
const router = express.Router()
const usuariosController = require('../controllers/usuarios-controller')

router.post('/cadastro', usuariosController.cadastrarUsuario)

router.post('/login', usuariosController.Login)

module.exports = router