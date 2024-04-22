

    const countryFORM = document.getElementById('countryForm');
    const countryLIST = document.getElementById('countryLIST');

    const botaoAbrir = document.getElementById('botao-abrir');
    

    function listCountry() {
        fetch('http://localhost:3000/Country')
            .then(response => response.json())
            .then(data => {
                countryLIST.innerHTML = '';
                data.forEach(user => {
                    const li = document.createElement('li');
                    li.innerHTML = 
                    `<img id="imglista" src="${user.image}"> </img>
                    <p>ID: ${user.id} - Name: ${user.name} - Continent: ${user.continent} - Language: ${user.language}</p>`;
                    
                    const deleteButton = document.createElement('button');
                    deleteButton.innerText = 'Deletar';
                    deleteButton.addEventListener('click', () => deleteUser(user.id));
                    li.appendChild(deleteButton);
                    
                    const updateButton = document.createElement('button');
                    updateButton.innerText = 'Editar';
                    updateButton.addEventListener('click', () => editUser(user.id));
                    li.appendChild(updateButton);

                    countryLIST.appendChild(li);


                    
                });
            })
            .catch(error => console.error('Erro:', error));

       

    }

    function cancelar(){
        window.location.reload();
    }

    function deleteUser(id) {
        fetch(`http://localhost:3000/Country/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(() => listCountry()) // Chama listCountry após a exclusão
        .catch(error => console.error('Erro:', error));
    }

    function editUser(id) {
        const newId = prompt("Novo id:");
        const newName = prompt("Novo nome:");
        const newContinent = prompt("Novo continente:");
        const newLanguage = prompt("Nova língua:");

        if (newId && newName && newContinent && newLanguage) {
            fetch(`http://localhost:3000/Country/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: newId, name: newName, continent: newContinent, language: newLanguage }),
            })
            .then(() => listCountry())
            .catch(error => console.error('Erro:', error));
        }
    }

    countryFORM.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = parseInt(document.getElementById('id').value)
        const name = document.getElementById('name').value;
        const continent = document.getElementById('continent').value;
        const language = document.getElementById('language').value;
        const image = document.getElementById('image').value;

        if (!id || !name || !continent || !language || !image) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        fetch('http://localhost:3000/Country', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, name: name, continent: continent, language: language, image: image }),
        })
        .then(response => response.json())
        .then(() => {
            listCountry();
            countryFORM.reset();
        })
        .catch(error => console.error('Erro:', error));
    });




    // function LISTCountries() {
    //     countryLIST.innerHTML = '';
    
    //     //const countries = JSON.parse(dados.getItem('Country')) || [];
    
    //     countries.forEach((country, index) => {
    //         const countryDiv = document.createElement('div');
    //         countryDiv.classList.add('country');
    
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
    //         deleteBtn.addEventListener('click', () => {
    //             countries.splice(index, 1);
    //             dados.setItem('countries', JSON.stringify(countries));
    //             displayCountries();
    //         });
    //         countryDiv.appendChild(deleteBtn);
    
    //         countryLIST.appendChild(countryDiv);
    //     });
    // }
    
    
    
    function carregarImagem() {
        const imageUrlInput = document.getElementById('image');
        const image = imageUrlInput.value;
    
        if (image.trim() === '') {
            alert('Por favor, insira um URL válido da imagem.');
            return;
        }
    
        const previewContainer = document.getElementById('previewContainer');
    
        // Limpa o conteúdo anterior
        previewContainer.innerHTML = ''; 
    
        // Cria um elemento <img> para exibir a imagem
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.style.maxWidth = '100%';
        imgElement.style.height = 'auto';
    
        // Adiciona o elemento <img> ao contêiner de visualização
        previewContainer.appendChild(imgElement);
    }

     // Adiciona um evento de clique ao botão
     botaoAbrir.addEventListener('click', function() {
        // Verifica se o container está visível ou oculto
        const containerVisivel = getComputedStyle(container).display !== 'none';

        // Se o container estiver oculto, exibe-o; se estiver visível, oculta-o
        if (!containerVisivel) {
            container.style.display = 'block'; // Exibe o container
        } else {
            container.style.display = 'none'; // Oculta o container
        }
    });
    
    
    
    
    
    //LISTCountries();
    listCountry();
