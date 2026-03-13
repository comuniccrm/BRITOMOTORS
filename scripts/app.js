/**
 * Brito Motors - Premium Logic (V3 - Showroom Edition)
 */

const STORAGE_KEYS = {
    CARS: 'brito_motors_inventory',
    BRANDS: 'brito_motors_brands',
    SETTINGS: 'brito_motors_settings',
    BANNERS: 'brito_motors_banners',
    TESTIMONIALS: 'brito_motors_testimonials'
};

// Supabase logic moved to scripts/supa.js

const DEFAULT_SETTINGS = {
    primaryColor: '#D4AF37',
    whatsapp: '551199999999',
    aboutTitle: 'O PADRÃO DA EXCELÊNCIA',
    aboutText: 'Descubra uma curadoria exclusiva de veículos que definem status e performance.',
    footerText: '© 2026 BRITO MOTORS. TODOS OS DIREITOS RESERVADOS.',
    instagram: '',
    facebook: '',
    youtube: '',
    address: 'Av. Europa, 1234 - Jardim Europa, São Paulo - SP',
    openingHours: 'Seg - Sex: 09h às 19h | Sáb: 09h às 14h',
    mapsIframe: '<iframe width="100%" height="100%" frameborder="0" style="border:0" src="https://maps.google.com/maps?q=Av.%20Europa,%201234%20-%20Jardim%20Europa,%20S%C3%A3o%20Paulo%20-%20SP&t=&z=15&ie=UTF8&iwloc=&output=embed" allowfullscreen></iframe>',
    financingNotice: 'Consulte taxas especiais para financiamento em até 60x.',
    heroMedia: 'assets/brito_motors_store_banner.png',
    siteLogo: '',
    financeBanner: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1600',
    globalBg: '',
    faviconUrl: '',
    heroOpacity: 0.8,
    heroCta1Text: 'Explorar Estoque',
    heroCta1Show: true,
    heroCta2Text: 'Financiamento',
    heroCta2Show: true,
    inventoryTitle: 'Seu Carro Novo Está Aqui',
    cardCtaText: 'TENHO INTERESSE',
    financeTitle: 'PLANO EXCLUSIVE',
    financeBtnText: 'Simular Financiamento',
    showBloco1: true,
    showBloco2: true,
    showBloco3: true,
    showBloco4: true,
    showBloco5: true,
    showBloco6: true
};

