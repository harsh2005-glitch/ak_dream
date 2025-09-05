// /client/src/js/contact.js

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form-block form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('http://localhost:5000/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                alert(result.message); // Show the success or error message from the server

                if (response.ok) {
                    contactForm.reset(); // Clear the form on successful submission
                }

            } catch (error) {
                console.error('Failed to submit form:', error);
                alert('An error occurred. Please check the console and try again.');
            }
        });
    }
});