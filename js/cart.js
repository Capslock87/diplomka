/**
 * Global Cart Logic
 * Handles localStorage state, adding items, and updating the cart badge
 */

class ShoppingCart {
    constructor() {
        this.items = [];
        this.init();
    }

    init() {
        // Load from localStorage
        const saved = localStorage.getItem('lumina_cart');
        if (saved) {
            try {
                this.items = JSON.parse(saved);
            } catch (e) {
                this.items = [];
            }
        }

        // Initial badge update
        this.updateBadge();
    }

    save() {
        localStorage.setItem('lumina_cart', JSON.stringify(this.items));
        this.updateBadge();
        // Dispatch custom event for page-specific JS to react
        document.dispatchEvent(new CustomEvent('cartUpdated', { detail: this.items }));
    }

    updateBadge() {
        const badge = document.getElementById('cartBadge');
        if (badge) {
            const totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
            badge.textContent = totalQuantity;
            badge.style.display = totalQuantity > 0 ? 'inline-block' : 'none';
        }
    }

    addItem(product, size, quantity = 1) {
        if (!size) {
            if (window.showToast) window.showToast(translations[window.currentLang].selectSizeError, 'error');
            return false;
        }

        // Check if item with same id and size exists
        const existingItem = this.items.find(item => item.id === product.id && item.size === size);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                size: size,
                quantity: quantity
            });
        }

        this.save();
        if (window.showToast) window.showToast(translations[window.currentLang].addedToCartToast);
        return true;
    }

    removeItem(productId, size) {
        this.items = this.items.filter(item => !(item.id === productId && item.size === size));
        this.save();
    }

    updateQuantity(productId, size, newQuantity) {
        if (newQuantity < 1) return;

        const item = this.items.find(item => item.id === productId && item.size === size);
        if (item) {
            item.quantity = newQuantity;
            this.save();
        }
    }

    clear() {
        this.items = [];
        this.save();
    }

    getTotalPrice() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    /**
     * Helper to init "Add to Cart" buttons dynamically added to the DOM
     */
    initAddToCartButtons(container = document) {
        const buttons = container.querySelectorAll('.add-to-cart-btn');
        buttons.forEach(btn => {
            // Remove old listener to prevent duplicates if re-rendered
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = newBtn.getAttribute('data-id');
                const product = window.getProductById(productId);

                if (product) {
                    // Default to first size if added from catalog
                    const size = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'One Size';
                    this.addItem(product, size, 1);
                }
            });
        });
    }
}

// Instantiate globally
window.Cart = new ShoppingCart();

// Initialize buttons on page load
document.addEventListener('DOMContentLoaded', () => {
    window.Cart.initAddToCartButtons();
});
