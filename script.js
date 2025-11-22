// Seleciona os elementos do DOM com os quais vamos interagir.
// O 'main' será nosso container para os cards, conforme seu CSS.
let cardContainer = document.querySelector("main"); 
let searchInput = document.querySelector("#input-busca"); // Adicione o id="input-busca" ao seu <input> no HTML
let searchButton = document.querySelector("#botao-busca");
let dados = [];

// Função para carregar os dados dos jogos do arquivo JSON.
async function carregarDados() {
    try {
        const resposta = await fetch("data.json");
        dados = await resposta.json();
        renderizarCards(dados); // Exibe todos os jogos inicialmente.
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

// Função para realizar a busca.
function realizarBusca() {
    const termoBusca = searchInput.value.toLowerCase();
    const resultados = dados.filter(game => 
        game.name.toLowerCase().includes(termoBusca) ||
        game.studio.toLowerCase().includes(termoBusca)
    );
    renderizarCards(resultados);
}

// Função que renderiza os cards na tela.
function renderizarCards(games) {
    cardContainer.innerHTML = ""; // Limpa o container antes de adicionar novos cards.

    if (games.length === 0) {
        cardContainer.innerHTML = "<p>Nenhum jogo encontrado com o termo pesquisado.</p>";
        return;
    }

    for (let game of games) {
        let article = document.createElement("article");
        article.classList.add("card", "card-animation"); // Adiciona a classe para a animação
        article.innerHTML = `
            <img src="${game.image}" alt="Capa do jogo ${game.name}">
            <div class="card-info">
                <h2>${game.name}</h2>
                <p> ${game.studio}</p>
                <p> ${game.year}</p>
                <p> ${game.value === 'Paid' ? game.price : 'Gratuito'}</p>
                <a href="${game.link}" target="_blank">Saiba mais</a>
            </div>
        `;
        // Adiciona um delay para criar um efeito escalonado
        article.style.animationDelay = `${games.indexOf(game) * 100}ms`;
        cardContainer.appendChild(article);
    };
}

// Adiciona um "escutador de evento" que chama a função de busca quando o botão é clicado.
searchButton.addEventListener("click", realizarBusca);

// Carrega os dados assim que o script é executado.
carregarDados();