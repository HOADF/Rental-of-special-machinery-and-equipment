// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Обработка формы
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Здесь может быть код для отправки данных на сервер
    // В демо-версии просто показываем alert
    alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
    this.reset();
});

// Добавление дополнительной интерактивности для карточек техники
document.querySelectorAll('.tech__btn').forEach(button => {
    button.addEventListener('click', function() {
        const techName = this.closest('.tech__card').querySelector('h3').textContent;
        alert(`Вы выбрали: ${techName}\nДля завершения заказа с вами свяжется наш менеджер.`);
    });
});
