/**
 * FurniCraft - Checkout Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Fetch cart data
    const cart = JSON.parse(localStorage.getItem('furnicraft_cart') || '[]');

    // 2. Redirect if cart is empty
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    // 3. Populate Summary Sidebar
    const summaryItemsEl = document.getElementById('checkout-items');
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.qty;
        const itemEl = document.createElement('div');
        itemEl.className = 'summary-item';
        itemEl.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="summary-item-info">
                <h4>${item.name} (x${item.qty})</h4>
                <span>$${(item.price * item.qty).toLocaleString()}</span>
            </div>
        `;
        summaryItemsEl.appendChild(itemEl);
    });

    const shipping = subtotal >= 500 ? 0 : 50;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    subtotalEl.textContent = `$${subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    shippingEl.textContent = shipping === 0 ? 'Free' : `$${shipping.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    taxEl.textContent = `$${tax.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    totalEl.textContent = `$${total.toLocaleString(undefined, {minimumFractionDigits: 2})}`;

    // 4. Payment Method Toggles
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const creditCardFields = document.getElementById('credit-card-fields');

    paymentOptions.forEach(option => {
        option.addEventListener('change', (e) => {
            if (e.target.value === 'credit-card') {
                creditCardFields.style.display = 'block';
            } else {
                creditCardFields.style.display = 'none';
            }
        });
    });

    // 5. Place Order Logic
    const checkoutForm = document.getElementById('checkout-form');
    const placeOrderBtn = document.querySelector('.place-order-btn');
    const emailInput = document.getElementById('email');
    const successModal = document.getElementById('success-modal');
    const successEmail = document.getElementById('success-email');
    const orderNumberEl = document.getElementById('order-number');

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple Validation
        if (!emailInput.value) {
            const originalText = placeOrderBtn.textContent;
            placeOrderBtn.textContent = 'Please fill out all fields';
            placeOrderBtn.style.backgroundColor = '#c0392b';
            setTimeout(() => {
                placeOrderBtn.textContent = originalText;
                placeOrderBtn.style.backgroundColor = '';
            }, 3000);
            return;
        }

        // Process Success
        const orderNumber = 'FC' + Math.floor(Math.random() * 1000000);
        successEmail.textContent = emailInput.value;
        orderNumberEl.textContent = orderNumber;
        
        // Show Success Modal
        successModal.classList.add('active');

        // Clear Cart
        localStorage.removeItem('furnicraft_cart');
        
        // Update Navbar Badge (if syncBadge exists globally)
        if (typeof syncBadge === 'function') {
            syncBadge();
        }
    });
});
