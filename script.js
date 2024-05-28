document.getElementById('translate-button').addEventListener('click', function() {
    const englishText = document.getElementById('english-text').value;

    if (!englishText) {
        alert('Please enter some text in English.');
        return;
    }

    // Use the Fetch API to call a translation API
    fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(englishText)}&langpair=en|es`)
        .then(response => response.json())
        .then(data => {
            const spanishText = data.responseData.translatedText;
            document.getElementById('spanish-text').value = spanishText;

            // Update the title dynamically
            document.title = `Translation: ${spanishText}`;
            document.getElementById('title').innerText = `Translation: ${spanishText}`;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error translating the text.');
        });
});

document.getElementById('send-email-button').addEventListener('click', function() {
    const spanishText = document.getElementById('spanish-text').value;

    if (!spanishText) {
        alert('No translated text to send.');
        return;
    }

    // Send email using Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbzAg7DcnKhIEYRQpvWn6B_c0oy2Zono3tQykyfsxcXL1UNPGjwnkor-4omN0aIymAcg/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'message': spanishText
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Email sent successfully!');
        } else {
            alert('There was an error sending the email.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending the email.');
    });
});
