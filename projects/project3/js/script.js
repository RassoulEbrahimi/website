// JavaScript to handle form submission and API call
function calculateTax() {
    const form = document.getElementById('steuerForm');
    const formData = new FormData(form);
    const data = {
        einkommen: formData.get('einkommen'),
        familienstand: formData.get('familienstand'),
        religion: formData.get('religion'),
        bundesland: formData.get('bundesland'),
        jahr: formData.get('jahr')
    };

    fetch('https://steuertaxi.onrender.com/webhook', { // <-- Stelle sicher, dass dies zu /webhook zeigt, wie im Flask-Code definiert
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Verwende die result.fulfillmentText, um die gewünschte Ausgabe zu formatieren
        document.getElementById('result').innerHTML = `
            <p class="result-value"><i>Zu versteuerndes Einkommen:</i> &#160;<strong> ${data.einkommen} €</strong></p>
            <p class="result-value"><i>Ihre Einkommensteuer beträgt:</i> &#160;<strong>  ${result.steuer} €</strong></p>
            <p class="result-value"><i>Kirchensteuer: </i>&#160;<strong>  ${result.kirchensteuer} €</strong></p>
            <p class="result-value"><i>Steuerklasse: </i> &#160;<strong>  ${result.steuerklasse} </strong></p>
            <p class="result-footnote">* Die Berechnungen erfolgen unter Berücksichtigung der Rundungsvorschriften.</p>
            <p class="result-footnote">* Splittingtarif für Verheiratete.</p>
        `;
    })
    .catch(error => console.error('Error:', error));
}

// Event listener to handle form submission
document.getElementById('steuerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateTax();
});

// JavaScript to handle the responsive navbar and dropdown
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    const dropdown = document.querySelector('.dropdown');
    dropdown.addEventListener('click', () => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        dropdownContent.classList.toggle('show');
    });
});


// JavaScript to handle menu icon for mobile view
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

