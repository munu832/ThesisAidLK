document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
    });

    const videoScroll = document.querySelector('.video-scroll');
    const scrollLeftBtn = document.querySelector('.scroll-btn.left');
    const scrollRightBtn = document.querySelector('.scroll-btn.right');

    scrollLeftBtn.addEventListener('click', () => {
        videoScroll.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });

    scrollRightBtn.addEventListener('click', () => {
        videoScroll.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });

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
                alert('Thank you for your request. We will get back to you promptly!');
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
                    alert('Thank you for your request. We will get back to you promptly!');
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
});