const INITIAL_CARS = [
    { id: 1, brand: 'Volkswagen', model: 'Taos Highline', year: '2023', price: '185900', km: '12.000', img: 'https://images.unsplash.com/photo-1617469767053-d3b523a07482?auto=format&fit=crop&q=80&w=800' },
    { id: 2, brand: 'BMW', model: 'M3 Competition', year: '2024', price: '750000', km: '0', img: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800' },
    { id: 3, brand: 'Porsche', model: '911 Carrera S', year: '2022', price: '920000', km: '5.400', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800' },
    { id: 4, brand: 'Mercedes', model: 'G63 AMG', year: '2023', price: '1250000', km: '1.200', img: 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800' },
    { id: 5, brand: 'Land Rover', model: 'Range Rover Velar', year: '2024', price: '680000', km: '0', img: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0b12?auto=format&fit=crop&q=80&w=800' },
    { id: 6, brand: 'Audi', model: 'RS6 Avant', year: '2024', price: '1100000', km: '2.000', img: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&q=80&w=800' },
    { id: 7, brand: 'Ferrari', model: 'F8 Tributo', year: '2023', price: '3800000', km: '1.500', img: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=800' },
    { id: 8, brand: 'Lamborghini', model: 'Huracán EVO', year: '2022', price: '3500000', km: '3.500', img: 'https://images.unsplash.com/photo-1544636331-ae93fedef4fa?auto=format&fit=crop&q=80&w=800' },
    { id: 9, brand: 'Aston Martin', model: 'Vantage', year: '2024', price: '1850000', km: '500', img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=800' }
];

const DEFAULT_TESTIMONIALS = [
    { id: 101, name: 'Ricardo Silva', role: 'Colecionador', msg: 'Atendimento impecável e veículos em estado de novo. Superou todas as expectativas.' },
    { id: 102, name: 'Ana Paula Costa', role: 'Empresária', msg: 'Transparência total na negociação. Com certeza voltarei para minha próxima conquista.' }
];

const INITIAL_BRANDS = ['TOYOTA', 'BMW', 'MERCEDES', 'PORSCHE', 'VOLKSWAGEN', 'AUDI', 'FIAT', 'HONDA', 'CHEVROLET'];

document.addEventListener('DOMContentLoaded', () => {
    initApp();
    setupHeader();
});

async function initApp() {
    // 1. Initial Local Setup (to ensure something shows up immediately)
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    if (!localStorage.getItem(STORAGE_KEYS.CARS)) localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(INITIAL_CARS));
    if (!localStorage.getItem(STORAGE_KEYS.BRANDS)) localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(INITIAL_BRANDS));
    if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(DEFAULT_TESTIMONIALS));

    // 2. Fetch from Cloud if available
    let cars = JSON.parse(localStorage.getItem(STORAGE_KEYS.CARS));
    let brands = JSON.parse(localStorage.getItem(STORAGE_KEYS.BRANDS));
    let settings = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS));
    let testimonials = JSON.parse(localStorage.getItem(STORAGE_KEYS.TESTIMONIALS));
    let banners = JSON.parse(localStorage.getItem(STORAGE_KEYS.BANNERS)) || [];

    if (supabase) {
        console.log("Supabase detected. Syncing...");
        try {
            const cloudCars = await CloudDB.fetch('vehicles', null);
            if (cloudCars) {
                cars = cloudCars;
                localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
            }

            const cloudBrands = await CloudDB.fetch('brands', null);
            if (cloudBrands) {
                brands = cloudBrands.map(b => b.name);
                localStorage.setItem(STORAGE_KEYS.BRANDS, JSON.stringify(brands));
            }

            const cloudSettings = await CloudDB.fetch('settings', null);
            if (cloudSettings && cloudSettings.length > 0) {
                settings = cloudSettings[0].data;
                localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
            }

            const cloudTestis = await CloudDB.fetch('testimonials', null);
            if (cloudTestis) {
                testimonials = cloudTestis;
                localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
            }

            const cloudBanners = await CloudDB.fetch('banners', null);
            if (cloudBanners) {
                banners = cloudBanners;
                localStorage.setItem(STORAGE_KEYS.BANNERS, JSON.stringify(banners));
            }
        } catch (e) {
            console.error("Cloud sync failed:", e);
        }
    }

    refreshUI();
    renderBrands(brands);
    renderInventory(cars);
    renderAdditionalBanners(banners);
    renderTestimonials(testimonials);
    observeAnimations();
}

function refreshUI() {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)) || DEFAULT_SETTINGS;

    // Theme & Global Appearance
    document.documentElement.style.setProperty('--accent-gold', s.primaryColor || '#D4AF37');
    document.documentElement.style.setProperty('--hero-overlay-opacity', s.heroOpacity ?? 0.8);
    
    if (s.globalBg) {
        document.body.style.backgroundImage = `url(${s.globalBg})`;
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundSize = 'cover';
    } else {
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundSize = 'auto'; // Reset
    }

    // Identity (Logos)
    const logos = document.querySelectorAll('.logo');
    logos.forEach(logoElement => {
        if (s.siteLogo) {
            logoElement.innerHTML = `<img src="${s.siteLogo}" alt="Logo" style="height: 40px; display: block; object-fit: contain; margin: 0;">`;
        } else {
            logoElement.innerHTML = `BRITO<span>MOTORS</span>`;
        }
    });

    // Favicon
    if (s.faviconUrl) {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = s.faviconUrl;
    }

    // --- TEXT VISIBILITY HELPER ---
    const updateText = (id, value, fallback = '', isHTML = false) => {
        const el = document.getElementById(id);
        if (!el) return;
        
        const shouldHide = value !== undefined && value.trim() === '';
        
        if (shouldHide) {
            el.style.display = 'none';
        } else {
            el.style.display = ''; 
            const content = value || fallback;
            if (isHTML) {
                // Keep EXCLUSIVE styling but ensure we don't accidentally hide the whole tag
                el.innerHTML = content.replace(/\n/g, '<br>').replace(/EXCLUSIVE/g, `<span style="color:var(--accent-gold)">EXCLUSIVE</span>`);
            } else {
                el.textContent = content;
            }
        }
    };

    // Hero Content
    updateText('hero-title', s.heroTitle, 'O PADRÃO DA EXCELÊNCIA', true);
    updateText('hero-subtitle', s.heroSubtitle, 'Buscando as melhores ofertas em nossa curadoria premium.');

    const mediaContainer = document.querySelector('.hero-video-container');
    if (mediaContainer && s.heroMedia) {
        const isVideo = s.heroMedia.toLowerCase().endsWith('.mp4') || 
                        s.heroMedia.startsWith('data:video') || 
                        s.heroMedia.includes('video');
        
        if (isVideo) {
            mediaContainer.innerHTML = `<video autoplay muted loop playsinline src="${s.heroMedia}"></video>`;
        } else {
            mediaContainer.innerHTML = `<img src="${s.heroMedia}" alt="Brito Motors">`;
        }
    }

    // Hero CTAs
    const h1 = document.getElementById('hero-cta1');
    const h2 = document.getElementById('hero-cta2');
    if (h1) {
        h1.textContent = s.heroCta1Text || 'Explorar Estoque';
        h1.style.display = (s.heroCta1Show === false || (s.heroCta1Text !== undefined && s.heroCta1Text.trim() === '')) ? 'none' : 'inline-block';
    }
    if (h2) {
        h2.textContent = s.heroCta2Text || 'Financiamento';
        h2.style.display = (s.heroCta2Show === false || (s.heroCta2Text !== undefined && s.heroCta2Text.trim() === '')) ? 'none' : 'inline-block';
    }

    // Sections & Content
    updateText('about-title', s.aboutTitle, 'O PADRÃO DA EXCELÊNCIA');
    updateText('about-text', s.aboutText, 'Descubra uma curadoria exclusiva de veículos que definem status e performance.');
    
    updateText('inventory-title', s.inventoryTitle, 'Seu Carro Novo Está Aqui');
    updateText('finance-title', s.financeTitle, 'PLANO EXCLUSIVE', true);
    updateText('finance-notice', s.financeSubtitle || s.financingNotice);
    
    const finBtn = document.getElementById('finance-btn');
    if (finBtn) {
        finBtn.textContent = s.financeBtnText || 'Simular Financiamento';
        if (s.financeBtnText !== undefined && s.financeBtnText.trim() === '') finBtn.style.display = 'none';
        else finBtn.style.display = 'inline-block';
    }

    const financeSection = document.getElementById('financiamento');
    if (financeSection && s.financeBanner) {
        financeSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${s.financeBanner})`;
    }

    // Contacts & Footer
    updateText('address-text', s.address, '', true);
    updateText('hours-text', s.openingHours);
    updateText('footer-text', s.footerText || '© 2026 BRITO MOTORS. TODOS OS DIREITOS RESERVADOS.', '', true);

    // Links
    const waUrl = getWhatsAppUrl();
    document.querySelectorAll('.whatsapp-link').forEach(link => {
        if (link) link.href = waUrl;
    });

    // Floating Button
    setupFloatingWhatsApp(waUrl);

    // Social
    const instaLinks = [document.getElementById('insta-link'), document.getElementById('insta-link-btm')];
    const fbLinks = [document.getElementById('fb-link'), document.getElementById('fb-link-btm')];

    instaLinks.forEach(link => {
        if (link) {
            link.href = s.instagram || '#';
            link.style.display = s.instagram ? 'inline-block' : 'none';
        }
    });

    fbLinks.forEach(link => {
        if (link) {
            link.href = s.facebook || '#';
            link.style.display = s.facebook ? 'inline-block' : 'none';
        }
    });

    // Map Rendering
    const mapContainer = document.getElementById('map-container');
    if (mapContainer) {
        let mapContent = s.mapsIframe ? s.mapsIframe.trim() : '';
        
        // SMART FIX: If user pasted a link instead of iframe, convert it!
        if (mapContent && !mapContent.includes('<iframe')) {
            // Extract URL if it's inside a link or just a raw URL
            const urlMatch = mapContent.match(/https?:\/\/[^\s"']+/);
            const finalUrl = urlMatch ? urlMatch[0] : mapContent;
            
            // If it's a standard maps URL, we can try to embed it, 
            // but the most reliable way is the embed API if we have an address
            const query = encodeURIComponent(s.address || 'Brito Motors');
            mapContent = `<iframe width="100%" height="100%" frameborder="0" style="border:0" src="https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed" allowfullscreen></iframe>`;
        }
        
        mapContainer.innerHTML = mapContent || DEFAULT_SETTINGS.mapsIframe;
    }

    // SEO
    if (s.pageTitle) document.title = s.pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && s.seoDesc) metaDesc.content = s.seoDesc;

    // --- BLOCK VISIBILITY ---
    const blocks = {
        'marcas': s.showBloco1,
        'sobre': s.showBloco2,
        'destaques': s.showBloco3,
        'financiamento': s.showBloco4,
        'depoimentos-section': s.showBloco5,
        'mapa-section': s.showBloco6
    };

    Object.entries(blocks).forEach(([id, show]) => {
        const el = document.getElementById(id);
        if (el) {
            if (show === false) {
                el.style.setProperty('display', 'none', 'important');
            } else {
                el.style.display = ''; 
            }
        }
    });

    return s;
}

function renderBrands(brands) {
    const container = document.getElementById('brand-container');
    if (!container) return;
    container.innerHTML = brands.map(brand => {
        const slugMap = {
            'MERCEDES': 'mercedes',
            'MERCEDES BENZ': 'mercedes',
            'MERCEDES-BENZ': 'mercedes',
            'LAND ROVER': 'landrover',
            'CHEVROLET': 'chevrolet',
            'VW': 'volkswagen',
            'ASTON MARTIN': 'astonmartin',
            'ALFA ROMEO': 'alfaromeo',
            'ROLLS ROYCE': 'rollsroyce',
            'FIAT': 'fiat',
            'SIAT': 'fiat',
            'SEAT': 'seat',
            'HYUNDAI': 'hyundai',
            'HONDA': 'honda',
            'HONDA MOTORS': 'honda',
            'CHEVROLETTE': 'chevrolet'
        };
        const slug = slugMap[brand.toUpperCase().trim()] || brand.toLowerCase().replace(/\s+/g, '');
        let imgUrl = `https://cdn.simpleicons.org/${slug}/ffffff`;

        // Special fallback for Mercedes-Benz (removed from SimpleIcons CDN due to trademarks)
        if (slug === 'mercedes') {
            imgUrl = "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff'%3E%3Cpath d='M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12S0 18.623 0 12 5.377 0 12 0zM3.245 17.539A10.357 10.357 0 0012 22.36c3.681 0 6.917-1.924 8.755-4.821L12 14.203zm10.663-6.641l7.267 5.915A10.306 10.306 0 0022.36 12c0-5.577-4.417-10.131-9.94-10.352zm-2.328-9.25C6.057 1.869 1.64 6.423 1.64 12c0 1.737.428 3.374 1.185 4.813l7.267-5.915z'/%3E%3C/svg%3E";
        }

        return `<div class="brand-item" onclick="filterByBrand('${brand}')" title="${brand}">
            <img src="${imgUrl}" alt="${brand}" class="brand-logo" onerror="this.outerHTML='<span>${brand}</span>'">
        </div>`;
    }).join('');
}

