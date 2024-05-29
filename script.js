// Get all star elements
const stars = document.querySelectorAll('.star');

// Add click event listener to each star
stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        const rating = index + 1; // Rating is index + 1 (stars are 1-indexed)
        const starsContainer = star.parentNode;
        
        // Set the data-rating attribute of the stars container to the selected rating
        starsContainer.setAttribute('data-rating', rating);

        // Toggle 'active' class for each star based on the selected rating
        stars.forEach((s, i) => {
            if (i < rating) {
                s.classList.add('active'); // Add 'active' class for stars up to selected rating
            } else {
                s.classList.remove('active'); // Remove 'active' class for stars beyond selected rating
            }
        });
    });
});
