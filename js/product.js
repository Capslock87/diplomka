/**
 * Single Product Page Logic
 * Reads '?id=' param from URL and renders the product
 */

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('productDetailsContainer');
    const notFound = document.getElementById('productNotFound');
    const bcName = document.getElementById('bcProductName');

    if (!container) return; // Only run on product page

    // Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId || typeof products === 'undefined') {
        showNotFound();
        return;
    }

    const product = window.getProductById(productId);

    if (!product) {
        showNotFound();
        return;
    }

    // Render Product
    renderProductDetails(product);

    function showNotFound() {
        container.style.display = 'none';
        if (notFound) notFound.style.display = 'block';
    }

    function renderProductDetails(product) {
        if (bcName) bcName.textContent = window.getLocalizedName(product);
        document.title = `Lumina - ${window.getLocalizedName(product)}`;

        const sizesHtml = product.sizes && product.sizes.length > 0 ? `
            <div class="product-sizes">
                <div class="sizes-title" data-i18n="productSize">${translations[window.currentLang].productSize}</div>
                <div class="sizes-grid" id="productSizeGrid">
                    ${product.sizes.map((s, index) => `<button class="size-btn ${index === 0 ? 'selected' : ''}" data-size="${s}">${s}</button>`).join('')}
                </div>
                <div class="size-error" id="sizeError" data-i18n="selectSizeError">${translations[window.currentLang].selectSizeError}</div>
            </div>
        ` : '';

        const html = `
            <div class="product-details" style="opacity: 0; transition: opacity 0.3s ease">
                <div class="product-gallery">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                
                <div class="product-info-full">
                    <h1 class="product-name">${window.getLocalizedName(product)}</h1>
                    <div class="product-price">${window.formatPrice(product.price)}</div>
                    
                    <div class="product-description">
                        <p>${window.getLocalizedDesc(product)}</p>
                    </div>
                    
                    ${sizesHtml}
                    
                    <button class="btn btn-primary btn-large" id="addToCartBtn" data-i18n="addToCart">${translations[window.currentLang].addToCart}</button>
                    
                    <div style="margin-top: 2rem;">
                        <ul style="list-style: disc; padding-left: 1.5rem; color: var(--text-muted); font-size: 0.875rem;">
                            <li data-i18n="freeDelivery">${translations[window.currentLang].freeDelivery}</li>
                            <li data-i18n="returnPolicy">${translations[window.currentLang].returnPolicy}</li>
                            <li data-i18n="qualityGuarantee">${translations[window.currentLang].qualityGuarantee}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Fade in
        setTimeout(() => {
            const detailsElement = container.querySelector('.product-details');
            if (detailsElement) detailsElement.style.opacity = '1';
        }, 50);

        // Bind events
        bindProductEvents(product);
    }

    function bindProductEvents(product) {
        let selectedSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : null;
        const sizeBtns = document.querySelectorAll('.size-btn');
        const addToCartBtn = document.getElementById('addToCartBtn');
        const sizeError = document.getElementById('sizeError');

        // Size selection
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sizeBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                selectedSize = btn.getAttribute('data-size');
                if (sizeError) sizeError.style.display = 'none';
            });
        });

        // Add to cart
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                if (!selectedSize && product.sizes && product.sizes.length > 0) {
                    if (sizeError) sizeError.style.display = 'block';
                    // Shake effect
                    const sizesGrid = document.getElementById('productSizeGrid');
                    if (sizesGrid) {
                        sizesGrid.style.transform = 'translateX(5px)';
                        setTimeout(() => sizesGrid.style.transform = 'translateX(-5px)', 100);
                        setTimeout(() => sizesGrid.style.transform = 'translateX(5px)', 200);
                        setTimeout(() => sizesGrid.style.transform = 'translateX(0)', 300);
                    }
                    return;
                }

                if (window.Cart) {
                    window.Cart.addItem(product, selectedSize || 'One Size', 1);

                    // Button animation
                    const originalText = addToCartBtn.textContent;
                    addToCartBtn.textContent = translations[window.currentLang].addedToCartBtn;
                    addToCartBtn.style.backgroundColor = 'var(--success)';

                    // Don't auto-revert to keep track if we changed language? Revert text properly
                    setTimeout(() => {
                        addToCartBtn.textContent = translations[window.currentLang].addToCart;
                        addToCartBtn.style.backgroundColor = '';
                    }, 2000);
                }
            });
        }
    }

    document.addEventListener('languageChanged', () => {
        // Re-render strings inside container except image/name
        renderProductDetails(product);
    });
});
