const cards = document.querySelectorAll('.card');

function showCardReveal(card) {
  card.classList.add('show-reveal');
  card.querySelectorAll('.card-reveal a').forEach(link => link.tabIndex = 0);
}

function hideCardReveal(card) {
  card.classList.remove('show-reveal');
  card.querySelectorAll('.card-reveal a').forEach(link => link.tabIndex = -1);
}

cards.forEach(card => {
  card.addEventListener('click', function(e) {
    if (e.target.matches('[data-reveal]')) {
      e.preventDefault();
      showCardReveal(card);
    }
  });
});

document.addEventListener('click', e => {
  cards.forEach(card => {
    const triggers = [...card.querySelectorAll('[data-reveal]')];
    if (!triggers.includes(e.target) && !e.target.matches('.card-reveal-content *')) {
      hideCardReveal(card);
    }
  });
});

document.addEventListener('keyup', ({ key }) => {
  if (key === 'Escape') {
    cards.forEach(card => {
      hideCardReveal(card);
    });
  }
})