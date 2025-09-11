// Функция для предзагрузки изображений
function preloadImages() {
    const imageUrls = [
        'https://source.unsplash.com/1600x900/?excavator,construction',
        'https://source.unsplash.com/1600x900/?bulldozer,construction',
        'https://source.unsplash.com/1600x900/?crane,construction',
        'https://source.unsplash.com/1600x900/?truck,construction',
        'https://source.unsplash.com/1600x900/?loader,construction'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Запуск предзагрузки при загрузке страницы
window.addEventListener('load', preloadImages);

// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
        });
    });
});

// Добавление класса для фиксированной навигации при прокрутке
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Дополнительные стили для фиксированной навигации
const style = document.createElement('style');
style.textContent = `
    header.sticky {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    
    body.with-sticky-header {
        padding-top: 100px;
    }
`;
document.head.appendChild(style);

// Добавление отступа к body при фиксированной навигации
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const body = document.querySelector('body');
    
    if (window.scrollY > 100) {
        body.classList.add('with-sticky-header');
    } else {
        body.classList.remove('with-sticky-header');
    }
});

// Анимация появления элементов при прокрутке
function animateOnScroll() {
    const elements = document.querySelectorAll('.technic-item, section');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (position < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
}

// Установка начальных стилей для анимации
document.querySelectorAll('.technic-item, section').forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Запуск анимации при загрузке и прокрутке
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);
