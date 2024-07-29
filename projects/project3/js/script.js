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
            <div>Zu versteuerndes Einkommen: ${data.einkommen} €</div>
            <div>Ihre Einkommensteuer beträgt: ${result.steuer} €</div>
            <div>Kirchensteuer: ${result.kirchensteuer} €</div>
            <div>Steuerklasse: ${result.steuerklasse}</div>
            <div>*</div>
            <div>* Die Berechnungen erfolgen unter Berücksichtigung der Rundungsvorschriften.</div>
        `;
    })
    .catch(error => console.error('Error:', error));
}

// Event listener to handle form submission
document.getElementById('steuerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateTax();
});
