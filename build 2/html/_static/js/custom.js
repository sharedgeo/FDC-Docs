document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img'); // Select all images

    images.forEach(img => {
        img.style.cursor = 'zoom-in'; // Indicate clickability
        img.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.classList.add('lightbox-overlay');

            const fullImage = document.createElement('img');
            fullImage.src = this.src;
            fullImage.classList.add('lightbox-image');

            overlay.appendChild(fullImage);
            document.body.appendChild(overlay);

            overlay.addEventListener('click', function() {
                document.body.removeChild(this); // Close on click
            });
        });
    });
});