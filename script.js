const peca = document.querySelectorAll('.tangram-imagem');
const caixa = document.getElementById('tangram-caixa');
const btnEsquerda = document.getElementById('btn-gira-esquerda');
const btnDireita = document.getElementById('btn-gira-direita');
let pecaSelecionada = null;
let offsetX, offsetY;
let taArrastando = false;
let anguloRotacao = 0;

const versaoAtual = {};

function posicaoAleatoria(peca) {
    const caixaRect = caixa.getBoundingClientRect();
    const pecaWidth = peca.offsetWidth;
    const pecaHeight = peca.offsetHeight;

    const randomX = Math.random() * (caixaRect.width - pecaWidth);
    const randomY = Math.random() * (caixaRect.height - pecaHeight);

    peca.style.left = `${randomX}px`;
    peca.style.top = `${randomY}px`;
    peca.style.position = 'absolute';
}

peca.forEach(peca => {
    const id = peca.id;
    versaoAtual[id] = 1; 
    posicaoAleatoria(peca);
});

peca.forEach(peca => {
    peca.addEventListener('mousedown', (e) => {
        pecaSelecionada = e.target;
        offsetX = e.clientX - parseFloat(pecaSelecionada.style.left);
        offsetY = e.clientY - parseFloat(pecaSelecionada.style.top);
        taArrastando = true;
        pecaSelecionada.style.cursor = 'grabbing';
    });

    peca.addEventListener('mouseup', () => {
        pecaSelecionada.style.cursor = 'grab';
        taArrastando = false;
    });

    peca.addEventListener('click', (e) => {
        if (!taArrastando) { 
            pecaSelecionada = e.target;
            pecaSelecionada.style.cursor = 'grabbing';
        }
    });
});

btnEsquerda.addEventListener('click', () => {
    if (pecaSelecionada) {
        anguloRotacao -= 15;
        pecaSelecionada.style.transform = `rotate(${anguloRotacao}deg)`;
    }
});

btnDireita.addEventListener('click', () => {
    if (pecaSelecionada) {
        anguloRotacao += 15;
        pecaSelecionada.style.transform = `rotate(${anguloRotacao}deg)`;
    }
});

document.addEventListener('mousemove', (e) => {
    if (pecaSelecionada && taArrastando) {
        const caixaRect = caixa.getBoundingClientRect();
        const pecaWidth = pecaSelecionada.offsetWidth;
        const pecaHeight = pecaSelecionada.offsetHeight;

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        newX = Math.max(0, Math.min(newX, caixaRect.width - pecaWidth));
        newY = Math.max(0, Math.min(newY, caixaRect.height - pecaHeight));

        pecaSelecionada.style.left = `${newX}px`;
        pecaSelecionada.style.top = `${newY}px`;
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'c' && pecaSelecionada) {
        const id = pecaSelecionada.id;
        let versao = versaoAtual[id];

        versao = versao < 6 ? versao + 1 : 1;
        versaoAtual[id] = versao;

        pecaSelecionada.src = `img/${id}-${versao.toString().padStart(2, '0')}.svg`;
    }
});