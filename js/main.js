document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    initHamburgerMenu();
    initActiveNavHighlight();
    initFaqAccordion();
    initModal();
    initContentSlider();
    initRegisterValidation();
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

/* ==========================================================
   Practical 5 — Registration form validation
   Regex validation, live errors near each field, password
   strength meter. Runs only when #register-form exists.
   ========================================================== */
function initRegisterValidation() {
    const registerForm = document.getElementById('register-form');
    if (!registerForm) return;

    const fields = {
        fullname: {
            input: document.getElementById('fullname'),
            error: document.getElementById('err-fullname'),
            pattern: /^[A-Za-z ]{3,50}$/,
            message: 'Enter a name with 3–50 letters (spaces allowed, no numbers or symbols).'
        },
        email: {
            input: document.getElementById('email'),
            error: document.getElementById('err-email'),
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            message: 'Enter a valid email address, e.g. name@example.com.'
        },
        mobile: {
            input: document.getElementById('mobile'),
            error: document.getElementById('err-mobile'),
            pattern: /^[6-9]\d{9}$/,
            message: 'Enter a valid 10-digit mobile number (starts with 6–9).'
        },
        idno: {
            input: document.getElementById('idno'),
            error: document.getElementById('err-idno'),
            pattern: /^[A-Za-z0-9]{4,15}$/,
            message: 'ID number must be 4–15 letters/numbers only.'
        },
        password: {
            input: document.getElementById('password'),
            error: document.getElementById('err-password'),
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
            message: 'Password needs 8+ characters, an uppercase letter, a lowercase letter, a number, and a symbol.'
        }
    };

    const confirmPasswordInput = document.getElementById('confirm-password');
    const confirmPasswordError = document.getElementById('err-confirm-password');
    const courseSelect = document.getElementById('course');
    const courseError = document.getElementById('err-course');
    const yearSelect = document.getElementById('year');
    const yearError = document.getElementById('err-year');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const genderError = document.getElementById('err-gender');
    const termsInput = document.getElementById('terms');
    const termsError = document.getElementById('err-terms');
    const formSuccess = document.getElementById('form-success');

    const pwStrengthBar = document.getElementById('pw-strength-bar');
    const pwStrengthText = document.getElementById('pw-strength-text');

    function setFieldState(input, errorEl, isValid, message) {
        if (isValid) {
            input.classList.remove('input-invalid');
            input.setAttribute('aria-invalid', 'false');
            if (errorEl) errorEl.textContent = '';
        } else {
            input.classList.add('input-invalid');
            input.setAttribute('aria-invalid', 'true');
            if (errorEl) errorEl.textContent = message;
        }
    }

    function validateField(key) {
        const field = fields[key];
        const value = field.input.value.trim();
        const isValid = field.pattern.test(value);
        setFieldState(field.input, field.error, isValid, field.message);
        return isValid;
    }

    function validateConfirmPassword() {
        const isValid =
            confirmPasswordInput.value.length > 0 &&
            confirmPasswordInput.value === fields.password.input.value;
        setFieldState(confirmPasswordInput, confirmPasswordError, isValid, 'Passwords do not match.');
        return isValid;
    }

    function validateSelect(select, errorEl, message) {
        const isValid = select.value !== '';
        setFieldState(select, errorEl, isValid, message);
        return isValid;
    }

    function validateGender() {
        const isValid = Array.from(genderInputs).some((r) => r.checked);
        genderError.textContent = isValid ? '' : 'Please select a gender.';
        return isValid;
    }

    function validateTerms() {
        const isValid = termsInput.checked;
        termsError.textContent = isValid ? '' : 'You must accept the terms and conditions.';
        return isValid;
    }

    function getPasswordStrength(value) {
        let score = 0;
        if (value.length >= 8) score++;
        if (/[a-z]/.test(value)) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/\d/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value)) score++;
        return score;
    }

    function updateStrengthMeter() {
        const value = fields.password.input.value;
        const score = getPasswordStrength(value);

        let label = '';
        let widthPercent = 0;
        let color = '#d1d5db';

        if (value.length === 0) {
            label = '';
            widthPercent = 0;
        } else if (score <= 2) {
            label = 'Weak';
            widthPercent = 33;
            color = '#dc2626';
        } else if (score <= 4) {
            label = 'Medium';
            widthPercent = 66;
            color = '#d97706';
        } else {
            label = 'Strong';
            widthPercent = 100;
            color = '#16a34a';
        }

        pwStrengthBar.style.width = widthPercent + '%';
        pwStrengthBar.style.background = color;
        pwStrengthText.textContent = label;
        pwStrengthText.style.color = color;
    }

    Object.keys(fields).forEach((key) => {
        const field = fields[key];
        field.input.addEventListener('input', () => {
            validateField(key);
            if (key === 'password') {
                updateStrengthMeter();
                if (confirmPasswordInput.value) validateConfirmPassword();
            }
        });
        field.input.addEventListener('blur', () => validateField(key));
    });

    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);

    courseSelect.addEventListener('change', () =>
        validateSelect(courseSelect, courseError, 'Please select a course.'));
    yearSelect.addEventListener('change', () =>
        validateSelect(yearSelect, yearError, 'Please select a year.'));
    genderInputs.forEach((radio) => radio.addEventListener('change', validateGender));
    termsInput.addEventListener('change', validateTerms);

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        formSuccess.textContent = '';
        formSuccess.className = '';

        const results = Object.keys(fields).map(validateField);
        results.push(validateConfirmPassword());
        results.push(validateSelect(courseSelect, courseError, 'Please select a course.'));
        results.push(validateSelect(yearSelect, yearError, 'Please select a year.'));
        results.push(validateGender());
        results.push(validateTerms());

        const allValid = results.every(Boolean);

        if (allValid) {
            formSuccess.textContent = 'All fields look good — form is ready to submit to the server.';
            formSuccess.classList.add('form-success-ok');
        } else {
            formSuccess.textContent = 'Please fix the highlighted fields above.';
            formSuccess.classList.add('form-success-error');
            const firstInvalid = registerForm.querySelector('.input-invalid, input:invalid');
            if (firstInvalid) firstInvalid.focus();
        }
    });
}
