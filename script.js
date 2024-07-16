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
        
        // Validate WhatsApp number
        const whatsappNumber = data.whatsapp;
        if (whatsappNumber && !isValidWhatsAppNumber(whatsappNumber)) {
            alert('Please enter a valid WhatsApp number. It should start with a country code (e.g., +1 for USA) and contain 10-15 digits.');
            return;
        }
        
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

    function isValidWhatsAppNumber(number) {
        // Remove all non-digit characters
        const cleanNumber = number.replace(/\D/g, '');
        
        // Check if the number starts with a plus sign
        const startsWithPlus = number.startsWith('+');
        
        // The number should start with a plus sign and have 10-15 digits
        if (startsWithPlus && cleanNumber.length >= 10 && cleanNumber.length <= 15) {
            // Check if the number starts with a valid country code
            const validPrefixes = ['1', '20', '27', '30', '31', '32', '33', '34', '36', '39', '40', '41', '43', '44', '45', '46', '47', '48', '49',
 '51', '52', '53', '54', '55', '56', '57', '58', '60', '61', '62', '63', '64', '65', '66', '81', '82', '84', '86', 
 '90', '91', '92', '93', '94', '95', '98', '211', '212', '213', '216', '218', '220', '221', '222', '223', '224', 
 '225', '226', '227', '228', '229', '230', '231', '232', '233', '234', '235', '236', '237', '238', '239', '240', 
 '241', '242', '243', '244', '245', '246', '247', '248', '249', '250', '251', '252', '253', '254', '255', '256', 
 '257', '258', '260', '261', '262', '263', '264', '265', '266', '267', '268', '269', '290', '291', '297', '298', 
 '299', '350', '351', '352', '353', '354', '355', '356', '357', '358', '359', '370', '371', '372', '373', '374', 
 '375', '376', '377', '378', '379', '380', '381', '382', '383', '385', '386', '387', '389', '420', '421', '423', 
 '500', '501', '502', '503', '504', '505', '506', '507', '508', '509', '590', '591', '592', '593', '594', '595', 
 '596', '597', '598', '599', '670', '672', '673', '674', '675', '676', '677', '678', '679', '680', '681', '682', 
 '683', '685', '686', '687', '688', '689', '690', '691', '692', '850', '852', '853', '855', '856', '880', '886', 
 '960', '961', '962', '963', '964', '965', '966', '967', '968', '970', '971', '972', '973', '974', '975', '976', 
 '977', '992', '993', '994', '995', '996', '998']

            return validPrefixes.some(prefix => cleanNumber.startsWith(prefix));
        }
        
        return false;
    }
});
