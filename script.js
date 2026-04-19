let currentPet = '';

// Function para sa pag-filter ng mga aso at pusa
function filterPets(category, btn) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(b => b.classList.remove('active'));
    if(btn) btn.classList.add('active');

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-type') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Function para buksan ang Pet Info Modal
function openPetModal(name, type, age, sex, breed, desc, img) {
    currentPet = name;
    document.getElementById('modalName').textContent = name;
    document.getElementById('modalType').textContent = type;
    document.getElementById('modalAge').textContent = age;
    document.getElementById('modalSex').textContent = sex;
    document.getElementById('modalBreed').textContent = breed;
    document.getElementById('modalDesc').textContent = desc;
    document.getElementById('modalImg').src = img;
    
    document.getElementById('petModalOverlay').classList.add('active');
}

// Function para isara ang Pet Info Modal
function closePetModal() {
    document.getElementById('petModalOverlay').classList.remove('active');
}

// Function para buksan ang Adoption Form Panel
function openAdoptPanel() {
    closePetModal();
    document.getElementById('panelPetName').textContent = currentPet;
    document.getElementById('adoptOverlay').classList.add('active');
    setTimeout(() => {
        document.getElementById('adoptPanel').classList.add('open');
    }, 10);
    pGoTo(1);
}

// Function para isara ang Adoption Form Panel
function closeAdoptPanel() {
    document.getElementById('adoptPanel').classList.remove('open');
    setTimeout(() => {
        document.getElementById('adoptOverlay').classList.remove('active');
        pGoTo(1);
        document.getElementById('pstepSuccess').classList.remove('active');
        document.getElementById('pstep1').classList.add('active');
    }, 400);
}

// Function para sa Next at Back buttons ng Form
function pGoTo(step) {
    document.querySelectorAll('.panel-form-step').forEach(el => el.classList.remove('active'));
    
    document.querySelectorAll('.panel-step-dot').forEach((el, index) => {
        el.classList.remove('active');
        if (index + 1 < step) el.classList.add('done');
        else el.classList.remove('done');
    });
    
    if(step <= 3) {
        document.getElementById('pdot' + step).classList.add('active');
        document.getElementById('pstep' + step).classList.add('active');
    }

    if (step === 3) buildPSummary();
}

// Function para ipakita ang Summary bago mag-submit
function buildPSummary() {
    const summaryBox = document.getElementById('pSummaryBox');
    if(summaryBox) {
        summaryBox.innerHTML = `
            <div class="summary-row"><span>Pet to Adopt:</span><strong>${currentPet}</strong></div>
        `;
    }
}

// Function para i-submit ang Adoption Form
function pSubmit() {
    const agree = document.getElementById('pAgree');
    if (agree && !agree.checked) {
        alert("Please agree to the adoption policies.");
        return;
    }
    document.querySelectorAll('.panel-form-step').forEach(el => el.classList.remove('active'));
    const successStep = document.getElementById('pstepSuccess');
    if(successStep) successStep.classList.add('active');
    const successPetName = document.getElementById('successPetName');
    if(successPetName) successPetName.textContent = currentPet;
}

// Para naman ito sa Surrender Form
function submitForm(e) {
    e.preventDefault();
    alert("Surrender form submitted successfully! We will be in touch shortly.");
    e.target.reset();
}