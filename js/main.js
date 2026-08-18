document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    initHamburgerMenu();
    initActiveNavHighlight();
    initFaqAccordion();
    initModal();
    initContentSlider();
});

function initThemeSwitcher() {
    const savedTheme = localStorage.getItem('studenthub-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeToggleBtns = document.querySelectorAll('.theme-btn, .theme-toggle-btn, #theme-toggle');
    
    themeToggleBtns.forEach(btn => {
        updateThemeButtonText(btn, savedTheme);

        btn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('studenthub-theme', newTheme);

            const allBtns = document.querySelectorAll('.theme-btn, .theme-toggle-btn, #theme-toggle');
            allBtns.forEach(b => updateThemeButtonText(b, newTheme));
        });
    });
}

function updateThemeButtonText(btn, theme) {
    if (!btn) return;
    btn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

function initHamburgerMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-btn, #hamburger-btn');
    const navMenu = document.querySelector('header nav');

    if (!hamburgerBtn || !navMenu) return;

    hamburgerBtn.addEventListener('click', () => {
        const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
        hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });
}

function initActiveNavHighlight() {
    const navLinks = document.querySelectorAll('header nav a');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.setAttribute('aria-current', 'page');
            link.classList.add('active');
        } else {
            link.removeAttribute('aria-current');
            link.classList.remove('active');
        }
    });
}

function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const header = item.querySelector('.faq-question');
        if (!header) return;

        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    const answer = otherItem.querySelector('.faq-answer');
                    if (answer) answer.style.maxHeight = null;
                }
            });

            item.classList.toggle('open');
            const answer = item.querySelector('.faq-answer');
            if (answer) {
                if (!isOpen) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = null;
                }
            }
        });
    });
}

function initModal() {
    const openModalBtns = document.querySelectorAll('[data-modal-target]');
    const closeModalBtns = document.querySelectorAll('[data-modal-close]');
    const overlay = document.getElementById('modal-overlay');

    if (openModalBtns.length === 0 && closeModalBtns.length === 0) return;

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-modal-target');
            const modal = document.querySelector(targetId);
            if (modal) openModal(modal, overlay);
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) closeModal(modal, overlay);
        });
    });

    if (overlay) {
        overlay.addEventListener('click', () => {
            const activeModals = document.querySelectorAll('.modal.active');
            activeModals.forEach(modal => closeModal(modal, overlay));
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModals = document.querySelectorAll('.modal.active');
            activeModals.forEach(modal => closeModal(modal, overlay));
        }
    });
}

function openModal(modal, overlay) {
    if (!modal) return;
    modal.classList.add('active');
    if (overlay) overlay.classList.add('active');
}

function closeModal(modal, overlay) {
    if (!modal) return;
    modal.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
}

function initContentSlider() {
    const sliders = document.querySelectorAll('.slider-container');
    if (sliders.length === 0) return;

    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        const prevBtn = slider.querySelector('.slider-btn.prev');
        const nextBtn = slider.querySelector('.slider-btn.next');
        let currentIndex = 0;

        if (slides.length === 0) return;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                showSlide(currentIndex);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                showSlide(currentIndex);
            });
        }
    });
}
