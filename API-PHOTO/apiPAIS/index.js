

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
                    
                    // Definindo estilos diretamente usando a propriedade style
                    deleteButton.style.width = '10vh'; // Define a largura como 15% da altura da viewport
                    deleteButton.style.height = '30px'; // Define a altura como 40 pixels
                    deleteButton.style.padding = '10px'; // Define o preenchimento interno como 10 pixels em todas as direções
                    deleteButton.style.fontSize = '10px'; // Define o tamanho da fonte como 20 pixels
                    
                    deleteButton.addEventListener('click', () => deleteUser(user.id));
                    li.appendChild(deleteButton);
                    
            
                    
                    const updateButton = document.createElement('button');
                    updateButton.innerText = 'Editar';

                    updateButton.style.width = '10vh'; // Define a largura como 15% da altura da viewport
                    updateButton.style.height = '30px'; // Define a altura como 40 pixels
                    updateButton.style.padding = '10px'; // Define o preenchimento interno como 10 pixels em todas as direções
                    updateButton.style.fontSize = '10px'; // Define o tamanho da fonte como 20 pixels
                    
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
        
        const newName = prompt("Novo nome:");
        const newContinent = prompt("Novo continente:");
        const newLanguage = prompt("Nova língua:");
        const newImage = prompt("Nova Image:");

        if ( newName && newContinent && newLanguage && newImage ) {
            fetch(`http://localhost:3000/Country/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({  name: newName, continent: newContinent, language: newLanguage, image:newImage }),
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
        imgElement.style.maxWidth = '50%';
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
            container.style.backgroundColor = 'white'
        } else {
            container.style.display = 'none'; // Oculta o container
        }
    });
    
    
    
    
    
    //LISTCountries();
    listCountry();
