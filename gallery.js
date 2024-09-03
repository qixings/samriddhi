document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const captionText = document.getElementById('caption');
    const backButton = document.getElementById('back-button');
    const searchBar = document.getElementById('search-bar');
    let currentImageIndex = 0;
    let currentImages = [];

    // Ensure the lightbox is hidden by default
    lightbox.style.display = 'none';

    // Load the event data from the JSON file
    fetch('events.json')
        .then(response => response.json())
        .then(data => {
            data.events.forEach((event, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.innerHTML = `
                    <a href="#" onclick="showEventGallery(${index}); return false;">
                        <img src="${event.images[0]}" alt="${event.title}">
                        <div class="overlay">${event.title}</div>
                    </a>
                `;
                galleryGrid.appendChild(galleryItem);
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
                currentImages = event.images;
                let galleryHTML = '';
                event.images.forEach((image, i) => {
                    galleryHTML += `
                        <div class="gallery-item smaller-gallery-item">
                            <img src="${image}" alt="${event.title}" onclick="openLightbox(${i})">
                        </div>
                    `;
                });
                galleryGrid.innerHTML = galleryHTML;
                galleryGrid.classList.add('smaller-gallery-grid'); // Add smaller grid class
                backButton.style.display = 'block';
            });
    };

    // Open lightbox with selected image
    window.openLightbox = function(index) {
        currentImageIndex = index;
        lightbox.style.display = 'block';
        updateLightboxImage();
    };

    // Update the lightbox image
    function updateLightboxImage() {
        lightboxImg.src = currentImages[currentImageIndex];
        captionText.innerHTML = `Image ${currentImageIndex + 1} of ${currentImages.length}`;
    }

    // Next/previous controls
    document.querySelector('.prev').addEventListener('click', function() {
        currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : currentImages.length - 1;
        updateLightboxImage();
    });

    document.querySelector('.next').addEventListener('click', function() {
        currentImageIndex = (currentImageIndex < currentImages.length - 1) ? currentImageIndex + 1 : 0;
        updateLightboxImage();
    });

    // Go back to event folders
    backButton.addEventListener('click', function() {
        fetch('events.json')
            .then(response => response.json())
            .then(data => {
                let galleryHTML = '';
                data.events.forEach((event, index) => {
                    galleryHTML += `
                        <div class="gallery-item">
                            <a href="#" onclick="showEventGallery(${index}); return false;">
                                <img src="${event.images[0]}" alt="${event.title}">
                                <div class="overlay">${event.title}</div>
                            </a>
                        </div>
                    `;
                });
                galleryGrid.innerHTML = galleryHTML;
                galleryGrid.classList.remove('smaller-gallery-grid'); // Remove smaller grid class
                backButton.style.display = 'none';
            });
    });

    // Filter gallery items based on search input
    searchBar.addEventListener('keyup', function() {
        const filter = searchBar.value.toLowerCase();
        const galleryItems = document.querySelectorAll('.gallery-item');

        galleryItems.forEach(item => {
            const title = item.querySelector('.overlay').innerText.toLowerCase();
            if (title.includes(filter)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });
});
