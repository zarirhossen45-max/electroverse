// Default Category Array mapping specified requirements
const categoriesList = [
    "Mobile", "Laptop", "Desktop", "Television", "Refrigerator", "Air Conditioner", 
    "Washing Machine", "Fan", "UPS", "IPS", "Generator", "Router", "Arduino", 
    "Raspberry Pi", "Sensors", "Battery", "Solar", "Camera", "Drone", "Printer", 
    "Speaker", "Smart Watch", "IoT", "Robotics"
];

// Seed default profile state if Local Storage is fresh
if (!localStorage.getItem('profileData')) {
    const defaultProfile = {
        [span_5](start_span)[span_6](start_span)fullName: "Md. Zikrul Hossen Zarir", // From Admit Card/Application details[span_5](end_span)[span_6](end_span)
        bio: "Engineering student specializing in Electrical and Electronic Systems with primary core research configurations in circuit theories.",
        [span_7](start_span)[span_8](start_span)[span_9](start_span)education: "B.Sc. in Electrical and Electronic Engineering (1st Year, 1st Semester), National Institute of Textile Engineering and Research (NITER)", // From application info[span_7](end_span)[span_8](end_span)[span_9](end_span)
        skills: "Circuit Analysis, Nodal & Mesh Architecture, C Programming, HTML5, CSS3, Embedded Logic",
        interests: "Quantum Hardware Design, Automated IoT Implementations, Theoretical Relativistic Physics Node Layouts",
        email: "zarir@example.com",
        facebook: "https://facebook.com",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        website: "https://zarir.github.io"
    };
    localStorage.setItem('profileData', JSON.stringify(defaultProfile));
}

// Seed default electronics devices dataset array to Local Storage
if (!localStorage.getItem('electronicsDevices')) {
    const seedDevices = [
        {
            id: "1719842026",
            name: "Arduino Uno R3",
            brand: "Arduino",
            model: "Uno R3",
            category: "Arduino",
            releaseYear: "2010",
            image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100' height='100' fill='%2300878F'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='sans-serif' font-size='12'>Arduino Uno</text></svg>",
            description: "ATMega328P reference microcontroller evaluation and implementation structural node interface module.",
            features: "14 Digital Input/Output Nodes, 6 Analog Channels, 16MHz Quartz Crystal clock controller.",
            advantages: "Highly robust open-source structure, massive peripheral library support, secure voltage protection.",
            disadvantages: "Limited 32KB processing memory, single-threaded processing engine context constraints.",
            [span_10](start_span)voltage: "5V Internal / 7-12V External Recommended Range input limits[span_10](end_span).",
            power: "0.2W baseline operation performance structural metrics.",
            applications: "Prototyping automated instrumentation arrays, multi-sensor calibration data channels.",
            price: "2500 BDT",
            tags: "Microcontroller, Embedded, Atmega, DevBoard, Automation",
            videoLink: "https://www.youtube.com"
        }
    ];
    localStorage.setItem('electronicsDevices', JSON.stringify(seedDevices));
}

document.addEventListener("DOMContentLoaded", () => {
    // Hide Loader
    const loader = document.getElementById('loader');
    if(loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 300);
    }

    initHomepage();
    setupGlobalSearch();
    setupBackToTop();
});

// App Theme Controller Configuration Node
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    const icon = document.querySelector('#themeToggleBtn i');
    if(icon) {
        icon.className = newTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}

// Toast Engine
function showToast(message, type = 'success') {
    const container = document.querySelector('.toast-container');
    if(!container) return;
    const id = 'toast_' + Date.now();
    const toastHTML = `
        <div id="${id}" class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', toastHTML);
    const toastElement = document.getElementById(id);
    const bsToast = new bootstrap.Toast(toastElement);
    bsToast.show();
    toastElement.addEventListener('hidden.bs.toast', () => toastElement.remove());
}

// Home Engine Component Logic Context
function initHomepage() {
    const grid = document.getElementById('categoriesGrid');
    if(grid) {
        grid.innerHTML = categoriesList.map(cat => `
            <div class="col">
                <div class="p-3 text-center glass-card rounded shadow-sm h-100 cursor-pointer" onclick="filterByCategory('${cat}')">
                    <i class="fa-solid fa-microchip text-primary mb-2 fa-xl"></i>
                    <div class="fw-semibold small">${cat}</div>
                </div>
            </div>
        `).join('');
    }
    renderFeaturedDevices();
}

function renderFeaturedDevices() {
    const container = document.getElementById('featuredDevicesContainer');
    if(!container) return;
    const devices = JSON.parse(localStorage.getItem('electronicsDevices')) || [];
    
    if(devices.length === 0) {
        container.innerHTML = `<div class="col-12 text-center text-muted">No configuration profiles registered yet.</div>`;
        return;
    }

    container.innerHTML = devices.map(dev => `
        <div class="col-md-4">
            <div class="card h-100 glass-card border-0 shadow-sm overflow-hidden">
                <img src="${dev.image}" class="card-img-top object-fit-cover" style="height:200px;" alt="${dev.name}">
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-primary align-self-start mb-2">${dev.category}</span>
                    <h5 class="card-title fw-bold">${dev.name}</h5>
                    <p class="card-text text-muted text-truncate-3 flex-grow-1">${dev.description}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <span class="fw-bold text-success">${dev.price}</span>
                        <a href="device.html?id=${dev.id}" class="btn btn-sm btn-outline-primary px-3 rounded-pill">View Specs</a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Instant Live Global Search Component Engine
function setupGlobalSearch() {
    const input = document.getElementById('globalSearchInput');
    const output = document.getElementById('searchResults');
    if(!input || !output) return;

    input.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();
        if(!val) {
            output.classList.add('d-none');
            return;
        }

        const devices = JSON.parse(localStorage.getItem('electronicsDevices')) || [];
        const matches = devices.filter(d => 
            d.name.toLowerCase().includes(val) || 
            d.brand.toLowerCase().includes(val) || 
            d.category.toLowerCase().includes(val) || 
            d.tags.toLowerCase().includes(val)
        );

        if(matches.length === 0) {
            output.innerHTML = `<div class="p-3 text-muted">No matching devices detected.</div>`;
        } else {
            output.innerHTML = matches.map(m => `
                <a href="device.html?id=${m.id}" class="d-flex align-items-center p-2 border-bottom text-decoration-none text-body search-item-hover">
                    <img src="${m.image}" width="40" height="40" class="rounded me-2 object-fit-cover">
                    <div>
                        <div class="fw-bold small">${m.name}</div>
                        <div class="text-muted extra-small">${m.brand} | ${m.category}</div>
                    </div>
                </a>
            `).join('');
        }
        output.classList.remove('d-none');
    });

    document.addEventListener('click', (e) => {
        if(!input.contains(e.target) && !output.contains(e.target)) {
            output.classList.add('d-none');
        }
    });
}

// Back to top floating tracking node configuration logic
function setupBackToTop() {
    const mybutton = document.getElementById("btn-back-to-top");
    if(!mybutton) return;
    window.onscroll = function () {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    };
    mybutton.addEventListener("click", () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
}

function handleContactSubmit(e) {
    e.preventDefault();
    showToast("Thank you, Jarir Sir! Message transmission simulation executed successfully via Local Protocol Layer.");
    e.target.reset();
          }
  
