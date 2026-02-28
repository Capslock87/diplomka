/**
 * Catalog Page Logic
 * Renders products, handles filtering and sorting
 */

document.addEventListener('DOMContentLoaded', () => {
    // Only run on catalog page
    const grid = document.getElementById('catalogProductsGrid');
    if (!grid) return;

    const noProductsMsg = document.getElementById('noProductsMessage');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceSort = document.getElementById('priceSort');
    const resetBtn = document.getElementById('resetFiltersBtn');

    let currentProducts = [...products]; // Copy from global products array

    function renderProducts() {
        if (!grid) return;

        grid.innerHTML = '';

        if (currentProducts.length === 0) {
            grid.style.display = 'none';
            noProductsMsg.style.display = 'block';
            return;
        }

        grid.style.display = 'grid';
        noProductsMsg.style.display = 'none';

        const html = currentProducts.map(product => `
            <div class="product-card">
                <a href="product.html?id=${product.id}" class="product-link">
                    <div class="product-img-wrap">
                        <img src="${product.image}" alt="${window.getLocalizedName(product)}" class="product-img" loading="lazy">
                    </div>
                    <div class="product-info">
                        <span class="product-category" data-i18n="${product.category === 'men' ? 'categoryMen' : 'categoryWomen'}">${translations[window.currentLang][product.category === 'men' ? 'categoryMen' : 'categoryWomen']}</span>
                        <h3 class="product-name">${window.getLocalizedName(product)}</h3>
                        <div class="product-price">${window.formatPrice(product.price)}</div>
                    </div>
                </a>
                <button class="btn btn-primary btn-block add-to-cart-btn" data-id="${product.id}" data-i18n="addToCart">${translations[window.currentLang].addToCart}</button>
            </div>
        `).join('');

        grid.innerHTML = html;

        // Re-bind Add to Cart buttons for newly rendered elements
        if (window.Cart) {
            window.Cart.initAddToCartButtons(grid);
        }
    }

    function applyFiltersAndSort() {
        let filtered = [...products];

        // 1. Filter by category
        const category = categoryFilter.value;
        if (category !== 'all') {
            filtered = filtered.filter(p => p.category === category);
        }

        // 2. Sort by price
        const sort = priceSort.value;
        if (sort === 'asc') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sort === 'desc') {
            filtered.sort((a, b) => b.price - a.price);
        }
        // If 'default', leave as is in the original array order

        currentProducts = filtered;
        renderProducts();
    }

    // Event Listeners
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFiltersAndSort);
    }

    if (priceSort) {
        priceSort.addEventListener('change', applyFiltersAndSort);
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            categoryFilter.value = 'all';
            priceSort.value = 'default';
            applyFiltersAndSort();
        });
    }

    // Initial render
    // Simulate slight network delay for effect, but it's local
    setTimeout(() => {
        renderProducts();
    }, 400);

    // Re-render when language changes
    document.addEventListener('languageChanged', renderProducts);

});
