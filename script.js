const track = document.getElementById("track");

window.addEventListener("scroll", () => {

  const section = document.querySelector(".horizontal-section");
  const rect = section.getBoundingClientRect();

  // nur aktiv wenn Section sichtbar ist
  if (rect.top <= 0 && rect.bottom >= window.innerHeight) {

    const scrollProgress =
      Math.abs(rect.top) /
      (section.offsetHeight - window.innerHeight);

    const maxScroll =
      track.scrollWidth - window.innerWidth;

    track.style.transform =
      `translateX(-${scrollProgress * maxScroll}px)`;
  }
});