// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider
    initSlider();
    
    // Initialize technique modal
    initTechniqueModal();
    
    // Initialize category filtering
    initCategoryFilter();
    
    // Initialize modals
    initModals();
});

// Slider functionality
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentSlide = 0;
    let slideInterval;

    // Create dots for each slide
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    // Function to go to a specific slide
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Reset the auto slide timer
        resetInterval();
    }

    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Auto slide
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Reset interval
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Event listeners for buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    // Start auto sliding
    startInterval();
}

// Technique modal functionality
function initTechniqueModal() {
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const techniqueModal = document.getElementById('technique-modal');
    const techniqueModalContent = document.querySelector('.technique-modal-content');
    const closeModalButtons = document.querySelectorAll('.close-modal');

    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.technique-card');
            const imageSrc = card.querySelector('img').src;
            const title = card.querySelector('h3').textContent;
            const specs = card.querySelectorAll('.spec');
            const price = card.querySelector('.price').textContent;
            
            // Create modal content
            techniqueModalContent.innerHTML = `
                <div class="technique-modal-image">
                    <img src="${imageSrc}" alt="${title}">
                </div>
                <div class="technique-modal-details">
                    <h3>${title}</h3>
                    <div class="technique-modal-specs">
                        ${Array.from(specs).map(spec => `
                            <div class="spec">
                                ${spec.innerHTML}
                            </div>
                        `).join('')}
                    </div>
                    <div class="technique-modal-price">${price}</div>
                    <button class="rent-btn">Арендовать</button>
                </div>
            `;
            
            // Add event listener to the rent button in the modal
            techniqueModalContent.querySelector('.rent-btn').addEventListener('click', function() {
                techniqueModal.classList.remove('active');
                document.getElementById('callback-modal').classList.add('active');
            });
            
            // Show the modal
            techniqueModal.classList.add('active');
        });
    });

    // Close modal when clicking on close button
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            techniqueModal.classList.remove('active');
        });
    });

    // Close modal when clicking outside the modal content
    techniqueModal.addEventListener('click', function(e) {
        if (e.target === techniqueModal) {
            techniqueModal.classList.remove('active');
        }
    });
}

// Category filtering functionality
function initCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const techniqueCards = document.querySelectorAll('.technique-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.textContent;
            
            // Filter technique cards
            techniqueCards.forEach(card => {
                if (category === 'Вся техника') {
                    card.style.display = 'block';
                } else {
                    const cardTitle = card.querySelector('h3').textContent;
                    if (cardTitle.includes(category)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Modal functionality
function initModals() {
    const callbackModal = document.getElementById('callback-modal');
    const callbackButtons = document.querySelectorAll('.callback-btn, .rent-btn');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const ctaForm = document.querySelector('.cta-form');
    
    // Open callback modal
    callbackButtons.forEach(button => {
        button.addEventListener('click', function() {
            callbackModal.classList.add('active');
        });
    });
    
    // Close modals
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            callbackModal.classList.remove('active');
        });
    });
    
    // Close modal when clicking outside
    callbackModal.addEventListener('click', function(e) {
        if (e.target === callbackModal) {
            callbackModal.classList.remove('active');
        }
    });
    
    // Form submission
    ctaForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в течение 15 минут.');
        this.reset();
    });
    
    document.querySelector('#callback-modal form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Спасибо! Мы перезвоним вам в ближайшее время.');
        callbackModal.classList.remove('active');
        this.reset();
    });
}
