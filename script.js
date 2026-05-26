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

/* FOCUS */
function updateCards() {

  const center = window.innerWidth / 2;

  cards.forEach(card => {

    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;

    const distance = Math.abs(center - cardCenter);
    const norm = distance / center;

    const deadZone = 0.2;

    let value;

    if (norm < deadZone) {
      value = 0;
    } else {
      value = (norm - deadZone) / (1 - deadZone);
    }

    const eased = Math.pow(value, 1.4);

    const scale = 1 - eased * 0.25;
    const opacity = 1 - eased * 0.7;
    const blur = eased * 6;

    card.style.transform = `scale(${scale})`;
    card.style.opacity = opacity;
    card.style.filter = `blur(${blur}px)`;
  });
}

/* LOOP */
function animate() {
  current += (target - current) * 0.08;

  track.style.transform = `translate3d(${current}px,0,0)`;

  updateCards();

  requestAnimationFrame(animate);
}

animate();