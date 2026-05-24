const track = document.getElementById("track");
const section = document.querySelector(".pin-section");

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
});

function animate() {
  current += (target - current) * 0.06;

  track.style.transform = `translate3d(${current}px,0,0)`;

  requestAnimationFrame(animate);
}

animate();