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