function renderInventory(cars) {
    const container = document.getElementById('inventory-container');
    if (!container) return;

    if (cars.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #555; padding: 100px 0;">Nenhum veículo no pátio no momento.</p>';
        return;
    }

    const s = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)) || DEFAULT_SETTINGS;

    container.innerHTML = cars.map((car, index) => {
        // Handle tags: use real ones or default if empty
        const carTags = car.tags ? car.tags.split(',').map(t => t.trim()) : [];
        
        // Add structured specs to the tag list for display
        const displayTags = [];
        if (car.trans) displayTags.push(car.trans.toUpperCase());
        if (car.fuel) displayTags.push(car.fuel.toUpperCase());
        
        // Merge with other tags, avoiding duplicates
        carTags.forEach(t => {
            if (!displayTags.includes(t.toUpperCase())) displayTags.push(t.toUpperCase());
        });

        // If still empty, provide some default premium ones
        if (displayTags.length === 0) {
            displayTags.push('PREMIUM', 'EXCLUSIVO');
        }
        
        const tagsHtml = displayTags.map(tag => `
            <span class="car-badge">${tag}</span>
        `).join('');

        return `
            <div class="car-card reveal" style="transition-delay: ${index * 0.05}s">
                <div class="car-img" style="background-image: url('${car.img || ''}')"></div>
                <div class="car-body">
                    <p class="car-brand-label">${car.brand}</p>
                    <h3>${car.model}</h3>
                    <p class="car-price">R$ ${parseFloat(car.price || 0).toLocaleString('pt-BR')}</p>
                    <div class="car-meta">
                        <span>${car.year}</span>
                        <span>•</span>
                        <span>${car.km} KM</span>
                    </div>
                    <!-- Spec Badges for Premium Look -->
                    <div class="car-specs">
                        ${tagsHtml}
                    </div>
                    <button onclick="contactWhatsAppCar(${car.id})" class="btn-card-cta" style="width:100%; cursor:pointer;">${s.cardCtaText || 'TENHO INTERESSE'}</button>
                </div>
            </div>
        `;
    }).join('');
}

