/**
 * FurniCraft - Main JavaScript
 * High-end furniture e-commerce interaction logic
 */

// =============================================================================
// GLOBAL DATA — shared across all pages via script include
// =============================================================================
const products = [
    { id: 1,  name: "Luna Lounge Chair",      price: 249,  category: "chairs", rating: 5, image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 2,  name: "Nordic Coffee Table",    price: 399,  category: "tables", rating: 4, image: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 3,  name: "Oslo Wooden Bench",      price: 299,  category: "chairs", rating: 4, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 4,  name: "Elite Bed Frame",        price: 799,  category: "beds",   rating: 5, image: "https://images.unsplash.com/photo-1505692952047-1a78307da8f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 5,  name: "Modern Accent Chair",    price: 349,  category: "chairs", rating: 5, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 6,  name: "Velvet Rounded Sofa",    price: 1299, category: "sofas",  rating: 5, image: "https://images.unsplash.com/photo-1727422969654-050f3a877c4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8VmVsdmV0JTIwUm91bmRlZCUyMFNvZmF8ZW58MHx8MHx8fDA%3D" },
    { id: 7,  name: "Minimalist Stool",       price: 89,   category: "chairs", rating: 3, image: "https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 8,  name: "Oak Dining Table",       price: 649,  category: "tables", rating: 4, image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 9,  name: "Classic Leather Sofa",   price: 1499, category: "sofas",  rating: 5, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 10, name: "Scandi Platform Bed",    price: 899,  category: "beds",   rating: 4, image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 11, name: "Round Side Table",       price: 149,  category: "tables", rating: 4, image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 12, name: "Comfort Recliner",       price: 599,  category: "chairs", rating: 5, image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 13, name: "Minimalist Sofa",        price: 1100, category: "sofas",  rating: 4, image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 14, name: "Industrial Desk",        price: 450,  category: "tables", rating: 4, image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 15, name: "Fabric Armchair",        price: 320,  category: "chairs", rating: 3, image: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 16, name: "King Storage Bed",       price: 1050, category: "beds",   rating: 5, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 17, name: "Glass Coffee Table",     price: 280,  category: "tables", rating: 4, image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 18, name: "Ergonomic Office Chair", price: 299,  category: "chairs", rating: 5, image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 19, name: "Sectional Grey Sofa",    price: 1350, category: "sofas",  rating: 4, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 20, name: "Wooden Bedside Table",   price: 120,  category: "tables", rating: 4, image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 21, name: "Tufted Headboard Bed",   price: 850,  category: "beds",   rating: 5, image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 22, name: "Rattan Chair",           price: 199,  category: "chairs", rating: 4, image: "https://images.unsplash.com/photo-1528360354687-839420409a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 23, name: "Compact Loveseat",       price: 650,  category: "sofas",  rating: 3, image: "https://images.unsplash.com/photo-1550254478-ead40cc54513?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 24, name: "Marble Dining Table",    price: 1800, category: "tables", rating: 5, image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 25, name: "Boho Accent Chair",      price: 210,  category: "chairs", rating: 4, image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
    { id: 26, name: "Rustic Wardrobe",        price: 900,  category: "beds",   rating: 3, image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
];

// =============================================================================
// PERSISTENT CART HELPERS (localStorage)
// =============================================================================
function getCart() {
    return JSON.parse(localStorage.getItem('furnicraft_cart') || '[]');
}

function saveCart(cart) {
    localStorage.setItem('furnicraft_cart', JSON.stringify(cart));
}

function addToCartLS(product, qty) {
    qty = qty || 1;
    const cart = getCart();
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty });
    }
    saveCart(cart);
    syncBadge();
}

function syncBadge() {
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById('cart-counter');
    if (!badge) return;
    if (totalQty > 0) {
        badge.style.display = 'flex';
        badge.textContent = totalQty;
    } else {
        badge.style.display = 'none';
        badge.textContent = '0';
    }
}

