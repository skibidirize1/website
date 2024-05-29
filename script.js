document.getElementById('translate-button').addEventListener('click', function() {
    const englishText = document.getElementById('english-text').value;
    const emailTitle = document.getElementById('email-title').value;

    if (!englishText) {
        alert('Please enter some text in English.');
        return;
    }

    if (!emailTitle) {
        alert('Please enter a title in English.');
        return;
    }

    // Function to translate text using MyMemory API
    function translateText(text, langpair) {
        return fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langpair}`)
            .then(response => response.json())
            .then(data => data.responseData.translatedText);
    }

    // Translate both the title and the text
    Promise.all([
        translateText(emailTitle, 'en|es'),
        translateText(englishText, 'en|es')
    ]).then(([translatedTitle, translatedText]) => {
        document.getElementById('spanish-title').value = translatedTitle;
        document.getElementById('spanish-text').value = translatedText;

        // Update the title dynamically
        document.title = `Translation: ${translatedTitle}`;
        document.getElementById('main-title').innerText = `Translation: ${translatedTitle}`;
    }).catch(error => {
        console.error('Error:', error);
        alert('There was an error translating the text.');
    });
});

document.getElementById('send-email-button').addEventListener('click', function() {
    const spanishText = document.getElementById('spanish-text').value;
    const spanishTitle = document.getElementById('spanish-title').value;

    if (!spanishText) {
        alert('No translated text to send.');
        return;
    }

    if (!spanishTitle) {
        alert('No translated title to send.');
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
            'title': spanishTitle
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
