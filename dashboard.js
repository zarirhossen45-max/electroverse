// Verification validation guard layer for administrator security tracking state session verification
if (localStorage.getItem('adminSessionActive') !== 'true') {
    window.location.href = 'login.html';
}

document.addEventListener("DOMContentLoaded", () => {
    populateCategorySelects();
    loadProfileIntoForm();
    refreshDashboardStats();
    renderAdminTable();
});

function populateCategorySelects() {
    const sel = document.getElementById('devCategory');
    if(!sel) return;
    sel.innerHTML = categoriesList.map(c => `<option value="${c}">${c}</option>`).join('');
}

function switchTab(tabId) {
    document.querySelectorAll('.db-tab-content').forEach(el => el.classList.add('d-none'));
    const targeted = document.getElementById(`tab-${tabId}`);
    if(targeted) targeted.classList.remove('d-none');

    const links = document.querySelectorAll('#dashboardNavTabs .nav-link');
    links.forEach(l => l.classList.remove('active'));
    
    const activeLink = Array.from(links).find(l => l.getAttribute('onclick').includes(tabId));
    if(activeLink) activeLink.classList.add('active');
}

function adminLogout() {
    localStorage.removeItem('adminSessionActive');
    window.location.href = 'index.html';
}

// Profile Data Hydration Control Flow Processing Logic Unit
function loadProfileIntoForm() {
    const data = JSON.parse(localStorage.getItem('profileData'));
    if(!data) return;
    document.getElementById('profName').value = data.fullName;
    document.getElementById('profEmail').value = data.email;
    document.getElementById('profEdu').value = data.education;
    document.getElementById('profBio').value = data.bio;
    document.getElementById('profSkills').value = data.skills;
    document.getElementById('profInterests').value = data.interests;
    document.getElementById('profGit').value = data.github;
    document.getElementById('profIn').value = data.linkedin;
    document.getElementById('profWeb').value = data.website;
}

function saveProfileAdmin(e) {
    e.preventDefault();
    const updated = {
        fullName: document.getElementById('profName').value,
        email: document.getElementById('profEmail').value,
        education: document.getElementById('profEdu').value,
        bio: document.getElementById('profBio').value,
        skills: document.getElementById('profSkills').value,
        interests: document.getElementById('profInterests').value,
        github: document.getElementById('profGit').value,
        linkedin: document.getElementById('profIn').value,
        website: document.getElementById('profWeb').value
    };
    localStorage.setItem('profileData', JSON.stringify(updated));
    alert('Global platform owner identification schema parameters synchronized successfully.');
}

