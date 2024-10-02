document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/send-email', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            document.getElementById('thankYouMessage').innerText = "Thank you for contacting me!";
            document.getElementById('thankYouMessage').style.display = 'block';
        })
        .catch(error => console.error('Error:', error));
});

