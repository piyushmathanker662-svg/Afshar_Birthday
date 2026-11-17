const opening = document.getElementById("opening");
const site = document.getElementById("site");
const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");
let opened = false;

function openSurprise() {
  if (opened) return;
  opened = true;
  envelope.classList.add("open");
  openBtn.textContent = "YOUR SURPRISE IS OPENING ♡";
  setTimeout(() => {
    opening.style.transition = "opacity .9s ease, transform .9s ease";
    opening.style.opacity = "0";
    opening.style.transform = "scale(1.04)";
    setTimeout(() => {
      opening.style.display = "none";
      site.classList.add("visible");
      requestAnimationFrame(() => site.classList.add("show"));
      document.body.style.background = "#f5e9df";
      startAmbientHearts();
      observeReveals();
    }, 900);
  }, 850);
}
envelope.addEventListener("click", openSurprise);
envelope.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") openSurprise(); });
openBtn.addEventListener("click", openSurprise);

function startAmbientHearts() {
  const layer = document.querySelector(".particles");
  const symbols = ["♡","✦","✧"];
  setInterval(() => {
    const p = document.createElement("span");
    p.className = "particle";
    p.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    p.style.left = Math.random()*100 + "vw";
    p.style.fontSize = (10 + Math.random()*15) + "px";
    p.style.animationDuration = (8 + Math.random()*7) + "s";
    layer.appendChild(p);
    setTimeout(() => p.remove(), 16000);
  }, 850);
}

function observeReveals() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("in-view"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: .12});
  items.forEach(el => observer.observe(el));
}

const wishButton = document.getElementById("wishButton");
const wishResult = document.getElementById("wishResult");
wishButton.addEventListener("click", () => {
  wishResult.textContent = "May every wish you make find its way to you. You deserve a life full of beautiful things, Afshar. ♡";
  wishButton.textContent = "A WISH SENT WITH LOVE ♡";
  for (let i=0; i<34; i++) {
    const b = document.createElement("span");
    b.className = "burst";
    b.textContent = Math.random() > .45 ? "♡" : "✦";
    b.style.left = (45 + Math.random()*10) + "vw";
    b.style.top = (55 + Math.random()*8) + "vh";
    b.style.setProperty("--x", ((Math.random()-.5)*85) + "vw");
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 2400);
  }
});
