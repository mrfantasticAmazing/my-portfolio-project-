/**
 * FurniCraft - Product Detail Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    // Global properties grabbed from main.js
    const badge = document.querySelector('.cart-badge');
    const productIdParam = new URLSearchParams(window.location.search).get('id');

    // Find Product data or fallback to first product if no ID
    let currentProduct = products[0];
    if (productIdParam) {
        const found = products.find(p => p.id === parseInt(productIdParam));
        if (found) currentProduct = found;
    }

    // --- 1. Populate Product Data ---
    document.title = `${currentProduct.name} | FurniCraft`;
    document.getElementById('breadcrumb-product-name').textContent = currentProduct.name;
    document.getElementById('pdp-title').textContent = currentProduct.name;
    document.getElementById('pdp-price').textContent = `$${currentProduct.price}`;

    // Gallery Initial Image
    const mainImg = document.getElementById('main-product-image');
    mainImg.src = currentProduct.image;

    // Generate simple simulated gallery thumbnails using the same image but different angles via CSS
    const thumbnails = document.querySelectorAll('.thumbnail-row .thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.src = currentProduct.image;

        // Define simulated angles using predefined datsets
        if (index === 0) {
            thumb.dataset.angle = 'normal';
            thumb.classList.add('active-thumb');
            mainImg.style.transform = 'none'; // Set initial state
        } else if (index === 1) {
            thumb.dataset.angle = 'flipped';
            thumb.style.transform = 'scaleX(-1)'; // Simulate a reverse angle
        } else if (index === 2) {
            thumb.dataset.angle = 'zoomed';
            // We use a slight rotation for the thumbnail to avoid overflow clipping issues,
            // while providing a distinct look.
            thumb.style.transform = 'rotate(-2deg) scale(1.05)';
        }
    });

    // Generate Stars visually
    const ratingContainer = document.querySelector('.pdp-rating');
    if (ratingContainer) {
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            starsHtml += `<i class="fa-solid fa-star" style="color: ${i < currentProduct.rating ? '#B8926A' : '#D1D1D1'};"></i>`;
        }
        starsHtml += `<span class="review-count">(35 reviews)</span>`;
        ratingContainer.innerHTML = starsHtml;
    }

    // --- 2. Gallery Logic ---
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.forEach(t => t.classList.remove('active-thumb'));
            thumb.classList.add('active-thumb');

            // Swap main image
            mainImg.src = thumb.src;

            // Apply corresponding "angle" transform to the main product image
            // to fulfill the request of showing different angles consistently.
            const angle = thumb.dataset.angle;

            // Add a small transition for a premium feel
            mainImg.style.transition = 'transform 0.4s ease-out';

            if (angle === 'normal') {
                mainImg.style.transform = 'none';
                mainImg.style.transformOrigin = 'center center';
            } else if (angle === 'flipped') {
                mainImg.style.transform = 'scaleX(-1)';
                mainImg.style.transformOrigin = 'center center';
            } else if (angle === 'zoomed') {
                // Simulate a close-up angle view
                mainImg.style.transform = 'scale(1.4)';
                mainImg.style.transformOrigin = 'top right';
            }
        });
    });

    // --- 3. Quantity Selector Logic ---
    const qtyMinus = document.getElementById('qty-minus');
    const qtyPlus = document.getElementById('qty-plus');
    const qtyInput = document.getElementById('qty-input');

    if (qtyMinus && qtyPlus && qtyInput) {
        qtyMinus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            if (val > 1) qtyInput.value = val - 1;
        });

        qtyPlus.addEventListener('click', () => {
            let val = parseInt(qtyInput.value);
            if (val < 99) qtyInput.value = val + 1;
        });
    }

    // --- 4. Color Swatch Selector ---
    const swatches = document.querySelectorAll('.color-swatch');
    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');
        });
    });

    // --- 5. Tabbed Content Logic ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(t => t.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            // Activate target
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- 6. Add to Cart Logic ---
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const qty = parseInt(qtyInput.value) || 1;

            // Persist to localStorage
            addToCartLS(currentProduct, qty);
            showToast(`${qty}× ${currentProduct.name} added to your cart`);

            // Visual feedback
            const originalHTML = addToCartBtn.innerHTML;
            addToCartBtn.innerHTML = '<i class="fa-solid fa-check"></i> Added ✓';
            addToCartBtn.style.backgroundColor = '#5a3f2f';
            setTimeout(() => {
                addToCartBtn.innerHTML = originalHTML;
                addToCartBtn.style.backgroundColor = '';
            }, 2000);
        });
    }
});
