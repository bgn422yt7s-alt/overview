const track = document.getElementById("track");
const section = document.querySelector(".pin-section");
const cards = document.querySelectorAll(".panel");

let current = 0;
let target = 0;
let maxScroll = 0;

function update() {
  maxScroll = track.scrollWidth - window.innerWidth;
}

window.addEventListener("resize", update);
update();

window.addEventListener("scroll", () => {
  const rect = section.getBoundingClientRect();

  const progress = Math.min(
    Math.max(-rect.top / (rect.height - window.innerHeight), 0),
    1
  );

  target = -progress * maxScroll;
});

// 🔥 NEUE FOKUS-LOGIK MIT CENTER HOLD
function updateCards() {
  const center = window.innerWidth / 2;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;

    const distance = Math.abs(center - cardCenter);
    const maxDistance = center;

    let norm = distance / maxDistance;

    // 🔥 CENTER HOLD ZONE (sehr wichtig!)
    const deadZone = 0.15; // 15% der Mitte bleibt „perfekt“

    if (norm < deadZone) {
      norm = 0;
    } else {
      norm = (norm - deadZone) / (1 - deadZone);
    }

    norm = Math.min(norm, 1);

    // 🔥 weichere Kurve (nicht linear!)
    const eased = Math.pow(norm, 1.4);

    // 🎯 Effekte
    const scale = 1 - eased * 0.25;
    const opacity = 1 - eased * 0.65;
    const blur = eased * 6;

    card.style.transform = `scale(${scale})`;
    card.style.opacity = opacity;
    card.style.filter = `blur(${blur}px)`;
  });
}

function animate() {
  current += (target - current) * 0.08;

  track.style.transform = `translate3d(${current}px,0,0)`;

  updateCards();

  requestAnimationFrame(animate);
}

animate();