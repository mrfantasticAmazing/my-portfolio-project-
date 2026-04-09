/**
 * FurniCraft - Cart Page Logic
 * Requires main.js to be loaded first (for products, getCart, saveCart, addToCartLS, syncBadge, showToast)
 */

const SHIPPING_FEE = 50;

document.addEventListener('DOMContentLoaded', () => {

    // Sync navbar badge immediately
    syncBadge();

    const cartItemsContainer = document.getElementById('cart-items-list');
    const emptyCartMsg       = document.getElementById('empty-cart-msg');
    const cartTableWrap      = document.getElementById('cart-table-wrap');
    const subtotalEl         = document.getElementById('cart-subtotal');
    const shippingEl         = document.getElementById('cart-shipping');
    const totalEl            = document.getElementById('cart-total');
    const recommendedGrid    = document.getElementById('recommended-grid');

    // =========================================================================
    // renderCart — builds the cart rows from localStorage
    // =========================================================================
    function renderCart() {
        const cart = getCart();

        if (cart.length === 0) {
            if (emptyCartMsg)  emptyCartMsg.style.display  = 'block';
            if (cartTableWrap) cartTableWrap.style.display = 'none';
        } else {
            if (emptyCartMsg)  emptyCartMsg.style.display  = 'none';
            if (cartTableWrap) cartTableWrap.style.display = 'block';

            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <a href="product-detail.html?id=${item.id}">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    </a>
                    <div class="cart-item-details">
                        <h4><a href="product-detail.html?id=${item.id}" style="text-decoration:none;color:inherit">${item.name}</a></h4>
                        <p class="cart-item-category">Premium Furniture</p>
                        <button class="cart-remove-btn" data-id="${item.id}" aria-label="Remove item">
                            <i class="fa-solid fa-trash-can"></i> Remove
                        </button>
                    </div>
                    <div class="cart-item-price">$${item.price.toLocaleString()}</div>
                    <div class="cart-qty-wrapper">
                        <button class="qty-btn qty-minus" data-id="${item.id}"><i class="fa-solid fa-minus"></i></button>
                        <input type="text" class="cart-qty-input" value="${item.qty}" readonly>
                        <button class="qty-btn qty-plus" data-id="${item.id}"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <div class="cart-item-total">$${(item.price * item.qty).toLocaleString()}</div>
                </div>
            `).join('');

            // Attach qty and remove listeners
            cartItemsContainer.querySelectorAll('.qty-minus').forEach(btn => {
                btn.addEventListener('click', () => changeQty(parseInt(btn.dataset.id), -1));
            });
            cartItemsContainer.querySelectorAll('.qty-plus').forEach(btn => {
                btn.addEventListener('click', () => changeQty(parseInt(btn.dataset.id), 1));
            });
            cartItemsContainer.querySelectorAll('.cart-remove-btn').forEach(btn => {
                btn.addEventListener('click', () => removeItem(parseInt(btn.dataset.id)));
            });
        }

        updateTotals();
        renderRecommended();
    }

    // =========================================================================
    // changeQty — increment or decrement an item's qty
    // =========================================================================
    function changeQty(id, delta) {
        const cart = getCart();
        const item = cart.find(i => i.id === id);
        if (!item) return;
        item.qty = Math.max(1, item.qty + delta);
        saveCart(cart);
        syncBadge();
        renderCart();
    }

    // =========================================================================
    // removeItem — delete an item from the cart
    // =========================================================================
    function removeItem(id) {
        let cart = getCart();
        const removed = cart.find(i => i.id === id);
        cart = cart.filter(i => i.id !== id);
        saveCart(cart);
        syncBadge();
        showToast(removed ? `${removed.name} removed from cart` : 'Item removed');
        renderCart();
    }

    // =========================================================================
    // updateTotals — recalculate subtotal, shipping, total
    // =========================================================================
    function updateTotals() {
        const cart = getCart();
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        const shipping = cart.length > 0 ? (subtotal >= 500 ? 0 : SHIPPING_FEE) : 0;
        const total    = subtotal + shipping;

        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString()}`;
        if (shippingEl) shippingEl.textContent = shipping === 0 && cart.length > 0 ? 'Free' : (cart.length === 0 ? '—' : `$${shipping}`);
        if (totalEl)    totalEl.textContent    = `$${total.toLocaleString()}`;
    }

    // =========================================================================
    // renderRecommended — 3 random products NOT in the cart
    // =========================================================================
    function renderRecommended() {
        if (!recommendedGrid) return;
        const cart       = getCart();
        const cartIds    = new Set(cart.map(i => i.id));
        const available  = products.filter(p => !cartIds.has(p.id));

        // Shuffle and take 3
        const picks = available.sort(() => Math.random() - 0.5).slice(0, 3);

        if (picks.length === 0) {
            recommendedGrid.innerHTML = '<p style="color:#777">No recommendations at the moment.</p>';
            return;
        }

        recommendedGrid.innerHTML = picks.map(p => `
            <div class="product-card">
                <a href="product-detail.html?id=${p.id}" class="prod-img">
                    <img src="${p.image}" alt="${p.name}">
                </a>
                <div class="prod-info">
                    <a href="product-detail.html?id=${p.id}" style="text-decoration:none;color:inherit"><h4>${p.name}</h4></a>
                    <p class="price">$${p.price.toLocaleString()}</p>
                    <button class="btn-brown rec-add-btn" data-id="${p.id}">Add to Cart</button>
                </div>
            </div>`).join('');

        recommendedGrid.querySelectorAll('.rec-add-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const product = products.find(p => p.id === parseInt(btn.dataset.id));
                if (product) {
                    addToCartLS(product, 1);
                    showToast(`${product.name} added to your cart`);
                    renderCart(); // refresh cart and recommendations immediately
                }
            });
        });
    }

    // =========================================================================
    // Promo Code (visual-only placeholder)
    // =========================================================================
    const promoForm = document.querySelector('.promo-form');
    if (promoForm) {
        const promoBtn = promoForm.querySelector('button');
        const promoInput = promoForm.querySelector('input');
        if (promoBtn) {
            promoBtn.addEventListener('click', () => {
                const code = promoInput.value.trim().toUpperCase();
                if (code === 'FURNI10') {
                    showToast('Promo code applied! 10% off (demo)');
                } else if (code) {
                    showToast('Invalid promo code. Try FURNI10.');
                } else {
                    showToast('Please enter a promo code.');
                }
            });
        }
    }

    // =========================================================================
    // Checkout button
    // =========================================================================
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cart = getCart();
            if (cart.length === 0) {
                showToast('Your cart is empty!');
            } else {
                window.location.href = 'checkout.html';
            }
        });
    }

    // =========================================================================
    // Newsletter
    // =========================================================================
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Successfully subscribed!');
            newsletterForm.reset();
        });
    }

    // Initial render
    renderCart();
});
