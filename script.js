// Select relevant elements
const countSpan = document.getElementById('count');
const sheep = document.querySelector('.sheep');
const restartBtn = document.getElementById('restart');

let count = 0;  // current sheep count

// Each time a jump animation iteration finishes, increment the counter
sheep.addEventListener('animationiteration', () => {
  count++;
  countSpan.textContent = count;
});

// When the last animation iteration ends, increment the counter for the final sheep
sheep.addEventListener('animationend', () => {
  count++;
  countSpan.textContent = count;
});

// Restart button reloads the page to reset the animation and counter
restartBtn.addEventListener('click', () => {
  location.reload();
});
