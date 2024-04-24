const dados = require('./dados.json')
const express = require('express')
const fs = require('fs')
const cors = require('cors')



const server = express()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.use(cors())
server.use(express.json())


server.listen(3000, () => {
    console.log("O servidor está funcional");
})

// CRUD DA API

// Create da API
server.post('/Country', (req, res) => {
    const newCountry = req.body

    if (!newCountry.name || !newCountry.continent || !newCountry.language || !newCountry.image) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" })
    } else {
        dados.Country.push(newCountry)
        salvarDados(dados)

        return res.status(201).json({ mensagem: "Dados completos, cadastro feito com sucesso!" })
    }
})

// Read da API
server.get('/Country', (req, res) => {
    return res.json(dados.Country)
})

// Update da API
server.put('/Country/:id', (req, res) => {
    const countryID = parseInt(req.params.id)
    const atualizarCountry = req.body

    const indiceCountry = dados.Country.findIndex(u => u.id === countryID)

    if (indiceCountry === -1) {
        return res.status(404).json({ mensagem: "País não encontrado" })
    } else {
        

        dados.Country[indiceCountry].name = atualizarCountry.name || dados.Country[indiceCountry].name
        
        dados.Country[indiceCountry].continent = atualizarCountry.continent || dados.Country[indiceCountry].continent

        dados.Country[indiceCountry].language = atualizarCountry.language|| dados.Country[indiceCountry].language

        dados.Country[indiceCountry].image = atualizarCountry.image|| dados.Country[indiceCountry].image
        salvarDados(dados)

        return res.status(201).json({ mensagem: "Dados completos, atualização feita com sucesso!" })
    }
})



//Delete da API
server.delete('/Country/:id', (req, res) => {
    const id = parseInt(req.params.id)

    // filtrar os Países, removendo pelo id correspondente

    dados.Country = dados.Country.filter(u => u.id !== id)

    salvarDados(dados)

    return res.status(200).json({ mensagem: "País excluido com sucesso!" })
})



// Função que salva os dados
function salvarDados() {
    fs.writeFileSync(__dirname + '/dados.json', JSON.stringify(dados, null, 2))
}




