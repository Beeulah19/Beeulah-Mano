document.addEventListener("DOMContentLoaded", () => {
  const scrollText = document.querySelector(".scroll-words");

  if (!scrollText) return;

  const words = scrollText.textContent.trim().split(/\s+/);
  scrollText.innerHTML = "";

  for (let i = 0; i < words.length; i += 2) {
    const span = document.createElement("span");
    span.className = "scroll-word-group";
    span.textContent = words.slice(i, i + 2).join(" ") + " ";
    scrollText.appendChild(span);
  }

  const wordGroups = scrollText.querySelectorAll(".scroll-word-group");

  function revealWordsOnScroll() {
    const rect = scrollText.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const start = windowHeight * 0.85;
    const end = rect.height * 0.6;

    let progress = (start - rect.top) / (start - end);
    progress = Math.max(0, Math.min(progress, 1));

    const activeCount = Math.floor(progress * wordGroups.length);

    wordGroups.forEach((group, index) => {
      group.classList.toggle("active", index < activeCount);
    });
  }

  window.addEventListener("scroll", revealWordsOnScroll);
  window.addEventListener("resize", revealWordsOnScroll);

  revealWordsOnScroll();
});