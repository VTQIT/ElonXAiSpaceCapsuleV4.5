document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;

    function showSlide(index) {
        galleryItems.forEach((item, i) => {
            item.classList.remove('active');
            if (i === index) {
                item.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        showSlide(currentIndex);
    }

    // Initial display
    showSlide(currentIndex);

    // Event Listeners for gallery buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Optional: Auto-play the gallery
    let autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds

    // Pause auto-play on hover
    const galleryContainer = document.querySelector('.gallery-container');
    galleryContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    galleryContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });

    // Simple scroll animation for marketing sections (using Intersection Observer)
    const marketingIntro = document.querySelector('.marketing-intro');
    const callToAction = document.querySelector('.call-to-action');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target); // Unobserve once animated
            }
        });
    }, observerOptions);

    marketingIntro.style.animationPlayState = 'paused';
    callToAction.style.animationPlayState = 'paused';

    observer.observe(marketingIntro);
    observer.observe(callToAction);

    // --- See More/Less Functionality ---
    const toggleMarketingBtn = document.getElementById('toggleMarketingBtn');
    const marketingContentDiv = document.querySelector('.marketing-content');

    toggleMarketingBtn.addEventListener('click', () => {
        marketingContentDiv.classList.toggle('expanded'); // Toggle the 'expanded' class
        if (marketingContentDiv.classList.contains('expanded')) {
            toggleMarketingBtn.textContent = 'See Less';
        } else {
            toggleMarketingBtn.textContent = 'See More';
        }
    });
});
