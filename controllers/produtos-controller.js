const mysql = require('../mysql').pool

exports.getProdutos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM produtos',
            (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    produtos: result.map(prod => {
                        return {
                            id_produtos: prod.id_produtos,
                            nome: prod.nome,
                            preco: prod.preco,
                            imagem_produto: prod.imagem_produto,
                            request: {
                                tipo: 'GET',
                                descricao: 'retorna os detalhes de um produto especifico',
                                URL: 'http://localhost:3000/produtos' + prod.id_produtos
                            }
                        }
                    })
                }
                res.status(200).send(response)
            }
        )
    })

}

exports.postProduto = (req, res, next) => {
    console.log(req.usuario)
    console.log(req.file)
    mysql.getConnection((error, conn) => {
        if (error) return res.status(500).send({ error: error })
        conn.query('INSERT INTO produtos (nome, preco, imagem_produto) VALUES (?,?,?)', [req.body.nome, req.body.preco, req.file.path],
            (error, result, field) => {
                conn.release()

                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'produto inserido com sucesso',
                    produtoCriado: {
                        id_produtos: result.id_produtos,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        imagem_produto: req.file.path,
                        request: {
                            tipo: 'GET',
                            descricao: 'retorna todos os produtos',
                            URL: 'http://localhost:3000/produtos'
                        }
                    }
                }
                res.status(201).send(response)
            }
        )
    })


}

exports.getSingleProduto = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM produtos WHERE id_produtos = ?;', [req.params.id_produto],
            (error, result, field) => {
                conn.release()
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi possivel encontrar seu ID.'
                    })
                }
                const response = {
                    produto: {
                        id_produtos: result[0].id_produtos,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        imagem_produto: result[0].imagem_produto,
                        request: {
                            tipo: 'GET',
                            descricao: 'retorna todos os produtos',
                            URL: 'http://localhost:3000/produtos'
                        }
                    }
                }
                res.status(200).send(response)
            }
        )
    })
}

exports.patchProduto = (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({ error: error })
        connection.query(
            `UPDATE produtos
                SET nome = ?,
                    preco = ?
                WHERE id_produtos = ?`, [req.body.nome, req.body.preco, req.body.id_produtos],
            (error, result, field) => {
                connection.release()

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                const response = {
                    mensagem: 'produto atualizado com sucesso',
                    produtoAtualizado: {
                        id_produtos: req.body.id_produtos,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        imagem_produto: req.body.imagem_produto,
                        request: {
                            tipo: 'GET',
                            descricao: 'retorna os detalhes de um produto especifico',
                            URL: 'http://localhost:3000/produtos' + req.body.id_produtos
                        }
                    }
                }
                res.status(202).send(response)
            }
        )
    })
}

exports.deleteProduto = (req, res, next) => {
    mysql.getConnection((error, connection) => {
        if (error) return res.status(500).send({ error: error })
        connection.query(
            `DELETE FROM produtos WHERE id_produtos = ?`, [req.body.id_produtos],
            (error, result, field) => {
                connection.release()

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    })
                }
                const response = {
                    mensagem: 'produto removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um produto',
                        URL: 'http://localhost:3000/produtos',
                        body: {
                            nome: 'String',
                            preco: 'Number'
                        }
                    }
                }
                res.status(202).send(response)
            }
        )
    })
}