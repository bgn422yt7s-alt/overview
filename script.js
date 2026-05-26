const track = document.getElementById("track");
const section = document.querySelector(".pin-section");
const cards = document.querySelectorAll(".panel");

let maxScroll = 0;
let current = 0;
let target = 0;

function updateSizes() {
  maxScroll = track.scrollWidth - window.innerWidth;
}

window.addEventListener("resize", updateSizes);
updateSizes();

window.addEventListener("scroll", () => {
  const top = section.offsetTop;
  const height = section.offsetHeight;
  const scrollY = window.scrollY;

  let progress = (scrollY - top) / (height - window.innerHeight);
  progress = Math.max(0, Math.min(1, progress));

  target = -progress * maxScroll;
});

function updateCards() {
  const center = window.innerWidth / 2;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;

    const distance = cardCenter - center;

    const normalized = distance / center;

    const abs = Math.abs(normalized);

    // 🎯 SCALE (ruhiger & präziser)
    const scale = 1 - Math.min(abs * 0.2, 0.2);

    // 🎯 OPACITY
    const opacity = 1 - Math.min(abs * 0.6, 0.6);

    // 🎯 BLUR (nur leicht!)
    const blur = Math.min(abs * 4, 4);

    card.style.transform = `scale(${scale})`;
    card.style.opacity = opacity;
    card.style.filter = `blur(${blur}px)`;
  });
}

function animate() {
  // smoother interpolation
  current += (target - current) * 0.08;

  track.style.transform = `translate3d(${current}px,0,0)`;

  updateCards();

  requestAnimationFrame(animate);
}

animate();