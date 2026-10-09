// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Typing effect (edit these words)
const words = ["a Professor", "a Teacher", "a Mentor", "a Deep Learning Enthusiast"];
const typedEl = document.getElementById("typed");
let w = 0, c = 0, deleting = false;
function type() {
  const word = words[w];
  typedEl.textContent = word.slice(0, c);
  if (!deleting && c < word.length) { c++; setTimeout(type, 90); }
  else if (!deleting) { deleting = true; setTimeout(type, 1400); }
  else if (c > 0) { c--; setTimeout(type, 45); }
  else { deleting = false; w = (w + 1) % words.length; setTimeout(type, 300); }
}
type();

// Mobile menu
const navbar = document.getElementById("navbar");
document.getElementById("menu-toggle").addEventListener("click", () => navbar.classList.toggle("open"));
navbar.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navbar.classList.remove("open")));

// Active link highlight + back-to-top button
const links = [...navbar.querySelectorAll("a")];
const sections = links.map(a => document.querySelector(a.getAttribute("href")));
const toTop = document.getElementById("to-top");
window.addEventListener("scroll", () => {
  const y = window.scrollY + 100;
  let current = 0;
  sections.forEach((s, i) => { if (s && s.offsetTop <= y) current = i; });
  links.forEach((a, i) => a.classList.toggle("active", i === current));
  toTop.classList.toggle("show", window.scrollY > 400);
});

// Materials filter
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    document.querySelectorAll(".material").forEach(m =>
      m.classList.toggle("hide", f !== "all" && m.dataset.cat !== f));
  });
});

// Count-up numbers + scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("visible");
    e.target.querySelectorAll?.(".count").forEach(el => {
      const target = +el.dataset.target; let n = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const t = setInterval(() => { n = Math.min(target, n + step); el.textContent = n; if (n >= target) clearInterval(t); }, 35);
    });
    io.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll(".card, .material, .fact, .t-item, .about-grid").forEach(el => {
  el.classList.add("reveal"); io.observe(el);
});