// Multi-field Form Storage & Device Editing Unit Engine Logic
function handleDeviceSubmission(e) {
    e.preventDefault();
    const fileInput = document.getElementById('devImgFile');
    const editId = document.getElementById('editDeviceId').value;
    
    if (fileInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(event) {
            commitDeviceData(event.target.result, editId);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        let fallbackImg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100%' height='100%' fill='%236c757d'/></svg>";
        if(editId) {
            const devices = JSON.parse(localStorage.getItem('electronicsDevices')) || [];
            const found = devices.find(d => d.id === editId);
            if(found) fallbackImg = found.image;
        }
        commitDeviceData(fallbackImg, editId);
    }
}

function commitDeviceData(base64Image, editId) {
    const devices = JSON.parse(localStorage.getItem('electronicsDevices')) || [];
    
    const deviceObj = {
        id: editId ? editId : 'dev_' + Date.now(),
        name: document.getElementById('devName').value.trim(),
        brand: document.getElementById('devBrand').value.trim(),
        category: document.getElementById('devCategory').value,
        model: document.getElementById('devModel').value.trim(),
        releaseYear: document.getElementById('devYear').value.trim(),
        image: base64Image,
        voltage: document.getElementById('devVoltage').value.trim(),
        power: document.getElementById('devPower').value.trim(),
        price: document.getElementById('devPrice').value.trim(),
        tags: document.getElementById('devTags').value.trim(),
        videoLink: document.getElementById('devVideo').value.trim(),
        description: document.getElementById('devDesc').value.trim(),
        features: document.getElementById('devFeatures').value.trim(),
        advantages: document.getElementById('devAdv').value.trim(),
        disadvantages: document.getElementById('devDisadv').value.trim(),
        applications: document.getElementById('devApps').value.trim()
    };

    if(editId) {
        const index = devices.findIndex(d => d.id === editId);
        devices[index] = deviceObj;
        alert('Device specific metrics recalculated and updated inside storage array vector.');
    } else {
        devices.push(deviceObj);
        alert('New configuration instance saved completely to local system framework pipeline.');
    }

    localStorage.setItem('electronicsDevices', JSON.stringify(devices));
    resetDeviceForm();
    refreshDashboardStats();
    renderAdminTable();
    switchTab('manageDevices');
}

function renderAdminTable() {
    const tbody = document.getElementById('adminDevicesTableBody');
    if(!tbody) return;
    const devices = JSON.parse(localStorage.getItem('electronicsDevices')) || [];

    tbody.innerHTML = devices.map(d => `
        <tr>
            <td><img src="${d.image}" width="50" class="rounded object-fit-cover"></td>
            <td class="fw-bold">${d.name}</td>
            <td><span class="badge bg-secondary">${d.category}</span></td>
            <td>${d.brand}</td>
            <td class="text-success fw-bold">${d.price}</td>
            <td>
                <button class="btn btn-sm btn-info me-1" onclick="loadDeviceToEdit('${d.id}')"><i class="fa-solid fa-pen"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteDeviceNode('${d.id}')"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function loadDeviceToEdit(id) {
    const devices = JSON.parse(localStorage.getItem('electronicsDevices')) || [];
    const d = devices.find(item => item.id === id);
    if(!d) return;

    document.getElementById('editDeviceId').value = d.id;
    document.getElementById('devName').value = d.name;
    document.getElementById('devBrand').value = d.brand;
    document.getElementById('devCategory').value = d.category;
    document.getElementById('devModel').value = d.model;
    document.getElementById('devYear').value = d.releaseYear;
    document.getElementById('devVoltage').value = d.voltage;
    document.getElementById('devPower').value = d.power;
    document.getElementById('devPrice').value = d.price;
    document.getElementById('devTags').value = d.tags;
    document.getElementById('devVideo').value = d.videoLink;
    document.getElementById('devDesc').value = d.description;
    document.getElementById('devFeatures').value = d.features;
    document.getElementById('devAdv').value = d.advantages;
    document.getElementById('devDisadv').value = d.disadvantages;
    document.getElementById('devApps').value = d.applications;

    document.getElementById('uploadTitle').innerText = "Modify Existing Architecture Parameters Matrix";
    document.getElementById('btnSubmitDevice').innerText = "Commit Revision Structural Updates";
    switchTab('uploadDevice');
}

function deleteDeviceNode(id) {
    if(confirm('Are you absolutely certain to erase this component node pattern registration?')) {
        let devices = JSON.parse(localStorage.getItem('electronicsDevices')) || [];
        devices = devices.filter(d => d.id !== id);
        localStorage.setItem('electronicsDevices', JSON.stringify(devices));
        refreshDashboardStats();
        renderAdminTable();
    }
}

function resetDeviceForm() {
    document.getElementById('deviceUploadForm').reset();
    document.getElementById('editDeviceId').value = '';
    document.getElementById('uploadTitle').innerText = "Register Novel Hardware Node Profile";
    document.getElementById('btnSubmitDevice').innerText = "Commit Specs to Matrix";
}

function refreshDashboardStats() {
    const devices = JSON.parse(localStorage.getItem('electronicsDevices')) || [];
    const target = document.getElementById('dbCountDevices');
    if(target) target.innerText = devices.length;
}
