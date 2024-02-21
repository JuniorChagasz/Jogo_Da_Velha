var locais = document.querySelectorAll('.local'); // Seleciona todas as células do jogo
var jogador_vez = '✖️'; // Define o jogador da vez como '✖️'
var jogadas = 9; // Define o número inicial de jogadas como '9'
var jogo_acabou = false; // Variável para controlar se o jogo acabou

// Elementos de informação na tela
var jogadorInfo = document.getElementById('jogador'); // Elemento para exibir o jogador da vez
var jogadasInfo = document.getElementById('jogadas'); // Elemento para exibir as jogadas restantes

// Função para atualizar as informações na tela
function atualizarInfo() {
    jogadorInfo.textContent = 'Jogador da vez: ' + jogador_vez; // Atualiza o texto do jogador da vez
    jogadasInfo.textContent = 'Jogadas restantes: ' + jogadas; // Atualiza o texto das jogadas restantes
}

// Elemento de temporizador na tela
var temporizador = document.getElementById('temporizador');

// Função para exibir o temporizador na tela
function exibirTemporizador() {
    temporizador.textContent = 'Reiniciando em 10 segundos...';
}
// Função para reiniciar o temporizador
function reiniciarTemporizador() {
    temporizador.textContent = ''; // Oculta o temporizador ao reiniciar o jogo
}

// Evento de clique nas células do jogo
locais.forEach((local, index) => {
    local.addEventListener('click', () => {
        // Verifica se o jogo não acabou e a célula está vazia
        if (!jogo_acabou && local.innerHTML == '') {
            local.innerHTML = jogador_vez; // Define o símbolo do jogador na célula
            if (ver_se_ganhou()) { // Verifica se alguém ganhou
                jogo_acabou = true; // Define que o jogo acabou
                exibirTemporizador(); // Exibe o temporizador quando o jogo acaba
                setTimeout(() => {
                    reiniciar_jogo(); // Reinicia o jogo após 10 segundos
                }, 10000); 
            } else {
                ver_se_empatou(); // Troca para o próximo jogador
                troca_jogador(); // Verifica se deu velha
            }
            atualizarInfo(); // Atualiza as informações na tela após cada jogada
        } else if (jogo_acabou) {
            alert("O jogo acabou!"); // Exibe um alerta se o jogo já acabou
        } else {
            alert("Esta posição já está ocupada!"); // Exibe um alerta se a célula já estiver ocupada
        }
    });
});

// Função para trocar o jogador da vez
function troca_jogador() {
    jogador_vez = jogador_vez === '✖️' ? '⭕' : '✖️';
}

// Função para verificar se deu velha
function ver_se_empatou() {
    if (jogadas == 1) {
        alert('Acabou, deu velha'); // Exibe um alerta se deu velha
        jogo_acabou = true;  // Define que o jogo acabou
        exibirTemporizador(); // Exibe o temporizador quando o jogo acaba
        setTimeout(() => {
            reiniciar_jogo(); // Reinicia o jogo após 10 segundos
        }, 10000); 
    } else {
        jogadas--; // Decrementa o número de jogadas restantes
    }
}

// Função para verificar se alguém ganhou
function ver_se_ganhou() {
    const sequencias = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let index = 0; index < sequencias.length; index++) {
        let p1 = sequencias[index][0];
        let p2 = sequencias[index][1];
        let p3 = sequencias[index][2];
        if (locais[p1].innerHTML == jogador_vez &&
            locais[p2].innerHTML == jogador_vez &&
            locais[p3].innerHTML == jogador_vez) {
            alert(jogador_vez + ' ganhou');
            // Adiciona a classe 'vencedor' às células da sequência vencedora
            locais[p1].classList.add('vencedor');
            locais[p2].classList.add('vencedor');
            locais[p3].classList.add('vencedor');
            return true;
        }
    }
    return false;
}

// Função para reiniciar o jogo
function reiniciar_jogo() {
    locais.forEach((local) => {
        local.innerHTML = ''; // Limpa o conteúdo de todas as células
        local.classList.remove('vencedor'); // Remove a classe 'vencedor' de todas as células ao reiniciar o jogo
    });
    jogador_vez = '✖️'; // Define o jogador da vez como '✖️'
    jogadas = 9; // Define o número de jogadas restantes como '9'
    jogo_acabou = false; // Define que o jogo não acabou
    reiniciarTemporizador(); // Reinicia o temporizador ao reiniciar o jogo
    atualizarInfo(); // Atualiza as informações na tela ao reiniciar o jogo
    alert('Novo jogo iniciado!'); // Exibe um alerta informando que um novo jogo foi iniciado
}

var temporizadorInterval;

// Função para exibir o temporizador na tela
function exibirTemporizador() {
    let segundos = 10;
    temporizador.textContent = 'Reiniciando em ' + segundos + ' segundos...';
    temporizadorInterval = setInterval(() => {
        segundos--;
        if (segundos >= 0) {
            temporizador.textContent = 'Reiniciando em ' + segundos + ' segundos...';
        } else {
            clearInterval(temporizadorInterval); // Limpa o temporizador quando o tempo acabar
        }
    }, 1000); // Atualiza o temporizador a cada segundo
}

function reiniciarTemporizador() {
    temporizador.textContent = ''; // Oculta o temporizador ao reiniciar o jogo
}

// Atualiza as informações na tela ao iniciar o jogo
atualizarInfo();
