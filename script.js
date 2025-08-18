const countSpan = document.getElementById('count');
const counterHud = document.getElementById('hud-counter');
const sheepContainer = document.getElementById('sheep-container');
const restartBtn = document.getElementById('restart');

let count = 0;

// Spawn a sheep (random 🐑/🐏)
function spawnSheep() {
  const sheep = document.createElement('span');
  sheep.className = 'sheep';
  sheep.textContent = Math.random() > 0.5 ? '🐑' : '🐏';
  sheepContainer.appendChild(sheep);

  // Make sure trails follow this sheep and appear *behind* it
  const stars = ['✨','⭐','✦','✧'];
  const trailInterval = setInterval(() => {
    if (!document.body.contains(sheep)) return clearInterval(trailInterval);

    // spawn 2–3 puffs per tick for clearer origin
    const puffsToSpawn = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < puffsToSpawn; i++) {
      const puff = document.createElement('span');
      puff.className = 'trail';
      puff.textContent = stars[Math.floor(Math.random() * stars.length)];

      // Position slightly *behind* the sheep, with a tiny random jitter
      const behindX = sheep.offsetLeft - (6 + Math.random() * 18);
      const jitterY = 28 + Math.random() * 20; // lift from ground a bit
      puff.style.left = `${behindX}px`;
      puff.style.top  = `${sheep.offsetTop + jitterY}px`;

      sheepContainer.appendChild(puff);
      setTimeout(() => puff.remove(), 1600);
    }
  }, 750); // slower tick, but more puffs per tick

  sheep.addEventListener('animationend', () => {
    sheep.remove();
    spawnSheep();      // next sheep
    incrementCounter();
  });
}

// Increment with a little "pop" effect
function incrementCounter() {
  count++;
  countSpan.textContent = count;
  counterHud.classList.add('bump');
  setTimeout(() => counterHud.classList.remove('bump'), 180);
}

restartBtn.addEventListener('click', () => location.reload());

// Kickoff
spawnSheep();
