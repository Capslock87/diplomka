/**
 * Checkout Page Logic
 * Handles form validation, payment type toggle, and simulated checkout flow
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkoutForm');
    if (!form) return; // Only run on checkout page

    // Elements
    const paymentMethods = document.querySelectorAll('input[name="paymentType"]');
    const cardDetails = document.getElementById('cardDetailsWrapper');
    const previewContainer = document.getElementById('checkoutItemsPreview');
    const checkoutTotal = document.getElementById('checkoutTotal');
    const successMsg = document.getElementById('successMessage');
    const checkoutWrapper = document.querySelector('.checkout-wrapper');
    const emptyCheckout = document.getElementById('emptyCheckout');

    // Init page state
    initCheckout();

    function initCheckout() {
        if (!window.Cart || window.Cart.items.length === 0) {
            checkoutWrapper.style.display = 'none';
            emptyCheckout.style.display = 'block';
            return;
        }
        renderPreview();
    }

    // Toggle card details visibility based on payment method
    paymentMethods.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });

    // Format Card Number (space every 4 digits)
    const cardNumInput = document.getElementById('cardNumberInput');
    if (cardNumInput) {
        cardNumInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            if (val.length > 16) val = val.slice(0, 16);
            let formatted = '';
            for (let i = 0; i < val.length; i++) {
                if (i > 0 && i % 4 === 0) formatted += ' ';
                formatted += val[i];
            }
            e.target.value = formatted;
        });
    }

    // Format Expiry (MM/YY)
    const cardExpInput = document.getElementById('cardExpiryInput');
    if (cardExpInput) {
        cardExpInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            if (val.length >= 2) {
                // Formatting logic
                let month = val.substring(0, 2);
                if (parseInt(month) > 12) month = '12';
                if (parseInt(month) === 0) month = '01';
                if (val.length > 2) {
                    val = month + '/' + val.substring(2, 4);
                } else {
                    val = month + (e.inputType === 'deleteContentBackward' ? '' : '/');
                }
            }
            e.target.value = val;
        });
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Simulate processing
            const btn = document.getElementById('submitOrderBtn');
            const originalText = btn.textContent;
            btn.innerHTML = '<span class="loading-spinner" style="padding:0;color:white;">Обработка...</span>';
            btn.disabled = true;

            setTimeout(() => {
                // Success
                checkoutWrapper.style.display = 'none';
                successMsg.style.display = 'block';
                document.querySelector('.page-title').style.display = 'none';

                // Clear cart
                if (window.Cart) window.Cart.clear();
                window.scrollTo(0, 0);
            }, 1500);
        }
    });

    function validateForm() {
        let isValid = true;

        // Reset previous errors
        document.querySelectorAll('.form-group').forEach(el => el.classList.remove('has-error'));

        // Name
        const nameInput = document.getElementById('nameInput');
        if (!nameInput.value.trim() || !/^[A-Za-zА-Яа-яЁё\s]+$/.test(nameInput.value)) {
            setError(nameInput);
            isValid = false;
        }

        // Email
        const emailInput = document.getElementById('emailInput');
        if (!emailInput.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            setError(emailInput);
            isValid = false;
        }

        // Phone
        const phoneInput = document.getElementById('phoneInput');
        const phoneClean = phoneInput.value.replace(/\D/g, '');
        if (phoneClean.length < 10) {
            setError(phoneInput);
            isValid = false;
        }

        // Address
        const addressInput = document.getElementById('addressInput');
        if (addressInput.value.trim().length < 10) {
            setError(addressInput);
            isValid = false;
        }

        // Checking payment selected
        const isCardDetailsRequired = document.querySelector('input[name="paymentType"]:checked').value === 'card';

        if (isCardDetailsRequired) {
            // Card Num
            if (cardNumInput.value.replace(/\s/g, '').length !== 16) {
                setError(cardNumInput);
                isValid = false;
            }

            // Expiry
            if (cardExpInput.value.length !== 5) {
                setError(cardExpInput);
                isValid = false;
            } else {
                // Further loose check (month/year logic is partially in input formatter)
                const [m, y] = cardExpInput.value.split('/');
                const currentYearStr = new Date().getFullYear().toString().slice(-2);
                if (parseInt(y) < parseInt(currentYearStr)) {
                    setError(cardExpInput);
                    isValid = false;
                }
            }

            // CVV
            const cvvInput = document.getElementById('cardCvvInput');
            if (!cvvInput.value || cvvInput.value.length < 3 || !/^\d{3}$/.test(cvvInput.value)) {
                setError(cvvInput);
                isValid = false;
            }
        }

        if (!isValid) {
            window.showToast('Пожалуйста, проверьте правильность заполнения полей', 'error');
        }

        return isValid;
    }

    function setError(input) {
        input.closest('.form-group').classList.add('has-error');
    }

    function renderPreview() {
        if (!window.Cart) return;

        const html = window.Cart.items.map(item => `
            <div class="preview-item">
                <img src="${item.image}" alt="${item.name}" class="preview-img">
                <div class="preview-info">
                    <div class="preview-title">${item.name}</div>
                    <div class="preview-meta">Размер: ${item.size}</div>
                    <div class="preview-meta">Кол-во: ${item.quantity}</div>
                    <div class="preview-price">${window.formatPrice(item.price * item.quantity)}</div>
                </div>
            </div>
        `).join('');

        previewContainer.innerHTML = html;
        checkoutTotal.textContent = window.formatPrice(window.Cart.getTotalPrice());
    }
});
