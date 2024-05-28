(function() {
    emailjs.init('YOUR_USER_ID'); // Replace 'YOUR_USER_ID' with your actual user ID from EmailJS
})();

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
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error translating the text.');
        });
});

document.getElementById('send-email-button').addEventListener('click', function() {
    const spanishText = document.getElementById('spanish-text').value;
    const emailAddress = document.getElementById('email-address').value;

    if (!spanishText) {
        alert('No translated text to send.');
        return;
    }

    if (!emailAddress) {
        alert('Please enter an email address.');
        return;
    }

    const templateParams = {
        message: spanishText,
        email: emailAddress
    };

    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            alert('Email sent successfully!');
        }, function(error) {
            console.error('Error:', error);
            alert('There was an error sending the email.');
        });
});
