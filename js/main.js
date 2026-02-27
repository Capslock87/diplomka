/**
 * Main application logic
 * Handles mobile menu, year updating, and general utilities
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');

            // Transform hamburger to cross
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mainNav.classList.contains('active')) {
                spans[0].style.transform = 'translateY(7px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // 2. Update current year in footer
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
});

/**
 * Utility: format price
 * @param {number} price 
 * @returns {string} Formatted price with currency symbol
 */
window.formatPrice = (price) => {
    return price.toLocaleString('ru-RU') + ' ₽';
};

/**
 * Utility: show a toast notification
 */
window.showToast = (message, type = 'success') => {
    // Create toast element
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = type === 'success' ? 'var(--success)' : 'var(--error)';
    toast.style.color = '#fff';
    toast.style.padding = '1rem 2rem';
    toast.style.borderRadius = 'var(--radius)';
    toast.style.boxShadow = 'var(--shadow-lg)';
    toast.style.zIndex = '1000';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    toast.textContent = message;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);

    // Animate out and remove
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};
