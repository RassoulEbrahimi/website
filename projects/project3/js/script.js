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
        document.getElementById('result').innerHTML = `
            <p>Einkommensteuer: ${result.fulfillmentText} €</p> 
            <!-- Verwendung von fulfillmentText -->
            <!-- Weitere Ergebnisse hier anzeigen -->
        `;
    })
    .catch(error => console.error('Error:', error));
}