// Legacy shim so product.js calling updateCart(qty, badge) still works
let cartCount = 0;
function updateCart(qty, badgeElement) {
    cartCount += qty;
    syncBadge();
    if (badgeElement) {
        badgeElement.classList.add('pop-anim');
        setTimeout(() => badgeElement.classList.remove('pop-anim'), 300);
    }
}

// =============================================================================
// TOAST NOTIFICATIONS (global)
// =============================================================================
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// =============================================================================
// DOM-READY LOGIC
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {

    // Sync badge on every page load
    syncBadge();

    // --- 1. Static "Add to Cart" buttons (index.html product cards) ---
    const staticAddBtns = document.querySelectorAll('.product-card .btn-brown:not(.add-to-cart-btn)');
    staticAddBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Try to match product by card title
            const title = btn.closest('.product-card').querySelector('h4').textContent;
            const product = products.find(p => p.name === title) || { id: Date.now(), name: title, price: 0, image: '' };
            addToCartLS(product, 1);
            showToast(`${product.name} added to your cart`);
            const orig = btn.textContent;
            btn.textContent = 'Added ✓';
            btn.style.backgroundColor = '#5a3f2f';
            setTimeout(() => { btn.textContent = orig; btn.style.backgroundColor = ''; }, 2000);
        });
    });

    // --- 2. Sticky Navbar ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- 3. Mobile Menu Toggle ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.toggle('fa-bars', !navLinks.classList.contains('active'));
            icon.classList.toggle('fa-xmark', navLinks.classList.contains('active'));
        });
    }

    // --- 4. Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                window.scrollTo({ top: targetSection.getBoundingClientRect().top + window.scrollY - navHeight, behavior: 'smooth' });
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.replace('fa-xmark', 'fa-bars');
                }
            }
        });
    });

    // --- 5. Scroll-Reveal Animations ---
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.product-card, .category-card, .feature-item').forEach(el => {
        el.classList.add('reveal-hidden');
        revealObserver.observe(el);
    });

    // --- 6. Newsletter Toast ---
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = newsletterForm.querySelector('button');
            showToast('Successfully subscribed!');
            const orig = btn.textContent;
            btn.textContent = 'Subscribed!';
            btn.style.backgroundColor = '#5a3f2f';
            setTimeout(() => { btn.textContent = orig; btn.style.backgroundColor = ''; newsletterForm.reset(); }, 3000);
        });
    }

    // --- 7. Shop Page Logic ---
    const shopGrid = document.querySelector('.shop-grid');
    if (shopGrid) {
        let filteredProducts = [...products];
        let currentPage = 1;
        let itemsPerPage = 8;
        const maxPages = 3;

        const resultsCountEl  = document.querySelector('.results-count');
        const paginationEl    = document.querySelector('.pagination');
        const sortDropdown    = document.querySelector('.sort-dropdown select');
        const filterCheckboxes = document.querySelectorAll('.shop-sidebar .checkbox-container input[type="checkbox"]');
        const priceSlider     = document.querySelector('.price-slider');
        const priceLastLabel  = document.querySelector('.price-labels span:last-child');
        const clearFiltersBtn = document.querySelector('.clear-filters');
        const categoryInputs  = Array.from(filterCheckboxes);

        function calculateItemsPerPage() {
            const total = filteredProducts.length;
            itemsPerPage = total === 0 ? 1 : Math.max(4, Math.ceil(total / maxPages));
        }

        function filterAndSort() {
            let temp = [...products];

            // Category
            if (!categoryInputs[0].checked) {
                const selected = [];
                if (categoryInputs[1] && categoryInputs[1].checked) selected.push('sofas');
                if (categoryInputs[2] && categoryInputs[2].checked) selected.push('chairs');
                if (categoryInputs[3] && categoryInputs[3].checked) selected.push('tables');
                if (categoryInputs[4] && categoryInputs[4].checked) selected.push('beds');
                if (selected.length) temp = temp.filter(p => selected.includes(p.category));
            }

            // Price
            const maxPrice = parseInt(priceSlider.value);
            temp = temp.filter(p => p.price <= maxPrice);
            if (priceLastLabel) priceLastLabel.textContent = '$' + maxPrice + (maxPrice >= 2000 ? '+' : '');

            // Search query
            const urlParams = new URLSearchParams(window.location.search);
            const searchParam = urlParams.get('search');
            if (searchParam) {
                const query = searchParam.toLowerCase();
                temp = temp.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
                
                // Update breadcrumb for search
                const bcrumb = document.querySelector('.breadcrumbs');
                if (bcrumb) {
                    bcrumb.innerHTML = `<a href="index.html">Home</a> / <a href="shop.html">Shop</a> / Search: "${searchParam}"`;
                }
            }

            // Sort
            const sv = sortDropdown.value;
            if (sv === 'Price: Low to High')  temp.sort((a, b) => a.price - b.price);
            if (sv === 'Price: High to Low') temp.sort((a, b) => b.price - a.price);
            if (sv === 'Newest Arrivals')     temp.sort((a, b) => b.id - a.id);

            filteredProducts = temp;
            currentPage = 1;
            calculateItemsPerPage();
            renderProducts();
            renderPagination();
        }

        categoryInputs.forEach((input, index) => {
            input.addEventListener('change', () => {
                if (index === 0 && input.checked) {
                    categoryInputs.forEach((cb, i) => { if (i !== 0) cb.checked = false; });
                } else if (index !== 0 && input.checked) {
                    categoryInputs[0].checked = false;
                } else if (index !== 0 && !input.checked) {
                    if (!categoryInputs.some((cb, i) => i !== 0 && cb.checked)) categoryInputs[0].checked = true;
                }
                filterAndSort();
            });
        });

        if (priceSlider) {
            priceSlider.addEventListener('input', () => {
                const val = parseInt(priceSlider.value);
                if (priceLastLabel) priceLastLabel.textContent = '$' + val + (val >= 2000 ? '+' : '');
            });
            priceSlider.addEventListener('change', filterAndSort);
        }

        if (sortDropdown) sortDropdown.addEventListener('change', filterAndSort);

        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                categoryInputs[0].checked = true;
                categoryInputs.forEach((cb, i) => { if (i !== 0) cb.checked = false; });
                if (priceSlider) priceSlider.value = 2000;
                if (sortDropdown) sortDropdown.selectedIndex = 0;
                filterAndSort();
            });
        }

        function renderProducts() {
            if (filteredProducts.length === 0) {
                shopGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:#777"><h3>No products found</h3><p>Try adjusting your filters.</p></div>`;
                if (resultsCountEl) resultsCountEl.textContent = 'Showing 0 results';
                return;
            }
            const start = (currentPage - 1) * itemsPerPage;
            const end   = start + itemsPerPage;
            const page  = filteredProducts.slice(start, end);

            shopGrid.innerHTML = page.map(p => {
                return `
                <div class="product-card reveal-hidden in-view">
                    <a href="product-detail.html?id=${p.id}" class="prod-img">
                        <img src="${p.image}" alt="${p.name}">
                    </a>
                    <div class="prod-info">
                        <a href="product-detail.html?id=${p.id}" style="text-decoration:none;color:inherit"><h4>${p.name}</h4></a>
                        <p class="price">$${p.price.toLocaleString()}</p>
                        <button class="btn-brown add-to-cart-btn" data-id="${p.id}">Add to Cart</button>
                    </div>
                </div>`;
            }).join('');

            if (resultsCountEl) resultsCountEl.textContent = `Showing ${start + 1}–${Math.min(end, filteredProducts.length)} of ${filteredProducts.length} results`;

            shopGrid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const product = products.find(p => p.id === parseInt(btn.dataset.id));
                    if (product) {
                        addToCartLS(product, 1);
                        showToast(`${product.name} added to your cart`);
                        const orig = btn.textContent;
                        btn.textContent = 'Added ✓';
                        btn.style.backgroundColor = '#5a3f2f';
                        setTimeout(() => { btn.textContent = orig; btn.style.backgroundColor = ''; }, 2000);
                    }
                });
            });
        }

        function renderPagination() {
            if (!paginationEl) return;
            const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
            if (filteredProducts.length <= itemsPerPage) { paginationEl.style.display = 'none'; return; }
            paginationEl.style.display = 'flex';

            let html = `<a href="#" class="page-link prev-link ${currentPage === 1 ? 'disabled' : ''}">&lt;&lt; Prev</a>`;
            for (let i = 1; i <= totalPages; i++) {
                html += `<a href="#" class="page-link page-num ${currentPage === i ? 'active' : ''}" data-page="${i}">${i}</a>`;
            }
            html += `<a href="#" class="page-link next-link ${currentPage === totalPages ? 'disabled' : ''}">Next &gt;&gt;</a>`;
            paginationEl.innerHTML = html;

            paginationEl.querySelectorAll('.page-num').forEach(link => {
                link.addEventListener('click', e => { e.preventDefault(); currentPage = parseInt(e.target.dataset.page); renderProducts(); renderPagination(); scrollToShop(); });
            });
            paginationEl.querySelector('.prev-link').addEventListener('click', e => { e.preventDefault(); if (currentPage > 1) { currentPage--; renderProducts(); renderPagination(); scrollToShop(); } });
            paginationEl.querySelector('.next-link').addEventListener('click', e => { e.preventDefault(); if (currentPage < totalPages) { currentPage++; renderProducts(); renderPagination(); scrollToShop(); } });
        }

        function scrollToShop() {
            const s = document.querySelector('.shop-section');
            if (s) window.scrollTo({ top: s.offsetTop - navbar.offsetHeight - 20, behavior: 'smooth' });
        }

        const searchParam = urlParams.get('search');
        if (catParam || searchParam) {
            if (catParam) {
                const validCats = ['all', 'sofas', 'chairs', 'tables', 'beds'];
                const index = validCats.indexOf(catParam.toLowerCase());
                if (index !== -1) {
                    categoryInputs.forEach((cb, i) => cb.checked = (i === index));
                }
            }
            filterAndSort();
        }

        calculateItemsPerPage();
        renderProducts();
        renderPagination();
    }

    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! Our team will get back to you soon.');
            contactForm.reset();
        });
    }

    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Open clicked item if it wasn't already active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // --- Navbar Search & Account Interactions ---
    const navSearchBtn = document.getElementById('nav-search-btn');
    const searchContainer = document.getElementById('search-container');
    const searchCloseBtn = document.getElementById('search-close-btn');
    const navAccountBtn = document.getElementById('nav-account-btn');
    const accountDropdown = document.getElementById('account-dropdown');

    if (navSearchBtn && searchContainer) {
        const searchInput = searchContainer.querySelector('input');
        
        navSearchBtn.addEventListener('click', () => {
            searchContainer.classList.add('active');
            setTimeout(() => searchInput.focus(), 100);
        });

        // Redirect on Enter
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && searchInput.value.trim() !== '') {
                window.location.href = `shop.html?search=${encodeURIComponent(searchInput.value.trim())}`;
            }
        });

        // Popular suggestions
        const suggestionTags = searchContainer.querySelectorAll('.suggestion-tag');
        suggestionTags.forEach(tag => {
            tag.addEventListener('click', () => {
                window.location.href = `shop.html?search=${encodeURIComponent(tag.textContent.trim())}`;
            });
        });
    }

    if (searchCloseBtn && searchContainer) {
        searchCloseBtn.addEventListener('click', () => {
            searchContainer.classList.remove('active');
        });
    }

    if (navAccountBtn && accountDropdown) {
        navAccountBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            accountDropdown.classList.toggle('active');
        });
    }

    // Close on click outside (only for overlay content background)
    searchContainer.addEventListener('click', (e) => {
        if (e.target === searchContainer) {
            searchContainer.classList.remove('active');
        }
    });

    // Close on click outside for Account Dropdown
    document.addEventListener('click', (e) => {
        if (accountDropdown && !accountDropdown.contains(e.target) && !navAccountBtn.contains(e.target)) {
            accountDropdown.classList.remove('active');
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (searchContainer) searchContainer.classList.remove('active');
            if (accountDropdown) accountDropdown.classList.remove('active');
        }
    });
});
