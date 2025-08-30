// /client/src/js/auth.js

// Check if we are on the registration page by looking for the form
const registerForm = document.getElementById('register-form');

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        // Prevent the default browser form submission
        e.preventDefault();

        // --- Create a FormData object from the form ---
        const formData = new FormData(registerForm);

        // --- Convert FormData to a plain JavaScript object ---
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // --- Send the data to our backend API ---
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Convert JS object to a JSON string
            });

            const result = await response.json(); // Parse the JSON response from the server

            if (response.ok) { // Status code 200-299
                alert('Registration successful!');

                // Save the token to localStorage for the user's session
                localStorage.setItem('token', result.token);

                // Redirect to the dashboard
                window.location.href = './dashboard.html';

            } else { // Handle errors (e.g., sponsor not found, user exists)
                alert('Error: ' + result.message);
            }

        } catch (error) {
            console.error('Submission failed:', error);
            alert('An error occurred. Please try again.');
        }
    });
}

// We will add the login form logic here later
const loginForm = document.getElementById('login-form');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(loginForm);
        const data = {};
        formData.forEach((value, key) => { data[key] = value });

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Login successful!');
                localStorage.setItem('token', result.token);
                window.location.href = './dashboard.html';
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('An error occurred. Please try again.');
        }
    });
}