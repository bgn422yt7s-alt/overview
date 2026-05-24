const track = document.getElementById("track");
const section = document.querySelector(".pin-section");

let maxScroll = 0;

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

  const x = -progress * maxScroll;

  track.style.transform = `translate3d(${x}px,0,0)`;
});