// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Select the elements
    const enquiryBtn = document.getElementById('enquiry-btn');
    const modal = document.getElementById('enquiry-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    // Function to open the modal
    function openModal() {
        modal.classList.add('active');
    }

    // Function to close the modal
    function closeModal() {
        modal.classList.remove('active');
    }

    // Event Listeners
    if (enquiryBtn && modal && closeModalBtn) {
        enquiryBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the link from navigating
            openModal();
        });

        closeModalBtn.addEventListener('click', closeModal);

        // Close the modal if user clicks on the overlay
        modal.addEventListener('click', (e) => {
            // Check if the click is on the overlay itself and not the content
            if (e.target === modal) {
                closeModal();
            }
        });
    }

});