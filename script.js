const peca = document.querySelectorAll('.tangram-imagem');
const caixa = document.getElementById('tangram-caixa');
const btnEsquerda = document.getElementById('btn-gira-esquerda');
const btnDireita = document.getElementById('btn-gira-direita');
let pecaSelecionada = null;
let offsetX, offsetY;
let taArrastando = false;
let anguloRotacao = 0;

// Gera posições iniciais aleatórias para as peças
function posicaoAleatoria(peca) {
    const caixaRect = caixa.getBoundingClientRect();
    const pecaWidth = peca.offsetWidth;
    const pecaHeight = peca.offsetHeight;

    // Defini posições aleatórias - as peças não deve sair do tabuleiro
    const randomX = Math.random() * (caixaRect.width - pecaWidth);
    const randomY = Math.random() * (caixaRect.height - pecaHeight);

    peca.style.left = `${randomX}px`;
    peca.style.top = `${randomY}px`;
    peca.style.position = 'absolute'; 
}

peca.forEach(peca => {
    posicaoAleatoria(peca);
});

// Movimentação e rotação das peças
peca.forEach(peca => {
    // Arrastar
    peca.addEventListener('mousedown', (e) => {
        pecaSelecionada = e.target;
        offsetX = e.clientX - parseFloat(pecaSelecionada.style.left);
        offsetY = e.clientY - parseFloat(pecaSelecionada.style.top);
        taArrastando = true;
        pecaSelecionada.style.cursor = 'grabbing';
    });

    // Parar o arrastar
    peca.addEventListener('mouseup', () => {
        pecaSelecionada.style.cursor = 'grab';
        taArrastando = false;
    });

    // Mantém a peça selecionada
    peca.addEventListener('click', (e) => {
        if (!taArrastando) { 
            pecaSelecionada = e.target;
            pecaSelecionada.style.cursor = 'grabbing';
        }
    });
});

// Girar para a esquerda
btnEsquerda.addEventListener('click', () => {
    if (pecaSelecionada) {
        anguloRotacao -= 15;
        pecaSelecionada.style.transform = `rotate(${anguloRotacao}deg)`;
    }
});

// Girar para a direita
btnDireita.addEventListener('click', () => {
    if (pecaSelecionada) {
        anguloRotacao += 15;
        pecaSelecionada.style.transform = `rotate(${anguloRotacao}deg)`;
    }
});

// Segue o mouse para movimento
document.addEventListener('mousemove', (e) => {
    if (pecaSelecionada && taArrastando) {
        const caixaRect = caixa.getBoundingClientRect();
        const pecaWidth = pecaSelecionada.offsetWidth;
        const pecaHeight = pecaSelecionada.offsetHeight;

        // Manter movimento dentro do tabuleirooo
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        // Garante que a peça não saia do tabuleiro sambando
        newX = Math.max(0, Math.min(newX, caixaRect.width - pecaWidth));
        newY = Math.max(0, Math.min(newY, caixaRect.height - pecaHeight));

        // O mouse estava ficando distante da peça, isso resolve :)
        pecaSelecionada.style.left = `${newX}px`;
        pecaSelecionada.style.top = `${newY}px`;
    }
});