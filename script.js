// === Плавная прокрутка ===
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
  });
});

// === Анимации при прокрутке + фиксированная шапка ===
function updateOnScroll() {
  const header = document.querySelector('header');
  const body = document.body;
  const elements = document.querySelectorAll('section');

  // sticky header
  if (window.scrollY > 100) {
    header.classList.add('sticky');
    body.classList.add('with-sticky-header');
  } else {
    header.classList.remove('sticky');
    body.classList.remove('with-sticky-header');
  }

  // Появление элементов
  elements.forEach(el => {
    const rect = el.getBoundingClientRect().top;
    if (rect < window.innerHeight / 1.2) el.classList.add('visible');
  });

  // Кнопка наверх
  const toTop = document.getElementById('toTop');
  toTop.style.display = window.scrollY > 500 ? 'block' : 'none';
}
window.addEventListener('scroll', updateOnScroll);
// Запуск сразу при загрузке — иначе контент остаётся невидимым (opacity: 0)
// до первой прокрутки страницы пользователем.
window.addEventListener('DOMContentLoaded', updateOnScroll);

// === Кнопка наверх ===
document.getElementById('toTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
