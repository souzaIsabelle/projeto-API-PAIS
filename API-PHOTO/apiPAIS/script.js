const dados = require('./dados.json')
const express = require('express')
const fs = require('fs')
const cors = require('cors')

const server = express()
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
        dados.Country[indiceCountry].id = atualizarCountry.id || dados.Country[indiceCountry].id

        dados.Country[indiceCountry].nome = atualizarCountry.nome || dados.Country[indiceCountry].nome
        
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



    


/*

document.addEventListener('DOMContentLoaded', () => {
    const countryFORM = document.getElementById('countryFORM');
    const countryList = document.getElementById('countryList');

    // Carregar países do Local Storage ao carregar a página
    displayCountries();

*/

    // Adicionar evento de submit ao formulário
    // countryFORM.addEventListener('submit', (e) => {
    //     e.preventDefault();

    //     const name = document.getElementById('name').value;
    //     const continent = document.getElementById('continent').value;
    //     const language = document.getElementById('language').value;
    //     const imageFile = document.getElementById('image').files[0];

    //     if (!name || !continent || !language || !imageFile) {
    //         alert('Please fill in all fields');
    //         return;
    //     }

    //     const reader = new FileReader();
    //     reader.onload = (event) => {
    //         const imageData = event.target.result;

    //         const country = {
    //             name,
    //             continent,
    //             language,
    //             image: imageData
    //         };

    //         saveCountry(country);
    //         displayCountries();
    //         countryFORM.reset();
    //     };

    //     reader.readAsDataURL(imageFile);
    // });

    /*

    // Função para salvar país no Local Storage
    function saveCountry(country) {
        let countries = JSON.parse(dados.getItem('countries')) || [];
        countries.push(country);
        dados.setItem('countries', JSON.stringify(countries));
    }
*/
    // Função para exibir países na lista
    // function displayCountries() {
    //     countryLIST.innerHTML = '';

    //     const countries = JSON.parse(dados.getItem('countries')) || [];

    //     countries.forEach((country, index) => {
    //         const countryDiv = document.createElement('div');
    //         countryDiv.classLIST.add('country');

    //         const image = new Image();
    //         image.src = country.image;
    //         countryDiv.appendChild(image);

    //         const infoDiv = document.createElement('div');
    //         infoDiv.innerHTML = `
    //             <h3>${country.name}</h3>
    //             <p><strong>Continent:</strong> ${country.continent}</p>
    //             <p><strong>Language:</strong> ${country.language}</p>
    //         `;
    //         countryDiv.appendChild(infoDiv);

    //         const deleteBtn = document.createElement('button');
    //         deleteBtn.innerText = 'Delete';
    //         deleteBtn.addEventlistener('click', () => {
    //             countries.splice(index, 1);
    //             dados.setItem('countries', JSON.stringify(countries));
    //             displayCountries();
    //         });
    //         countryDiv.appendChild(deleteBtn);

    //         countryLIST.appendChild(countryDiv);
    //     });
    // }


