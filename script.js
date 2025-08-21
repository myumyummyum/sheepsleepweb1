/* ================================
   Sheep Counter + GTM instrumentation
   Requirements in HTML:
   - <span id="count"></span>
   - <div id="hud-counter"></div>
   - <div id="sheep-container"></div>
   - <button id="restart"></button>
   ================================= */

// ---------- DOM refs ----------
const countSpan      = document.getElementById('count');
const counterHud     = document.getElementById('hud-counter');
const sheepContainer = document.getElementById('sheep-container');
const restartBtn     = document.getElementById('restart');

// ---------- State ----------
let count = 0;

// Ensure dataLayer exists early
window.dataLayer = window.dataLayer || [];

// Optional: flip to true if you want all events to appear in GA4 DebugView
// without GTM Preview. Leave false for normal operation.
const DEBUG_MODE = false;

// ---------- Helpers ----------
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
  if (DEBUG_MODE) payload.debug_mode = true; // shows instantly in GA4 DebugView
  window.dataLayer.push(payload);
}

// ---------- Game logic ----------
function incrementCounter() {
  count++;
  countSpan.textContent = count;
  bumpHud();
}

// Spawn a sheep (random 🐑/🐏) with star trail
function spawnSheep() {
  const sheep = document.createElement('
