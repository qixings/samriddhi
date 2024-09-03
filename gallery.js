document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const captionText = document.getElementById('caption');
    const backButton = document.getElementById('back-button');

    // Load the event data from the JSON file
    fetch('events.json')
        .then(response => response.json())
        .then(data => {
            data.events.forEach((event, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <a href="#" onclick="showEventGallery(${index})">
                        <img src="${event.images[0]}" alt="${event.title}">
                        <div class="overlay">${event.title}</div>
                    </a>
                `;
                galleryGrid.appendChild(galleryItem);
            });

            // Add click event listener to each image for lightbox
            document.querySelectorAll('.gallery-item img').forEach(image => {
                image.addEventListener('click', function(e) {
                    e.preventDefault();
                    lightbox.style.display = 'block';
                    lightboxImg.src = this.src;
                    captionText.innerHTML = this.alt;
                });
            });
        });

    // Hide the lightbox when the close button is clicked
    document.querySelector('.lightbox .close').addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    // Function to show event gallery
    window.showEventGallery = function(index) {
        fetch('events.json')
            .then(response => response.json())
            .then(data => {
                const event = data.events[index];
                let galleryHTML = '';
                event.images.forEach(image => {
                    galleryHTML += `
                        <div class="gallery-item">
                            <img src="${image}" alt="${event.title}">
                        </div>
                    `;
                });
                galleryGrid.innerHTML = galleryHTML;
                backButton.style.display = 'block';

                // Add click event listener to each image for lightbox
                document.querySelectorAll('.gallery-item img').forEach(image => {
                    image.addEventListener('click', function(e) {
                        e.preventDefault();
                        lightbox.style.display = 'block';
                        lightboxImg.src = this.src;
                        captionText.innerHTML = this.alt;
                    });
                });
            });
    };

    // Go back to event folders
    backButton.addEventListener('click', function() {
        fetch('events.json')
            .then(response => response.json())
            .then(data => {
                let galleryHTML = '';
                data.events.forEach((event, index) => {
                    galleryHTML += `
                        <div class="gallery-item">
                            <a href="#" onclick="showEventGallery(${index})">
                                <img src="${event.images[0]}" alt="${event.title}">
                                <div class="overlay">${event.title}</div>
                            </a>
                        </div>
                    `;
                });
                galleryGrid.innerHTML = galleryHTML;
                backButton.style.display = 'none';
            });
    });
});
