const countSpan = document.getElementById('count');
const counterHud = document.getElementById('hud-counter');
const sheepContainer = document.getElementById('sheep-container');
const restartBtn = document.getElementById('restart');

let count = 0;

// Spawn a sheep
function spawnSheep() {
  const sheep = document.createElement('span');
  sheep.className = 'sheep';
  sheep.textContent = Math.random() > 0.5 ? '🐑' : '🐏'; // random sheep/ram
  sheepContainer.appendChild(sheep);

  // Trail puff effect
  const trailInterval = setInterval(() => {
    const rect = sheep.getBoundingClientRect();
    if (!document.body.contains(sheep)) return clearInterval(trailInterval);

    const puff = document.createElement('span');
    puff.className = 'trail';
    puff.textContent = '✨';
    puff.style.left = sheep.offsetLeft + 'px';
    puff.style.bottom = sheep.style.bottom || '30%';
    sheepContainer.appendChild(puff);

    setTimeout(() => puff.remove(), 1000);
  }, 500);

  sheep.addEventListener('animationend', () => {
    sheep.remove();
    spawnSheep(); // spawn the next sheep
    incrementCounter();
  });
}

// Increment counter with bounce
function incrementCounter() {
  count++;
  countSpan.textContent = count;
  counterHud.classList.add('bump');
  setTimeout(() => counterHud.classList.remove('bump'), 200);
}

restartBtn.addEventListener('click', () => location.reload());

// Start first sheep
spawnSheep();
