// script.js
document.getElementById('horoscope-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const birthDate = document.getElementById('birth-date').value;

    if (!name || !birthDate) {
        alert("အချက်အလက်များ ပြည့်စုံစွာ ဖြည့်သွင်းပေးပါ။");
        return;
    }

    showLoading();

    try {
        const response = await fetch('https://yemunbaydin-com.vercel.app/api/get-horoscope', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, birthDate }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const horoscopeText = data.horoscope;
        
        displayResult(horoscopeText);
    } catch (error) {
        console.error('Error:', error);
        alert('ဗေဒင်အဟောကို ခေါ်ယူရာတွင် အမှားဖြစ်ပွားပါသည်။');
    } finally {
        hideLoading();
    }
});

// ကျန်တဲ့ showLoading(), hideLoading(), displayResult() functions တွေက အတူတူပါပဲ။
function showLoading() {
    const form = document.getElementById('horoscope-form');
    const resultContainer = document.getElementById('result-container');
    const submitBtn = form.querySelector('button');

    submitBtn.textContent = "ဟောနေပါသည်...";
    submitBtn.disabled = true;
    resultContainer.classList.add('hidden');
}

function hideLoading() {
    const form = document.getElementById('horoscope-form');
    const submitBtn = form.querySelector('button');
    submitBtn.textContent = "ဗေဒင်ဟောပါ";
    submitBtn.disabled = false;
}

function displayResult(text) {
    const resultContainer = document.getElementById('result-container');
    const horoscopeTextDiv = document.getElementById('horoscope-text');
    
    horoscopeTextDiv.innerHTML = text.replace(/\n/g, '<br>');
    resultContainer.classList.remove('hidden');
}
