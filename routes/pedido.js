const express = require('express')
const router = express.Router()
const pedidosController = require('../controllers/pedidos-controller')


// RETORNA TODOS OS PEDIDO
router.get('/', pedidosController.getPedido)

// INSERE UM PEDIDO
router.post('/', pedidosController.postPedido)

// RETORNA UM DADO DE UM PEDIDO POR ID
router.get('/:id_pedido', pedidosController.getSinglePedido)

// ALTERA UM PEDIDO
router.patch('/', pedidosController.patchPedido)

// REMOVE UM PEDIDO
router.delete('/', pedidosController.deletePedido)

module.exports = router