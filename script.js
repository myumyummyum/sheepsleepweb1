/* ================================
   Sheep Counter + GTM instrumentation
   (compatible with your HTML/CSS)
   Requires IDs: count, hud-counter, sheep-container, restart
   ================================= */

const countSpan      = document.getElementById('count');
const counterHud     = document.getElementById('hud-counter');
const sheepContainer = document.getElementById('sheep-container');
const restartBtn     = document.getElementById('restart');

let count = 0;

// Make dataLayer available early
window.dataLayer = window.dataLayer || [];

// Optional: set to true if you want events to always appear in GA4 DebugView
const DEBUG_MODE = false;

/* ---------- Helpers ---------- */
function bumpHud() {
  counterHud.classList.add('bump');
  setTimeout(() => counterHud.classList.remove('bump'), 180);
}

function readCountFromDom() {
  return parseInt((countSpan?.textContent || '0').replace(/\D+/g, ''), 10) || 0;
}

function pushRestartEvent(sheepNumber) {
  const payload = {
    event: 'sheep_restart',
    sheep_count: sheepNumber
  };
  if (DEBUG_MODE) payload.debug_mode = true;
  window.dataLayer.push(payload);
}

/* ---------- Your original logic (kept) ---------- */
// Spawn a sheep (random 🐑/🐏)
function spawnSheep() {
  const sheep = document.createElement('span');
  sheep.className = 'sheep';
  sheep.textContent = Math.random() > 0.5 ? '🐑' : '🐏';
  sheepContainer.appendChild(sheep);

  // Make sure trails follow this sheep and appear *behind* it
  const stars = ['✨','⭐','✦','✧'];
  const trailInterval = setInterval(() => {
    if (!document.body.contains(sheep)) {
      clearInterval(trailInterval);
      return;
    }

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
  bumpHud();
}

/* ---------- Restart wiring ---------- */
// Hard reload version (keeps your original behavior)
// Adds a tiny delay so GTM can fire before the page nukes itself.
function hardRestart() {
  const sheepNumber = readCountFromDom();
  pushRestartEvent(sheepNumber);
  setTimeout(() => location.reload(), 200);
}

// Soft restart (no page reload) — uncomment this if you want smoother analytics
function softRestart() {
  const sheepNumber = readCountFromDom();
  pushRestartEvent(sheepNumber);
  count = 0;
  countSpan.textContent = '0';
  sheepContainer.innerHTML = '';
  spawnSheep();
}

// Attach the handler you want:
restartBtn.addEventListener('click', hardRestart);
// restartBtn.addEventListener('click', softRestart);

/* ---------- Kickoff ---------- */
countSpan.textContent = '0';
spawnSheep();