function renderAdditionalBanners(banners) {
    const container = document.getElementById('extra-banners-container');
    const section = document.getElementById('destaques');
    if (!container || !section) return;

    if (banners.length === 0) {
        section.style.display = 'none';
        return;
    }

    section.style.display = 'block';
    container.innerHTML = banners.map(banner => {
        const isVideo = banner.url.toLowerCase().endsWith('.mp4') || 
                        banner.url.startsWith('data:video') || 
                        banner.url.includes('video');
        
        const mediaTag = isVideo 
            ? `<video autoplay muted loop playsinline src="${banner.url}"></video>` 
            : `<img src="${banner.url}" alt="Promoção">`;
        
        return `
            <div class="extra-banner-item">
                ${banner.link ? `<a href="${banner.link}" target="_blank">${mediaTag}</a>` : mediaTag}
            </div>
        `;
    }).join('');
}

function renderTestimonials(testis) {
    const container = document.getElementById('testimonials-container');
    if (!container) return;

    if (testis.length === 0) {
        const sec = container.closest('section');
        if (sec) sec.style.display = 'none';
        return;
    }

    container.innerHTML = testis.map(t => `
        <div class="reveal">
            <p style="font-style: italic; color: #888; margin-bottom: 20px;">"${t.msg}"</p>
            <strong style="font-size: 0.7rem; letter-spacing: 2px;">${t.name.toUpperCase()} ${t.role ? `<span style="opacity: 0.5; font-weight: 300;">| ${t.role.toUpperCase()}</span>` : ''}</strong>
        </div>
    `).join('');
    
    observeAnimations();
}

