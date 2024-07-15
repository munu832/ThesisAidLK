// Slideshow functionality
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 4000); // Change image every 4 seconds
}

// Form submission
document.getElementById('jobRequestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwFxQyjSXYU5fES1lw56gMu3S-yKp7Re5_borrTG06ZWY_hfyf9uiFRYV0z7Ttt2sA/exec';

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.type === 'opaque') {
            console.log('Form submitted successfully');
            alert('Thank you for your request. We will get back to you soon!');
            form.reset();
        } else {
            return response.text();
        }
    })
    .then(text => {
        if (text) {
            console.log('Response:', text);
            const result = JSON.parse(text);
            if (result.result === 'success') {
                alert('Thank you for your request. We will get back to you soon!');
                form.reset();
            } else {
                throw new Error(result.message || 'Unknown error');
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
});

// Add animation to services
const serviceItems = document.querySelectorAll('.services li');
serviceItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('fadeIn');
});
