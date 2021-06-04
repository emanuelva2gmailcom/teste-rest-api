const mysql = require('../mysql')

exports.getProdutos = async(req, res, next) => {
    try {
        const result = await mysql.execute("SELECT * FROM produtos")
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
                        URL: process.env.URL_API + 'produtos/' + prod.id_produtos
                    }
                }
            })
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.postProduto = async(req, res, next) => {
    console.log(req.usuario)
    console.log(req.file)
    try {
        const query = 'INSERT INTO produtos (nome, preco, imagem_produto) VALUES (?,?,?)'
        const result = await mysql.execute(query, [req.body.nome, req.body.preco, req.file.path])
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
                    URL: process.env.URL_API
                }
            }
        }
        return res.status(201).send(response)
    } catch (error) {
        if (error) { return res.status(500).send({ error: error }) }
    }
}

exports.getSingleProduto = async(req, res, next) => {
    try {
        const query = 'SELECT * FROM produtos WHERE id_produtos = ?;'
        const result = await mysql.execute(query, [req.params.id_produto])
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
                    URL: process.env.URL_API
                }
            }
        }
        return res.status(200).send(response)
    } catch (error) {
        return res.status(500).send({ error: error })
    }
}

exports.patchProduto = async(req, res, next) => {
    try {
        const query =
            `UPDATE produtos
            SET nome = ?,
                preco = ?
            WHERE id_produtos = ?`
        await mysql.execute(query, [req.body.nome, req.body.preco, req.body.id_produtos])
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
                    URL: process.env.URL_API + 'produtos/' + req.body.id_produtos
                }
            }
        }
        return res.status(202).send(response)
    } catch (error) {
        if (error) { return res.status(500).send({ error: error }) }
    }
}

exports.deleteProduto = async(req, res, next) => {
    try {
        const query = `DELETE FROM produtos WHERE id_produtos = ?`
        const result = await mysql.execute(query, [req.body.id_produtos])
        const response = {
            mensagem: 'produto removido com sucesso',
            request: {
                tipo: 'POST',
                descricao: 'Insere um produto',
                URL: process.env.URL_API,
                body: {
                    nome: 'String',
                    preco: 'Number'
                }
            }
        }
        return res.status(202).send(response)
    } catch (error) {
        if (error) { return res.status(500).send({ error: error }) }
    }
}