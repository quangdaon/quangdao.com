const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('click', e => {
    if (e.target.matches('[data-reveal]')) {
      e.preventDefault();
      card.classList.add('show-reveal');
    }
  });
});

document.addEventListener('click', e => {
  cards.forEach(card => {
    const triggers = [...card.querySelectorAll('[data-reveal]')];
    if (!triggers.includes(e.target) && !e.target.matches('.card-reveal a')) {
      card.classList.remove('show-reveal');
    }
  });
});