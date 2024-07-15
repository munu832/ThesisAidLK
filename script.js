document.getElementById('jobRequestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxBtwIpRzsf6g7d3-YDTn-P46p124--P9Rx73L5stEkYJw7gur5mUB0PqngsPiTjWw/exec';

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        alert('Thank you for your request. We will get back to you soon!');
        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
});
