const section = document.querySelector(".pin-section");
const track = document.getElementById("track");

let maxScroll = 0;

function update() {
  maxScroll = track.scrollWidth - window.innerWidth;
}

window.addEventListener("resize", update);
update();

window.addEventListener("scroll", () => {
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const scrollY = window.scrollY;

  // Fortschritt innerhalb der Section berechnen
  let progress =
    (scrollY - sectionTop) / (sectionHeight - window.innerHeight);

  // clamp 0–1
  progress = Math.max(0, Math.min(1, progress));

  // horizontal bewegen
  const x = -progress * maxScroll;

  track.style.transform = `translate3d(${x}px,0,0)`;
});