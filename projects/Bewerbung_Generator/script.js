document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const uploadForm = document.getElementById('upload-form');
    const fileInputs = document.getElementById('file-inputs');
    const textInputs = document.getElementById('text-inputs');
    const toggleFileBtn = document.getElementById('toggle-file');
    const toggleTextBtn = document.getElementById('toggle-text');
    const lebenslaufInput = document.getElementById('lebenslauf');
    const jobbeschreibungInput = document.getElementById('jobbeschreibung');
    const resultSection = document.getElementById('result-section');
    const generatedContent = document.getElementById('generated-content');
    const costInfo = document.getElementById('cost-info');
    const downloadPdfBtn = document.getElementById('download-pdf');
    const downloadDocxBtn = document.getElementById('download-docx');

    // Toggle between file and text inputs
    toggleFileBtn.addEventListener('click', function() {
        fileInputs.style.display = 'block';
        textInputs.style.display = 'none';
        toggleFileBtn.classList.add('active');
        toggleTextBtn.classList.remove('active');
    });

    toggleTextBtn.addEventListener('click', function() {
        fileInputs.style.display = 'none';
        textInputs.style.display = 'block';
        toggleFileBtn.classList.remove('active');
        toggleTextBtn.classList.add('active');
    });

    // Function to validate file type
    function validateFileType(file, allowedTypes) {
        return allowedTypes.includes(file.type);
    }

    // Function to display file name
    function displayFileName(input) {
        const fileName = input.files[0].name;
        const fileNameDisplay = input.nextElementSibling || document.createElement('span');
        fileNameDisplay.textContent = `Selected file: ${fileName}`;
        fileNameDisplay.className = 'file-name-display';
        if (!input.nextElementSibling) {
            input.parentNode.insertBefore(fileNameDisplay, input.nextSibling);
        }
    }

    // Event listeners for file inputs
    lebenslaufInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (validateFileType(file, ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'])) {
            displayFileName(this);
        } else {
            alert('Bitte wählen Sie eine PDF-, DOCX- oder TXT-Datei für Ihren Lebenslauf aus.');
            this.value = ''; // Clear the input
        }
    });

    jobbeschreibungInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (validateFileType(file, ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'])) {
            displayFileName(this);
        } else {
            alert('Bitte wählen Sie eine PDF-, DOCX- oder TXT-Datei für Ihre Jobbeschreibung aus.');
            this.value = ''; // Clear the input
        }
    });

    // Form submission
    uploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        let lebenslauf, stellenanzeige;
        let isFileUpload = fileInputs.style.display !== 'none';

        if (isFileUpload) {
            // File upload logic
            const lebenslaufFile = document.getElementById('lebenslauf').files[0];
            const jobbeschreibungFile = document.getElementById('jobbeschreibung').files[0];

            if (!lebenslaufFile || !jobbeschreibungFile) {
                alert('Bitte wählen Sie sowohl eine Lebenslauf- als auch eine Jobbeschreibungsdatei aus.');
                return;
            }

            lebenslauf = await lebenslaufFile.text();
            stellenanzeige = await jobbeschreibungFile.text();
        } else {
            // Text input logic
            lebenslauf = document.getElementById('lebenslauf-text').value;
            stellenanzeige = document.getElementById('jobbeschreibung-text').value;

            if (!lebenslauf || !stellenanzeige) {
                alert('Bitte geben Sie sowohl den Lebenslauf als auch die Jobbeschreibung ein.');
                return;
            }
        }

        // Show loading indicator
        generatedContent.innerHTML = '<p>Ihre Bewerbung wird generiert... Bitte warten Sie.</p>';
        resultSection.style.display = 'block';

        try {
            const response = await fetch('http://localhost:5000/generate_bewerbung', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lebenslauf, stellenanzeige }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            generatedContent.innerHTML = `<pre>${data.bewerbung}</pre>`;
            costInfo.textContent = `Geschätzte Kosten: ${data.estimated_cost}`;
            
            // Enable download buttons
            downloadPdfBtn.style.display = 'inline-block';
            downloadDocxBtn.style.display = 'inline-block';

            // Scroll to the result section
            resultSection.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Error:', error);
            generatedContent.innerHTML = '<p>Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.</p>';
        }
    });

    // Download button event listeners (placeholders for now)
    downloadPdfBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('PDF-Download-Funktion wird implementiert.');
    });

    downloadDocxBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('DOCX-Download-Funktion wird implementiert.');
    });
});