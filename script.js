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
            document.getElementById('main-title').innerText = `Translation: ${spanishText}`;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error translating the text.');
        });
});

document.getElementById('send-email-button').addEventListener('click', function() {
    const spanishText = document.getElementById('spanish-text').value;
    const emailTitle = document.getElementById('email-title').value;

    if (!spanishText) {
        alert('No translated text to send.');
        return;
    }

    if (!emailTitle) {
        alert('Please enter a title for the email.');
        return;
    }

    // Send email using Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbx_aVWWjhX7oKfFGvAYAa476XyN0BMrPjsbdhrleqrfSwzI0D-JCc86Uhxejo7SjRd4/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'message': spanishText,
            'title': emailTitle
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