function filterByBrand(brand) {
    const cars = JSON.parse(localStorage.getItem(STORAGE_KEYS.CARS));
    const filtered = cars.filter(c => c.brand.toUpperCase() === brand.toUpperCase());
    renderInventory(filtered);
    document.getElementById('estoque').scrollIntoView({ behavior: 'smooth' });
}

function setupHeader() {
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
    });
}

function observeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// --- FINANCE MODAL LOGIC ---
function openFinanceModal(carName = '') {
    document.getElementById('finance-modal').classList.add('active');
    if (carName) {
        document.getElementById('finance-car').value = carName;
    }
}

function closeFinanceModal() {
    document.getElementById('finance-modal').classList.remove('active');
}

function contactWhatsAppCar(carId) {
    const cars = JSON.parse(localStorage.getItem(STORAGE_KEYS.CARS)) || [];
    const car = cars.find(c => c.id == carId);
    
    const carDetails = car ? `${car.brand} ${car.model} (${car.year})` : 'veículo';
    
    let msg = `Olá, tenho interesse no veículo abaixo que vi no site Brito Motors:\n\n`;
    msg += `🔹 *Modelo:* ${carDetails}\n`;
    if (car && car.price) msg += `🔹 *Valor:* R$ ${parseFloat(car.price || 0).toLocaleString('pt-BR')}\n`;
    if (car && car.km) msg += `🔹 *KM:* ${car.km} KM\n`;
    msg += `\nAguardo mais informações. Obrigado!`;

    window.location.href = getWhatsAppUrl(msg);
}

function getWhatsAppUrl(customMsg = '') {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)) || DEFAULT_SETTINGS;
    const num = (s.whatsapp || DEFAULT_SETTINGS.whatsapp || '').replace(/\D/g, '');
    const defaultMsg = "*CONTATO SITE BRITO MOTORS* 🏁\n\nOlá! Gostaria de falar com um consultor sobre os veículos disponíveis.";
    const text = encodeURIComponent(customMsg || defaultMsg);
    return num ? `https://api.whatsapp.com/send?phone=${num}&text=${text}` : '#';
}

function setupFloatingWhatsApp(url) {
    let btn = document.getElementById('floating-whatsapp');
    if (!btn) {
        btn = document.createElement('a');
        btn.id = 'floating-whatsapp';
        btn.innerHTML = `
            <svg width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
            </svg>
        </a>`;
        document.body.appendChild(btn);
    }
    btn.href = url;
    btn.target = "_blank";
}

function sendFinanceToWhatsApp() {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)) || DEFAULT_SETTINGS;

    const name = document.getElementById('finance-name').value.trim();
    const phone = document.getElementById('finance-phone').value.trim();
    const car = document.getElementById('finance-car').value.trim();

    if (!name || !phone) {
        alert('Por favor, preencha pelo menos seu Nome e Celular.');
        return;
    }

    let msg = `*SOLICITAÇÃO DE FINANCIAMENTO* 💰\n\n`;
    msg += `Gostaria de solicitar uma análise para:\n\n`;
    msg += `🔹 *Cliente:* ${name}\n`;
    msg += `🔹 *Contato:* ${phone}\n`;
    if (car) msg += `🔹 *Veículo:* ${car}\n`;
    msg += `\n📍 *Enviado via:* brito motors`;

    window.location.href = getWhatsAppUrl(msg);
}
