const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const themeBtn = document.querySelector("#themeBtn");
const langBtn = document.querySelector("#langBtn");

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".main-nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const savedTheme = localStorage.getItem("aafdrmc-theme");
if (savedTheme === "dark") body.classList.add("dark");
themeBtn?.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("aafdrmc-theme", body.classList.contains("dark") ? "dark" : "light");
});

/* langBtn?.addEventListener("click", () => {
  langBtn.textContent = langBtn.textContent === "አማ" ? "EN" : "አማ";
}); */

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const counters = document.querySelectorAll("[data-count]");
let countersStarted = false;
const countObserver = new IntersectionObserver(entries => {
  if (entries.some(e => e.isIntersecting) && !countersStarted) {
    countersStarted = true;
    counters.forEach(el => {
      const target = Number(el.dataset.count);
      const duration = 1100;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now-start)/duration,1);
        el.textContent = Math.floor((1-Math.pow(1-p,3))*target).toLocaleString();
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }
}, {threshold:.3});
const stats = document.querySelector(".stats-section");
if (stats) countObserver.observe(stats);

const modal = document.querySelector("#guideModal");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const modalList = document.querySelector("#modalList");
const guides = {
  home: [
    "ለሆቴል ሆነ ለሕንፃ", "ለማስተዳደር ምቹ እና ለቁጥጥር አመቺ የሆነ መተግበሪያ ስላለን መጥተው እንነጋገር በርግጠኝነት ምርጫዎ ያደርጉናል.", 
    [
      "ሽያጭ መቆጣጠር .", 
      "ደሞዝ አከፋፈል .", 
      "ንብረት መቆጣጠር."
    ]
  ],
  electrical: [
    "ድረ ገጽ ግንባታ", 
    "በዓለም ላይ ተደራሽ በመሆን ለስራዎ ዓለም አቀፍ ደንበኛ ያፍሩ ተደራሽነቶንም ያስፋፉ ዘመናዊ ይሁኑ ግዜውን ይምሰሉ ተመራጭ ሳቢ እና ማራኪ ድረገጽ ይኑሮህ.", [
      "መገንባት .", 
      "ማሻሻል .", 
      "ማማከር."]
    ],
  gas: [
    "የተሽከረካሪ ክትትለና ቁጥጥር", "የመኪናዎች ወጪ ቁጥጥር እንቅስቃሴ ፍጆታና የመሳሰሉ ስራዎችን ማቀላጠፍ የሚችሉ መተግበሪያዎችን ሰርተን እንጠብቆታለን..", [
      "የነዳጅ ወጪ .", 
      "የጥገና ወጪ .", 
      "የርቀት ልኬት."]
    ],
  building: [
    "ተቋም እና ሰራተኞችን ማስተዳደ", "ስራን ቆጠሮ መስጠት ቆጥሮም መቀበል መከታተል ማስቻል በምንሰራው መተግበሪያ እንዲቀል አድርገናል ተባብረን እንደግ..", [
      "ስራን በመረጃ ማስተዳደር .", 
      "ስራን መመዘን .", 
      "ሪፖርት ማድረግ ማስቻል."]
    ]
};
document.querySelectorAll("[data-modal]").forEach(btn => btn.addEventListener("click", () => {
  const g = guides[btn.dataset.modal];
  modalTitle.textContent = g[0]; modalText.textContent = g[1];
  modalList.innerHTML = g[2].map(x => `<li>${x}</li>`).join("");
  modal.classList.add("show"); modal.setAttribute("aria-hidden","false");
}));
document.querySelector(".modal-close")?.addEventListener("click", closeModal);
modal?.addEventListener("click", e => { if (e.target === modal) closeModal(); });
function closeModal(){ modal.classList.remove("show"); modal.setAttribute("aria-hidden","true"); }

const stationSearch = document.querySelector("#stationSearch");
stationSearch?.addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll(".station").forEach(card => {
    card.style.display = card.dataset.name.toLowerCase().includes(q) ? "grid" : "none";
  });
});

document.querySelector("#contactForm")?.addEventListener("submit", e => {
  e.preventDefault();
  document.querySelector("#formNote").textContent = "Thank you. This demo form is ready to connect to your official backend/email service.";
  e.target.reset();
});

document.querySelector("#year").textContent = new Date().getFullYear();
const backTop = document.querySelector("#backTop");
window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 600);
  const sections = [...document.querySelectorAll("main section[id]")];
  const current = sections.reverse().find(s => window.scrollY >= s.offsetTop - 160);
  if (current) {
    document.querySelectorAll(".main-nav a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#"+current.id));
  }
});
backTop?.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));
