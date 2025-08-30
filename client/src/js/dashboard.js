// /client/src/js/dashboard.js

// This function runs automatically when the script is loaded
document.addEventListener('DOMContentLoaded', async () => {

    // 1. --- Check for a token ---
    const token = localStorage.getItem('token');

    // If no token is found, the user is not logged in.
    // Redirect them to the login page and stop executing the script.
    if (!token) {
        window.location.href = './login.html';
        return;
    }

    // 2. --- If a token exists, fetch the user's data from the protected route ---
    try {
        // const response = await fetch('http://localhost:5000/api/users/me', {
        const response = await fetch('http://127.0.0.1:5000/api/users/me',{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            mode: 'cors' // Explicitly set the mode
        });

        // Check if the server actually responded successfully
        if (!response.ok) {
            // If not OK, handle it as a session expiry or server error
            localStorage.removeItem('token');
            const errorData = await response.json(); // Try to get an error message from the server
            alert('Session Error: ' + (errorData.message || 'Please log in again.'));
            window.location.href = './login.html';
            return; // Stop execution
        }

        const data = await response.json();
        populateDashboard(data); // Populate the dashboard only on a fully successful response

    } catch (error) {
        // This block now *only* catches true network errors (e.g., server is down)
        console.error('Network Error fetching dashboard data:', error);
        // alert('A network error occurred: Could not connect to the server. Is the server running?');
    }
});


// Helper function to update the HTML with the fetched data
function populateDashboard(userData) {
    document.getElementById('user-name').textContent = `${userData.associateName} ✓`;
    document.getElementById('user-id').textContent = `ID : ${userData.associateId}`;
    document.getElementById('user-mobile').textContent = `Mobile No : ${userData.mobile}`;
    document.getElementById('user-address').textContent = `Address : ${userData.address || 'Not Available'}`;
    document.getElementById('user-level').textContent = `Cur. Level : ${userData.currentLevel} %`;
}