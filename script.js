let clickedCard = null;
let dontClick = false;
let combos = 0;

function cardClick(e) {
  const target = e.currentTarget;

  if (dontClick || target === clickedCard || target.className.includes('done')) {
    return;
  }
  target.className = target.className.replace('front-color', '').trim();
  target.className += ' done';
  if (!clickedCard) {
    //if we have already clicked a card, check if new card matches old card color
    clickedCard = target;
  } else if (clickedCard) {
  
    //if we haven't clicked a card, keep track of the card, display it
    if (clickedCard.getAttribute('data-color') !== target.getAttribute('data-color')) {
      dontClick = true;
      setTimeout(() => {
        clickedCard.className = clickedCard.className.replace('done', '').trim() + ' front-color';
        target.className = target.className.replace('done', '').trim() + ' front-color';
        clickedCard = null;
        dontClick = false;
      }, 500)
    } else {
      combos++;
      clickedCard = null;
      if (combos === 5) {
        alert('YOU WIN');
      }
    }
  }
}

const colors = [
  'pink',
  'green',
  'yellow',
  'blue',
  'orange',
];

const cards = [...document.querySelectorAll('.card')];
for (let color of colors) {
  const firstCardIndex = parseInt(Math.random() * cards.length);
  const firstCard = cards[firstCardIndex];
  cards.splice(firstCardIndex, 1);
  firstCard.className += ` ${color}`;
  firstCard.setAttribute('data-color', color);

  const secCardIndex = parseInt(Math.random() * cards.length);
  const secCard = cards[secCardIndex];
  cards.splice(secCardIndex, 1);
  secCard.className += ` ${color}`;
  secCard.setAttribute('data-color', color);
}

const span = document.querySelector('span');

span.addEventListener('click', function (e) {
  if (e.target.classList.contains("restart-game")) {
    window.addEventListener('load', function (event) {
      console.log('page reloaded');
    });
  }
})

