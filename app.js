    const express = require('express')
    const app = express()
    const morgan = require('morgan')
    const bodyParser = require('body-parser')
    const rotaProduto = require('./routes/produtos')
    const rotaPedido = require('./routes/pedido')
    const rotaUsuario = require('./routes/usuarios')

    app.use(morgan('dev'))
    app.use('/uploads', express.static('uploads'))
    app.use(bodyParser.urlencoded({ extended: true })) //apenas formatos simples
    app.use(bodyParser.json({ type: 'application/json' })) //aceita apenas json

    app.use('/produtos', rotaProduto)
    app.use('/pedidos', rotaPedido)
    app.use('/usuarios', rotaUsuario)

    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Origin',
            '*'
        )
        res.header(
            'Access-Control-Allow-Header',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        )

        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PACTH, DELETE, GET')
            return res.status(200).send({})
        }

        next()
    })

    app.use((req, res, next) => {
        const erro = new Error('Não encontrado.')
        erro.status = 404
        next(erro)
    })

    app.use((error, req, res, next) => {
        res.status(error.status || 500)
        return res.send({
            erro: {
                mensagem: error.message
            }
        })
    })

    module.exports = app