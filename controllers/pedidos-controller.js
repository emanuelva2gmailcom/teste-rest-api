const mysql = require('../mysql').pool

exports.getPedido = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT pedidos.id_pedidos, 
                    pedidos.quantidade, 
                    produtos.id_produtos, 
                    produtos.nome, 
                    produtos.preco 
               FROM pedidos 
              INNER JOIN produtos 
                 ON produtos.id_produtos = pedidos.id_produto`,
            (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    pedidos: result.map(prod => {
                        return {
                            pedidos: result.map(pedidos => {
                                return {
                                    id_pedido: pedidos.id_pedidos,
                                    quantidade: pedidos.quantidade,
                                    produto: {
                                        id_produto: pedidos.id_produto,
                                        nome: pedidos.nome,
                                        preco: pedidos.preco
                                    },
                                    request: {
                                        tipo: 'GET',
                                        descricao: 'retorna os detalhes de um pedido especifico',
                                        URL: 'https://primeira-rest-api.herokuapp.com/pedidos' + pedidos.id_pedidos
                                    }
                                }
                            }),

                        }
                    })
                }
                res.status(200).send(response)
            }
        )
    })

}

exports.postPedido = (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error: error })
        conn.query('SELECT * FROM produtos WHERE id_produtos = ?', [req.body.id_produto],
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Produto não encontrado'
                    })
                }
                conn.query('INSERT INTO pedidos (id_produto, quantidade) VALUES (?,?)', [req.body.id_produto, req.body.quantidade],
                    (error, result, field) => {
                        conn.release()

                        if (error) { return res.status(500).send({ error: error }) }
                        const response = {
                            mensagem: 'pedido inserido com sucesso',
                            pedidoCriado: {
                                id_pedidos: result.id_pedidos,
                                id_produto: req.body.id_produto,
                                quantidade: req.body.quantidade,
                                request: {
                                    tipo: 'GET',
                                    descricao: 'retorna todos os pedidos',
                                    URL: 'https://primeira-rest-api.herokuapp.com/pedidos'
                                }
                            }
                        }
                        res.status(201).send(response)
                    }
                )
            })
    })
}

exports.getSinglePedido = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM pedidos WHERE id_pedidos = ?;', [req.params.id_pedido],
            (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi possivel encontrar seu ID.'
                    })
                }
                const response = {
                    pedido: {
                        id_pedido: result[0].id_pedidos,
                        id_produto: result[0].id_produto,
                        quantidade: result[0].quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: 'retorna todos os pedidos',
                            URL: 'https://primeira-rest-api.herokuapp.com/pedidos'
                        }
                    }
                }
                res.status(200).send(response)
            }
        )
    })
}

exports.patchPedido = (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({ error: error })
        connection.query(
            `UPDATE pedidos
                SET id_produto = ?,
                    quantidade = ?
                WHERE id_pedidos = ?`, [req.body.id_produto, req.body.quantidade, req.body.id_pedido],
            (error, result, field) => {
                connection.release()

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                const response = {
                    mensagem: 'pedido atualizado com sucesso',
                    pedidoAtualizado: {
                        id_pedido: req.body.id_pedido,
                        quantidade: req.body.quantidade,
                        id_produto: req.body.id_produto,
                        request: {
                            tipo: 'GET',
                            descricao: 'retorna os detalhes de um pedido especifico',
                            URL: 'https://primeira-rest-api.herokuapp.com/pedidos' + req.body.id_pedido
                        }
                    }
                }
                res.status(202).send(response)
            }
        )
    })
}

exports.deletePedido = (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({ error: error })
        connection.query(
            `DELETE FROM pedidos WHERE id_pedidos = ?`, [req.body.id_pedido],
            (error, result, field) => {
                connection.release()

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                const response = {
                    mensagem: 'pedido removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um pedido',
                        URL: 'https://primeira-rest-api.herokuapp.com/pedidos',
                        body: {
                            id_produto: 'Number',
                            quantidade: 'Number'
                        }
                    }
                }
                res.status(202).send(response)
            }
        )
    })
}