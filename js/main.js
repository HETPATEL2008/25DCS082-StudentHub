document.addEventListener('DOMContentLoaded', () => {
    initThemeSwitcher();
    initHamburgerMenu();
    initActiveNavHighlight();
    initFaqAccordion();
    initModal();
    initContentSlider();
    initRegisterValidation();

    if (document.getElementById('faq-container') || document.getElementById('faqs-container')) {
        initFaqsPage();
    }

    if (document.getElementById('events-container')) {
        initEventsPage();
    }

    if (document.getElementById('resources-container')) {
        initResourcesPage();
    }
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
    document.addEventListener('click', (e) => {
        const header = e.target.closest('.faq-question');
        if (!header) return;

        const item = header.closest('.faq-item');
        if (!item) return;

        const isOpen = item.classList.contains('open');
        const parentContainer = item.parentElement;

        if (parentContainer) {
            const siblingItems = parentContainer.querySelectorAll('.faq-item');
            siblingItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    const answer = otherItem.querySelector('.faq-answer');
                    if (answer) answer.style.maxHeight = null;
                }
            });
        }

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
        if (!input) return;
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
        if (!field.input) return true;
        const value = field.input.value.trim();
        const isValid = field.pattern.test(value);
        setFieldState(field.input, field.error, isValid, field.message);
        return isValid;
    }

    function validateConfirmPassword() {
        if (!confirmPasswordInput) return true;
        const isValid =
            confirmPasswordInput.value.length > 0 &&
            confirmPasswordInput.value === fields.password.input.value;
        setFieldState(confirmPasswordInput, confirmPasswordError, isValid, 'Passwords do not match.');
        return isValid;
    }

    function validateSelect(select, errorEl, message) {
        if (!select) return true;
        const isValid = select.value !== '';
        setFieldState(select, errorEl, isValid, message);
        return isValid;
    }

    function validateGender() {
        if (genderInputs.length === 0) return true;
        const isValid = Array.from(genderInputs).some((r) => r.checked);
        if (genderError) genderError.textContent = isValid ? '' : 'Please select a gender.';
        return isValid;
    }

    function validateTerms() {
        if (!termsInput) return true;
        const isValid = termsInput.checked;
        if (termsError) termsError.textContent = isValid ? '' : 'You must accept the terms and conditions.';
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
        if (!fields.password.input || !pwStrengthBar || !pwStrengthText) return;
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
        if (!field.input) return;
        field.input.addEventListener('input', () => {
            validateField(key);
            if (key === 'password') {
                updateStrengthMeter();
                if (confirmPasswordInput && confirmPasswordInput.value) validateConfirmPassword();
            }
        });
        field.input.addEventListener('blur', () => validateField(key));
    });

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', validateConfirmPassword);
        confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    }

    if (courseSelect) courseSelect.addEventListener('change', () => validateSelect(courseSelect, courseError, 'Please select a course.'));
    if (yearSelect) yearSelect.addEventListener('change', () => validateSelect(yearSelect, yearError, 'Please select a year.'));
    genderInputs.forEach((radio) => radio.addEventListener('change', validateGender));
    if (termsInput) termsInput.addEventListener('change', validateTerms);

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (formSuccess) {
            formSuccess.textContent = '';
            formSuccess.className = '';
        }

        const results = Object.keys(fields).map(validateField);
        results.push(validateConfirmPassword());
        results.push(validateSelect(courseSelect, courseError, 'Please select a course.'));
        results.push(validateSelect(yearSelect, yearError, 'Please select a year.'));
        results.push(validateGender());
        results.push(validateTerms());

        const allValid = results.every(Boolean);

        if (allValid) {
            if (formSuccess) {
                formSuccess.textContent = 'All fields look good — form is ready to submit to the server.';
                formSuccess.classList.add('form-success-ok');
            }
        } else {
            if (formSuccess) {
                formSuccess.textContent = 'Please fix the highlighted fields above.';
                formSuccess.classList.add('form-success-error');
            }
            const firstInvalid = registerForm.querySelector('.input-invalid, input:invalid');
            if (firstInvalid) firstInvalid.focus();
        }
    });
}

