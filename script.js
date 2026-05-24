const track = document.getElementById("track");
const section = document.querySelector(".pin-section");

let maxScroll = 0;

function calculate() {
  maxScroll = track.scrollWidth - window.innerWidth;
}

window.addEventListener("resize", calculate);
calculate();

window.addEventListener("scroll", () => {

  const rect = section.getBoundingClientRect();

  if (rect.top <= 0 && rect.bottom >= window.innerHeight) {

    const progress =
      Math.min(
        1,
        Math.abs(rect.top) /
        (section.offsetHeight - window.innerHeight)
      );

    const x = -progress * maxScroll;

    track.style.transform = `translate3d(${x}px,0,0)`;
  }

});