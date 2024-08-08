document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('upload-form');
    const resultSection = document.getElementById('result-section');
    const generatedContent = document.getElementById('generated-content');
    const downloadPdfBtn = document.getElementById('download-pdf');
    const downloadDocxBtn = document.getElementById('download-docx');

    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate file processing and Bewerbung generation
        setTimeout(() => {
            resultSection.style.display = 'block';
            generatedContent.innerHTML = '<p>Ihre maßgeschneiderte Bewerbung wurde erfolgreich generiert. Sie können sie jetzt herunterladen.</p>';
            
            // Scroll to the result section
            resultSection.scrollIntoView({ behavior: 'smooth' });
        }, 2000); // Simulating a 2-second processing time
    });

    downloadPdfBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('PDF-Download-Funktion wird implementiert.');
    });

    downloadDocxBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('DOCX-Download-Funktion wird implementiert.');
    });
});