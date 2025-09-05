// /client/src/js/gallery.js

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons and add to the clicked one
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Get the category from the data-category attribute
            const category = button.dataset.category;

            // Loop through all gallery items
            galleryItems.forEach(item => {
                const itemCategory = item.dataset.category;

                // If 'all' is selected, or if the item's category matches the selected category, show it. Otherwise, hide it.
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});