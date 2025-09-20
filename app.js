// Seleciona os elementos do DOM uma única vez para melhor performance
const inputNome = document.getElementById("amigo");
const btnAdicionar = document.querySelector('.button-add');
const btnSortear = document.querySelector('.button-draw');
const btnReiniciar = document.querySelector('.button-reset'); // Novo botão
const listaAmigosEl = document.getElementById("listaAmigos");
const resultadoEl = document.getElementById("resultado");

let amigos = [];

// Função para atualizar a lista de amigos na tela
function atualizarLista() {
    listaAmigosEl.innerHTML = ""; // Limpa a lista antes de atualizar
    amigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo;
        li.addEventListener('click', () => removerAmigo(amigo)); // Bônus: permite remover clicando no nome
        li.style.cursor = 'pointer'; // Muda o cursor para indicar que é clicável
        listaAmigosEl.appendChild(li);
    });
}

// Função para adicionar um amigo
function adicionarAmigo() {
    const nome = inputNome.value.trim();

    if (nome === "") {
        alert("Digite um nome válido!");
        return;
    }

    // Normaliza para minúsculas para evitar nomes duplicados como "Robert Fripp e "robert fripp"
    if (amigos.map(a => a.toLowerCase()).includes(nome.toLowerCase())) {
        alert("Esse nome já foi adicionado!");
        inputNome.value = "";
        return;
    }

    amigos.push(nome);
    atualizarLista();
    inputNome.value = "";
    inputNome.focus(); // Mantém o foco no input para adicionar o próximo nome
}

// Função para remover um amigo
function removerAmigo(nomeParaRemover) {
    amigos = amigos.filter(amigo => amigo !== nomeParaRemover);
    atualizarLista();
}

// Função para embaralhar um array (Algoritmo Fisher-Yates)
function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca de elementos
    }
}

// Função para sortear os amigos
function sortearAmigo() {
    if (amigos.length < 4) { // O ideal é ter no mínimo 4 para um sorteio justo e sem ciclos simples
        alert("Adicione pelo menos 4 amigos para um bom sorteio!");
        return;
    }

    let sorteados;
    let sorteioValido = false;

    // Garante que ninguém tire a si mesmo. Repete o embaralhamento se necessário.
    while (!sorteioValido) {
        sorteados = [...amigos];
        embaralharArray(sorteados);

        // Verifica se algum amigo tirou a si mesmo
        sorteioValido = true;
        for (let i = 0; i < amigos.length; i++) {
            if (amigos[i] === sorteados[i]) {
                sorteioValido = false;
                break; // Se encontrou um, o sorteio é inválido, então re-embaralha
            }
        }
    }

    // Mostra o resultado na tela
    resultadoEl.innerHTML = ""; // Limpa resultados anteriores
    for (let i = 0; i < amigos.length; i++) {
        const li = document.createElement("li");
        li.textContent = `${amigos[i]} → ${sorteados[i]}`;
        resultadoEl.appendChild(li);
    }
}

// Função para reiniciar o sorteio
function reiniciar() {
    amigos = [];
    atualizarLista();
    resultadoEl.innerHTML = "";
}

// Adiciona os event listeners aos botões
btnAdicionar.addEventListener('click', adicionarAmigo);
btnSortear.addEventListener('click', sortearAmigo);
btnReiniciar.addEventListener('click', reiniciar);

// Permite adicionar amigo pressionando "Enter"
inputNome.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        adicionarAmigo();
    }
});