async function initFaqsPage() {
    const container = document.getElementById('faq-container') || document.getElementById('faqs-container');
    const statusEl = document.getElementById('faq-status') || document.getElementById('faqs-status');

    if (!container) return;

    try {
        if (statusEl) {
            statusEl.textContent = 'Loading FAQs...';
            statusEl.style.display = 'block';
        }

        const response = await fetch('data/faqs.json');
        if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
        
        const faqs = await response.json();

        if (statusEl) statusEl.style.display = 'none';

        if (!faqs || faqs.length === 0) {
            container.innerHTML = '<p class="fetch-status">No FAQs available right now.</p>';
            return;
        }

        container.innerHTML = faqs.map(faq => `
            <div class="faq-item">
                <button class="faq-question" type="button">
                    <span>${escapeHTML(faq.question)}</span>
                    <span class="faq-icon">+</span>
                </button>
                <div class="faq-answer">
                    <p>${escapeHTML(faq.answer)}</p>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error fetching FAQs:', error);
        if (statusEl) {
            statusEl.textContent = 'Failed to load FAQs.';
            statusEl.className = 'fetch-status fetch-error';
        }
    }
}

function initEventsPage() {
    let allEvents = [];
    let currentPage = 1;
    const itemsPerPage = 4;

    const searchInput = document.getElementById('event-search');
    const categorySelect = document.getElementById('event-category');
    const sortSelect = document.getElementById('event-sort');
    const statusEl = document.getElementById('events-status');
    const container = document.getElementById('events-container');
    const paginationEl = document.getElementById('events-pagination');
    const form = document.getElementById('events-controls');

    async function loadEvents() {
        try {
            if (statusEl) {
                statusEl.textContent = 'Loading campus events...';
                statusEl.className = 'fetch-status';
                statusEl.style.display = 'block';
            }

            const response = await fetch('data/events.json');
            if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
            allEvents = await response.json();

            if (statusEl) statusEl.style.display = 'none';
            render();
        } catch (error) {
            console.error('Error fetching events:', error);
            if (statusEl) {
                statusEl.textContent = 'Failed to load events. Please verify network or JSON location.';
                statusEl.className = 'fetch-status fetch-error';
            }
        }
    }

    function processEvents() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const category = categorySelect ? categorySelect.value : '';
        const sort = sortSelect ? sortSelect.value : '';

        let filtered = allEvents.filter(event => {
            const matchesSearch = !query || 
                event.title.toLowerCase().includes(query) || 
                event.description.toLowerCase().includes(query);
            const matchesCategory = !category || event.category === category;
            return matchesSearch && matchesCategory;
        });

        filtered.sort((a, b) => {
            if (sort === 'date-asc') return new Date(a.date) - new Date(b.date);
            if (sort === 'date-desc') return new Date(b.date) - new Date(a.date);
            if (sort === 'title-asc') return a.title.localeCompare(b.title);
            if (sort === 'title-desc') return b.title.localeCompare(a.title);
            return 0;
        });

        return filtered;
    }

    function render() {
        if (!container) return;

        const processed = processEvents();
        const totalPages = Math.ceil(processed.length / itemsPerPage) || 1;

        if (currentPage > totalPages) currentPage = totalPages;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const pageItems = processed.slice(startIndex, startIndex + itemsPerPage);

        if (pageItems.length === 0) {
            container.innerHTML = '<p class="fetch-status">No events match your search criteria.</p>';
        } else {
            container.innerHTML = pageItems.map(item => `
                <article class="data-card">
                    <span class="badge badge-${escapeHTML(item.category)}">${escapeHTML(item.category)}</span>
                    <h3>${escapeHTML(item.title)}</h3>
                    <p>${escapeHTML(item.description)}</p>
                    <time datetime="${escapeHTML(item.date)}">🗓️ ${formatDate(item.date)}</time>
                </article>
            `).join('');
        }

        renderPagination(paginationEl, totalPages, currentPage, (newPage) => {
            currentPage = newPage;
            render();
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            currentPage = 1;
            render();
        });
    }

    if (searchInput) searchInput.addEventListener('input', () => { currentPage = 1; render(); });
    if (categorySelect) categorySelect.addEventListener('change', () => { currentPage = 1; render(); });
    if (sortSelect) sortSelect.addEventListener('change', () => { currentPage = 1; render(); });

    loadEvents();
}

function initResourcesPage() {
    let allResources = [];
    let currentPage = 1;
    const itemsPerPage = 6;

    const searchInput = document.getElementById('resource-search');
    const subjectSelect = document.getElementById('subject-filter');
    const sortSelect = document.getElementById('resource-sort');
    const statusEl = document.getElementById('resources-status');
    const container = document.getElementById('resources-container');
    const paginationEl = document.getElementById('resources-pagination');
    const form = document.getElementById('resources-controls');

    async function loadResources() {
        try {
            if (statusEl) {
                statusEl.textContent = 'Loading learning resources...';
                statusEl.className = 'fetch-status';
                statusEl.style.display = 'block';
            }

            const response = await fetch('data/resources.json');
            if (!response.ok) throw new Error(`HTTP error status: ${response.status}`);
            allResources = await response.json();

            if (statusEl) statusEl.style.display = 'none';
            render();
        } catch (error) {
            console.error('Error fetching resources:', error);
            if (statusEl) {
                statusEl.textContent = 'Failed to load study resources.';
                statusEl.className = 'fetch-status fetch-error';
            }
        }
    }

    function processResources() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const subject = subjectSelect ? subjectSelect.value.toLowerCase() : '';
        const sort = sortSelect ? sortSelect.value : '';

        let filtered = allResources.filter(res => {
            const matchesSearch = !query || 
                res.name.toLowerCase().includes(query) || 
                res.subjectName.toLowerCase().includes(query);
            const matchesSubject = !subject || res.subjectCode.toLowerCase() === subject;
            return matchesSearch && matchesSubject;
        });

        filtered.sort((a, b) => {
            if (sort === 'name-asc') return a.name.localeCompare(b.name);
            if (sort === 'name-desc') return b.name.localeCompare(a.name);
            if (sort === 'subject-asc') return a.subjectName.localeCompare(b.subjectName);
            if (sort === 'subject-desc') return b.subjectName.localeCompare(a.subjectName);
            return 0;
        });

        return filtered;
    }

    function render() {
        if (!container) return;

        const processed = processResources();
        const totalPages = Math.ceil(processed.length / itemsPerPage) || 1;

        if (currentPage > totalPages) currentPage = totalPages;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const pageItems = processed.slice(startIndex, startIndex + itemsPerPage);

        if (pageItems.length === 0) {
            container.innerHTML = '<p class="fetch-status">No resources found matching your query.</p>';
        } else {
            container.innerHTML = pageItems.map(item => `
                <div class="data-card">
                    <span class="badge badge-technical">${escapeHTML(item.subjectCode.toUpperCase())}</span>
                    <h3>${escapeHTML(item.name)}</h3>
                    <p><strong>Subject:</strong> ${escapeHTML(item.subjectName)}</p>
                    <a href="${escapeHTML(item.url)}" class="btn btn-primary" style="margin-top:0.5rem; display:inline-block;" download>Download File</a>
                </div>
            `).join('');
        }

        renderPagination(paginationEl, totalPages, currentPage, (newPage) => {
            currentPage = newPage;
            render();
        });
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            currentPage = 1;
            render();
        });
    }

    if (searchInput) searchInput.addEventListener('input', () => { currentPage = 1; render(); });
    if (subjectSelect) subjectSelect.addEventListener('change', () => { currentPage = 1; render(); });
    if (sortSelect) sortSelect.addEventListener('change', () => { currentPage = 1; render(); });

    loadResources();
}

function renderPagination(container, totalPages, currentPage, onPageChange) {
    if (!container) return;
    if (totalPages <= 1) {
        container.innerHTML = '';
        return;
    }

    let buttonsHTML = `<button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">Previous</button>`;

    for (let i = 1; i <= totalPages; i++) {
        buttonsHTML += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
    }

    buttonsHTML += `<button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">Next</button>`;

    container.innerHTML = buttonsHTML;

    container.querySelectorAll('.pagination-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPage = parseInt(btn.getAttribute('data-page'), 10);
            if (targetPage >= 1 && targetPage <= totalPages) {
                onPageChange(targetPage);
            }
        });
    });
}

function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}
