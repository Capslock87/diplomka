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
        if (bcName) bcName.textContent = product.name;
        document.title = `Lumina - ${product.name}`;

        const sizesHtml = product.sizes && product.sizes.length > 0 ? `
            <div class="product-sizes">
                <div class="sizes-title">Выберите размер:</div>
                <div class="sizes-grid" id="productSizeGrid">
                    ${product.sizes.map((s, index) => `<button class="size-btn ${index === 0 ? 'selected' : ''}" data-size="${s}">${s}</button>`).join('')}
                </div>
                <div class="size-error" id="sizeError">Пожалуйста, выберите размер</div>
            </div>
        ` : '';

        const html = `
            <div class="product-details" style="opacity: 0; transition: opacity 0.3s ease">
                <div class="product-gallery">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                
                <div class="product-info-full">
                    <span class="product-category">${product.category === 'men' ? 'Мужская одежда' : 'Женская одежда'}</span>
                    <h1 class="product-name">${product.name}</h1>
                    <div class="product-price">${window.formatPrice(product.price)}</div>
                    
                    <div class="product-description">
                        <p>${product.description}</p>
                    </div>
                    
                    ${sizesHtml}
                    
                    <button class="btn btn-primary btn-large" id="addToCartBtn">Добавить в корзину</button>
                    
                    <div style="margin-top: 2rem;">
                        <ul style="list-style: disc; padding-left: 1.5rem; color: var(--text-muted); font-size: 0.875rem;">
                            <li>Бесплатная доставка от 5000 ₽</li>
                            <li>Возврат в течение 14 дней</li>
                            <li>Гарантия качества</li>
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
                    addToCartBtn.textContent = 'Добавлено!';
                    addToCartBtn.style.backgroundColor = 'var(--success)';

                    setTimeout(() => {
                        addToCartBtn.textContent = originalText;
                        addToCartBtn.style.backgroundColor = '';
                    }, 2000);
                }
            });
        }
    }
});
