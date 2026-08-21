// --- DYNAMIC CODES REMAINING LOGIC ---
let codesLeft = Math.floor(Math.random() * 5) + 16; 
const codesDisplay = document.getElementById('dynamic-codes');
if(codesDisplay) codesDisplay.innerText = codesLeft;

const urgencyInterval = setInterval(() => {
    if (codesLeft > 10) {
        if (Math.random() > 0.6) {
            codesLeft--;
            if(codesDisplay) {
                codesDisplay.innerText = codesLeft;
                codesDisplay.classList.remove('pulse-text');
                void codesDisplay.offsetWidth; 
                codesDisplay.classList.add('pulse-text');
            }
        }
    } else {
        clearInterval(urgencyInterval);
    }
}, 3000); 

// --- NAVIGATION LOGIC ---
function navTo(screenId) {
    document.querySelectorAll('.app-screen').forEach(el => {
        el.classList.add('hidden');
        el.classList.remove('block', 'slide-up', 'fade-in');
    });
    
    const target = document.getElementById(screenId);
    target.classList.remove('hidden');
    target.classList.add('block', screenId === 'screen-1' ? 'fade-in' : 'slide-up');

    // Reset button state if returning home
    if(screenId === 'screen-1') {
        document.getElementById('btn-text').style.display = 'block';
        document.getElementById('btn-loader').style.display = 'none';
    }
}

// --- MODAL SYSTEM ---
function showModal(type, title, msg, sub) {
    const modal = document.getElementById('dynamic-modal');
    const box = document.getElementById('dynamic-modal-box');
    
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-msg').innerText = msg;
    
    const subEl = document.getElementById('modal-sub');
    if(sub) { subEl.innerText = sub; subEl.classList.remove('hidden'); } 
    else { subEl.classList.add('hidden'); }

    document.getElementById('modal-icon-error').classList.add('hidden');
    document.getElementById('modal-icon-info').classList.add('hidden');
    document.getElementById('modal-icon-' + type).classList.remove('hidden');

    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modal.classList.add('opacity-100');
        box.classList.remove('scale-95');
        box.classList.add('scale-100');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('dynamic-modal');
    const box = document.getElementById('dynamic-modal-box');
    modal.classList.remove('opacity-100');
    modal.classList.add('opacity-0');
    box.classList.remove('scale-100');
    box.classList.add('scale-95');
    setTimeout(() => { modal.classList.add('hidden'); }, 300);
}

function showOfferInfo() {
    showModal('info', 'Offer Instructions', 'Click the green button, complete the required steps (like installing a free app or a quick survey), and wait 1-2 minutes for verification.', '');
}

// --- TRANSITION & VALIDATION LOGIC ---
function processRedeem() {
    const code = document.getElementById('input-code').value.trim();
    const username = document.getElementById('input-username').value.trim();

    if (!code && !username) return showModal('error', 'Missing Info', 'Please enter both the Code and your Roblox Username.', '');
    if (!code) return showModal('error', 'Missing Code', 'Please enter the secret reward code.', '');
    if (!username) return showModal('error', 'Missing Username', 'Please enter your Roblox username.', '');
    
    if (code.toUpperCase() !== "SECRET4") return showModal('error', 'Invalid Code', 'You have entered the wrong code. Please try again!', '(Use code: SECRET4)');

    document.getElementById('btn-text').style.display = 'none';
    document.getElementById('btn-loader').style.display = 'block';

    setTimeout(() => {
        document.getElementById('display-username').innerText = '@' + username;
        navTo('screen-2');
        fetchTasks();
    }, 2000);
}

// --- ADBLUEMEDIA OFFER FETCH LOGIC ---
function fetchTasks() {
    const abmUrl = "https://de6jvomfbm0af.cloudfront.net/public/offers/feed.php?user_id=779217&api_key=45665e45f6e0cc2e67c90724cfedcfe8&s1=&s2=&callback=?";

    $.getJSON(abmUrl, function(offers) {
        const container = $("#offers-container");
        container.empty(); 

        if (offers && offers.length > 0) {
            const maxOffers = Math.min(offers.length, 4);
            
            for(let i=0; i<maxOffers; i++) {
                let offer = offers[i];
                
                let html = `
                    <div class="relative flex items-center w-full mb-1">
                        <a href="${offer.url}" target="_blank" rel="noopener noreferrer" class="offer-btn pr-12">
                            ${offer.anchor || 'Complete this sponsor activity!'}
                        </a>
                        <button onclick="showOfferInfo()" class="absolute right-2 w-8 h-8 flex items-center justify-center bg-black/10 rounded-full text-white hover:bg-black/20 transition md:w-10 md:h-10 md:right-3" title="Offer Info">
                            <svg class="w-5 h-5 md:w-6 md:h-6 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </button>
                    </div>
                `;
                container.append(html);
            }
        } else {
            container.html('<p class="text-sm font-bold text-red-500 py-4">No tasks currently available in your region. Please disable VPN or Adblock.</p>');
        }
    }).fail(function() {
        $("#offers-container").html('<p class="text-sm font-bold text-red-500 py-4">Network error loading tasks. Please refresh.</p>');
    });
        }
    
