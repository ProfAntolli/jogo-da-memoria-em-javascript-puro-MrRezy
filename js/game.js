const grid = document.querySelector('.grid');
const spanJogador = document.querySelector('.jogador');
const timer = document.querySelector('.timer');

const personagens = [
    'fantasma',
    'bota',
    'abelha',
    'coelho-pe',
    'lhama',
    'Negócio',
    'pombo-pao',
    'sangato',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 16) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanJogador.innerHTML}! Seu tempo foi de: ${timer.innerHTML}. Chad está orgulhoso!`);
  }
}

const checkCards = () => {
  const firstPersonagem = firstCard.getAttribute('data-pers');
  const secondPersonagem = secondCard.getAttribute('data-pers');

  if (firstPersonagem === secondPersonagem) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';

    checkEndGame();
    
  } else {

    setTimeout(() => {
      
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {

  if(target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if(firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if(secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }
}

const createCard = (personagem) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${personagem}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-pers', personagem);

    return card;
}

const loadGame = () => {

    const duplicatePersonagens = [ ...personagens, ...personagens]

    const shuffedArray = duplicatePersonagens.sort(() => Math.random() -0.5);

    shuffedArray.forEach((personagem) => {
        const card = createCard(personagem);
        grid.appendChild(card);
    });
}

const startTimer = () => {

    this.loop = setInterval(() => {
    const tempo = +timer.innerHTML;
    timer.innerHTML = tempo + 1;

}, 1000);
}

window.onload = () => {

  spanJogador.innerHTML = localStorage.getItem('jogador');
  startTimer();
  loadGame();
}