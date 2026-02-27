
document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('cartItemsList');
    if (!list) return; // Only run on cart page

    const emptyMsg = document.getElementById('emptyCartMessage');
    const summary = document.getElementById('cartSummary');

    const sumCount = document.getElementById('summaryCount');
    const sumPrice = document.getElementById('summaryPrice');
    const sumTotal = document.getElementById('summaryTotal');

    function renderCart() {
        if (!window.Cart) return;

        const items = window.Cart.items;

        if (items.length === 0) {
            list.style.display = 'none';
            summary.style.display = 'none';
            emptyMsg.style.display = 'block';
            return;
        }

        list.style.display = 'block';
        summary.style.display = 'block';
        emptyMsg.style.display = 'none';

        const html = items.map((item, index) => `
            <div class="cart-item" data-id="${item.id}" data-size="${item.size}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-header">
                        <div class="cart-item-title">${item.name}</div>
                        <button class="cart-item-remove" aria-label="Удалить товар">&times;</button>
                    </div>
                    <div class="cart-item-details">
                        Размер: ${item.size}
                    </div>
                    <div class="cart-item-bottom">
                        <div class="quantity-control">
                            <button class="qty-btn qty-minus" aria-label="Уменьшить">-</button>
                            <input type="number" class="qty-input" value="${item.quantity}" min="1" max="99">
                            <button class="qty-btn qty-plus" aria-label="Увеличить">+</button>
                        </div>
                        <div class="cart-item-price">${window.formatPrice(item.price * item.quantity)}</div>
                    </div>
                </div>
            </div>
        `).join('');

        list.innerHTML = html;
        updateSummary();
        bindEvents();
    }

    function updateSummary() {
        if (!window.Cart) return;
        const totalItems = window.Cart.items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = window.Cart.getTotalPrice();

        if (sumCount) sumCount.textContent = totalItems;
        if (sumPrice) sumPrice.textContent = window.formatPrice(totalPrice);
        if (sumTotal) sumTotal.textContent = window.formatPrice(totalPrice); // No discount for now
    }

    function bindEvents() {
        // Quantity changes
        const minusBtns = list.querySelectorAll('.qty-minus');
        const plusBtns = list.querySelectorAll('.qty-plus');
        const qtyInputs = list.querySelectorAll('.qty-input');
        const removeBtns = list.querySelectorAll('.cart-item-remove');

        minusBtns.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                const itemEl = btn.closest('.cart-item');
                const id = itemEl.getAttribute('data-id');
                const size = itemEl.getAttribute('data-size');
                const input = qtyInputs[idx];

                let val = parseInt(input.value) || 1;
                if (val > 1) {
                    val--;
                    window.Cart.updateQuantity(id, size, val);
                    renderCart(); // Re-render to update prices
                }
            });
        });

        plusBtns.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                const itemEl = btn.closest('.cart-item');
                const id = itemEl.getAttribute('data-id');
                const size = itemEl.getAttribute('data-size');
                const input = qtyInputs[idx];

                let val = parseInt(input.value) || 1;
                if (val < 99) {
                    val++;
                    window.Cart.updateQuantity(id, size, val);
                    renderCart();
                }
            });
        });

        qtyInputs.forEach((input) => {
            input.addEventListener('change', () => {
                const itemEl = input.closest('.cart-item');
                const id = itemEl.getAttribute('data-id');
                const size = itemEl.getAttribute('data-size');

                let val = parseInt(input.value);
                if (isNaN(val) || val < 1) val = 1;
                if (val > 99) val = 99;

                window.Cart.updateQuantity(id, size, val);
                renderCart();
            });
        });

        // Removal
        removeBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                const itemEl = btn.closest('.cart-item');
                const id = itemEl.getAttribute('data-id');
                const size = itemEl.getAttribute('data-size');

                // Add fade out animation class or inline style
                itemEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                itemEl.style.opacity = '0';
                itemEl.style.transform = 'translateX(-20px)';

                setTimeout(() => {
                    window.Cart.removeItem(id, size);
                    renderCart();
                }, 300);
            });
        });
    }

    // Listen for global cart updates
    document.addEventListener('cartUpdated', () => {
        // Avoid recursive re-rendering if this local script triggered it via renderCart() mostly,
        // but it's safe since we clear DOM and rebuild.
        // Actually, renderCart calls updateQuantity which triggers save() -> cartUpdated...
        // so to avoid loops, only listen for updates from outside if needed.
        // The simplest solution is just initial render.
    });

    // Initial render
    renderCart();
});
