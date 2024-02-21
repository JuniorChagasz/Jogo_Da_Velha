var locais = document.querySelectorAll('.local');
var jogador_vez = '✖️';
var jogadas = 9;
var jogo_acabou = false; // Variável para controlar se o jogo acabou

// Elemento de temporizador na tela
var temporizador = document.getElementById('temporizador');

function exibirTemporizador() {
    temporizador.textContent = 'Reiniciando em 7 segundos...';
}

function reiniciarTemporizador() {
    temporizador.textContent = '';
}

locais.forEach((local, index) => {
    local.addEventListener('click', () => {
        if (!jogo_acabou && local.innerHTML == '') {
            local.innerHTML = jogador_vez;
            if (ver_se_ganhou()) {
                jogo_acabou = true;
                exibirTemporizador(); // Exibe o temporizador quando o jogo acaba
                setTimeout(() => {
                    reiniciar_jogo();
                }, 10000); // Reinicia o jogo após 10 segundos
            } else {
                ver_se_empatou();
                troca_jogador();
            }
            atualizarInfo(); // Atualiza as informações na tela após cada jogada
        } else if (jogo_acabou) {
            alert("O jogo acabou!");
        } else {
            alert("Esta posição já está ocupada!");
        }
    });
});

function troca_jogador() {
    jogador_vez = jogador_vez === '✖️' ? '⭕' : '✖️';
}

function ver_se_empatou() {
    if (jogadas == 1) {
        alert('Acabou, deu velha');
        jogo_acabou = true;
        exibirTemporizador(); // Exibe o temporizador quando o jogo acaba
        setTimeout(() => {
            reiniciar_jogo();
        }, 10000); // Reinicia o jogo após 10 segundos
    } else {
        jogadas--;
    }
}

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

function reiniciar_jogo() {
    locais.forEach((local) => {
        local.innerHTML = '';
        // Remove a classe 'vencedor' de todas as células ao reiniciar o jogo
        local.classList.remove('vencedor');
    });
    jogador_vez = '✖️';
    jogadas = 9;
    jogo_acabou = false;
    reiniciarTemporizador(); // Reinicia o temporizador ao reiniciar o jogo
    atualizarInfo(); // Atualiza as informações na tela ao reiniciar o jogo
    alert('Novo jogo iniciado!');
}

var temporizadorInterval;

function exibirTemporizador() {
    let segundos = 10;
    temporizador.textContent = 'Reiniciando em ' + segundos + ' segundos...';
    temporizadorInterval = setInterval(() => {
        segundos--;
        if (segundos >= 0) {
            temporizador.textContent = 'Reiniciando em ' + segundos + ' segundos...';
        } else {
            clearInterval(temporizadorInterval);
        }
    }, 1000); // Atualiza o temporizador a cada segundo
}


function reiniciarTemporizador() {
    temporizador.textContent = ''; // Oculta o temporizador ao reiniciar o jogo
}

// Atualiza as informações na tela ao iniciar o jogo
atualizarInfo();
