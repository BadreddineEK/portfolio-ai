/* =============================================
   BEK.ai — AI Training Portfolio
   Main script
   ============================================= */

// ===================== BOOT SEQUENCE =====================
const bootLogs = [
  { text: '> Initializing BEK neural network...', cls: 'info', delay: 0 },
  { text: '> Loading pretrained weights from Polytech Lyon...', cls: '', delay: 300 },
  { text: '[OK] Applied Mathematics degree — loaded ✓', cls: 'ok', delay: 700 },
  { text: '[OK] Master Maths en Action — loaded ✓', cls: 'ok', delay: 1000 },
  { text: '[OK] Master MAE IAE Lyon — loaded ✓', cls: 'ok', delay: 1300 },
  { text: '> Importing training data...', cls: 'info', delay: 1600 },
  { text: '[OK] BIOASTER internship — RNA-seq data loaded ✓', cls: 'ok', delay: 2000 },
  { text: '[OK] Efor/Boehringer Ingelheim — current session active ✓', cls: 'ok', delay: 2400 },
  { text: '> Installing packages: streamlit, pytorch, xgboost...', cls: '', delay: 2700 },
  { text: '[WARN] Curiosity overflow detected — expanding architecture', cls: 'warn', delay: 3200 },
  { text: '[OK] GoldSignal model — deployed ✓', cls: 'ok', delay: 3600 },
  { text: '[OK] Neural canvas — initialized ✓', cls: 'ok', delay: 3900 },
  { text: '> Model ready. Starting portfolio...', cls: 'info', delay: 4200 },
];

const bootLogEl = document.getElementById('boot-log');
const bootBarEl = document.getElementById('boot-bar');
const bootStatusEl = document.getElementById('boot-status');
const bootScreen = document.getElementById('boot-screen');
const app = document.getElementById('app');

function runBoot() {
  bootLogs.forEach((entry, i) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.textContent = entry.text;
      if (entry.cls) line.className = entry.cls;
      bootLogEl.appendChild(line);
      bootLogEl.scrollTop = bootLogEl.scrollHeight;

      const progress = ((i + 1) / bootLogs.length) * 100;
      bootBarEl.style.width = progress + '%';
      bootStatusEl.textContent = entry.text.replace(/^>\s*/, '').replace(/^\[.*?\]\s*/, '');
    }, entry.delay);
  });

  const totalTime = bootLogs[bootLogs.length - 1].delay + 800;
  setTimeout(() => {
    bootScreen.classList.add('fade-out');
    app.classList.remove('hidden');
    setTimeout(() => {
      bootScreen.style.display = 'none';
      initApp();
    }, 800);
  }, totalTime);
}

runBoot();

// ===================== INIT APP =====================
function initApp() {
  initNeuralBg();
  initHeroTerminal();
  initEpochCounter();
  initLossBars();
  initScrollAnimations();
  initCounters();
  initNavHighlight();
}

// ===================== NEURAL BACKGROUND =====================
function initNeuralBg() {
  const canvas = document.getElementById('neural-bg');
  const ctx = canvas.getContext('2d');
  let W, H, nodes, animId;

  const NUM_NODES = 60;
  const CONNECTION_DIST = 150;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createNodes() {
    nodes = Array.from({ length: NUM_NODES }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2.5 + 1,
      pulse: Math.random() * Math.PI * 2,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Move nodes
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      n.pulse += 0.02;
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.4;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99,179,237,${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      const r = n.r + Math.sin(n.pulse) * 0.5;
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99,179,237,0.7)`;
      ctx.fill();
    });

    animId = requestAnimationFrame(draw);
  }

  resize();
  createNodes();
  draw();
  window.addEventListener('resize', () => { resize(); createNodes(); });
}

// ===================== HERO TERMINAL TYPEWRITER =====================
function initHeroTerminal() {
  const lines = [
    { text: '$ python train.py --model BEK --device cpu', delay: 0, color: '' },
    { text: '', delay: 400, color: '' },
    { text: 'Model: BEK v1.0', delay: 500, color: 'info' },
    { text: 'Params: 24y · Lyon, France 🇫🇷', delay: 800, color: '' },
    { text: '', delay: 1100, color: '' },
    { text: 'Epoch 1/∞ — Loading training data...', delay: 1200, color: '' },
    { text: '✓ Batch 1: Applied Maths Engineering', delay: 1600, color: 'ok' },
    { text: '✓ Batch 2: BIOASTER — Autoencoders RNA-seq', delay: 2000, color: 'ok' },
    { text: '✓ Batch 3: Efor/Boehringer — Data Science', delay: 2400, color: 'ok' },
    { text: '', delay: 2700, color: '' },
    { text: 'loss: 0.0012 · accuracy: 99.88% · val_loss: 0.0008', delay: 2900, color: 'info' },
    { text: '', delay: 3200, color: '' },
    { text: '→ Model converged. Ready to deploy. 🚀', delay: 3400, color: 'accent' },
  ];

  const container = document.getElementById('hero-terminal');
  // clear default
  container.innerHTML = '';

  lines.forEach(({ text, delay, color }) => {
    setTimeout(() => {
      const div = document.createElement('div');
      div.className = 't-line' + (color === 'ok' ? ' success' : color === 'info' ? '' : color === 'accent' ? ' accent-line' : '');

      if (color === 'info') div.style.color = '#63b3ed';
      div.textContent = text;
      container.appendChild(div);
      container.scrollTop = container.scrollHeight;
    }, delay);
  });
}

// ===================== EPOCH COUNTER =====================
function initEpochCounter() {
  const el = document.getElementById('epoch-counter');
  let epoch = 0;
  setInterval(() => {
    epoch++;
    el.textContent = String(epoch).padStart(3, '0');
  }, 1500);
}

// ===================== LOSS BARS =====================
function initLossBars() {
  setTimeout(() => {
    document.querySelectorAll('.loss-bar').forEach(bar => {
      const target = bar.dataset.target;
      bar.style.width = target + '%';
    });
  }, 500);
}

// ===================== SCROLL ANIMATIONS =====================
function initScrollAnimations() {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(s => observer.observe(s));
}

// ===================== COUNTERS =====================
function initCounters() {
  const statCards = document.querySelectorAll('.stat-card[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const target = parseInt(card.dataset.count);
        const suffix = card.dataset.suffix || '';
        const numEl = card.querySelector('.stat-num');
        if (!numEl || card.dataset.animated) return;
        card.dataset.animated = 'true';
        let current = 0;
        const step = Math.ceil(target / 20);
        const interval = setInterval(() => {
          current = Math.min(current + step, target);
          numEl.textContent = current + suffix;
          if (current >= target) clearInterval(interval);
        }, 60);
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.5 });

  statCards.forEach(c => observer.observe(c));
}

// ===================== NAV HIGHLIGHT =====================
function initNavHighlight() {
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id], .section[id]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(a => {
          a.style.color = a.getAttribute('href') === '#' + id ? 'var(--accent)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}
