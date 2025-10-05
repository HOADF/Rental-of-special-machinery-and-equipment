// === Предзагрузка изображений ===
function preloadImages() {
  const urls = [
    'https://source.unsplash.com/1600x900/?excavator,construction',
    'https://source.unsplash.com/1600x900/?bulldozer,construction',
    'https://source.unsplash.com/1600x900/?crane,construction',
    'https://source.unsplash.com/1600x900/?truck,construction',
    'https://source.unsplash.com/1600x900/?loader,construction'
  ];
  urls.forEach(url => { const img = new Image(); img.src = url; });
}
window.addEventListener('load', preloadImages);

// === Плавная прокрутка ===
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) window.scrollTo({ top: target.offsetTop - 100, behavior: 'smooth' });
  });
});

// === Анимации при прокрутке + фиксированная шапка ===
window.addEventListener('scroll', () => {
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
});

// === Кнопка наверх ===
document.getElementById('toTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
