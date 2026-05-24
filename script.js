const track = document.getElementById("track");
const section = document.querySelector(".pin-section");
const cards = document.querySelectorAll(".panel");

let maxScroll = 0;
let current = 0;
let target = 0;

function update() {
  maxScroll = track.scrollWidth - window.innerWidth;
}

window.addEventListener("resize", update);
update();

window.addEventListener("scroll", () => {

  const top = section.offsetTop;
  const height = section.offsetHeight;
  const scrollY = window.scrollY;

  let progress = (scrollY - top) / (height - window.innerHeight);
  progress = Math.max(0, Math.min(1, progress));

  target = -progress * maxScroll;

  updateFocusEffect();
});

function updateFocusEffect() {
  const center = window.innerWidth / 2;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;

    const distance = Math.abs(center - cardCenter);

    // 0 = perfekt center, 1 = weit weg
    const norm = Math.min(distance / (window.innerWidth / 2), 1);

    // SCALE (center größer)
    const scale = 1 - norm * 0.18;

    // OPACITY (side fade)
    const opacity = 1 - norm * 0.5;

    // BLUR (side blur)
    const blur = norm * 6;

    card.style.transform = `scale(${scale})`;
    card.style.opacity = opacity;
    card.style.filter = `blur(${blur}px)`;
  });
}

function animate() {
  current += (target - current) * 0.06;

  track.style.transform = `translate3d(${current}px,0,0)`;

  requestAnimationFrame(animate);
}

animate();