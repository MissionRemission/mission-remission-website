/* ========================================
   GOOGLE DRIVE GALLERY INTEGRATION
   ======================================== */

// SETUP INSTRUCTIONS:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select existing one
// 3. Enable Google Drive API
// 4. Create credentials (API Key)
// 5. Replace 'YOUR_API_KEY_HERE' below with your actual API key
// 6. Create a public Google Drive folder for your gallery photos
// 7. Right-click the folder → Share → Get link → Set to "Anyone with the link can view"
// 8. Copy the folder ID from the URL (the part after /folders/)
// 9. Replace 'YOUR_FOLDER_ID_HERE' below with your folder ID

const GOOGLE_API_KEY = 'AIzaSyDrHGEOjkN9gikDRKPSF7UEYXKOFh9RiMA';
const DRIVE_FOLDER_ID = '1MuaHw6TFwiAM6mR5SNAUmDpzocvRGMuQ';

let galleryImages = [];
let currentImageIndex = 0;

// Load photos from Google Drive
async function loadGalleryPhotos() {
    const loadingMessage = document.getElementById('loading-message');
    const galleryGrid = document.getElementById('gallery-grid');
    const errorMessage = document.getElementById('error-message');

    // Check if API key and folder ID are configured
    if (GOOGLE_API_KEY === 'YOUR_API_KEY_HERE' || DRIVE_FOLDER_ID === 'YOUR_FOLDER_ID_HERE') {
        loadingMessage.style.display = 'none';
        errorMessage.style.display = 'block';
        return;
    }

    try {
        const response = await fetch(
            `https://www.googleapis.com/drive/v3/files?q='${DRIVE_FOLDER_ID}'+in+parents+and+(mimeType+contains+'image/')&key=${GOOGLE_API_KEY}&fields=files(id,name,thumbnailLink,webContentLink,imageMediaMetadata)`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }

        const data = await response.json();
        galleryImages = data.files || [];

        loadingMessage.style.display = 'none';

        if (galleryImages.length === 0) {
            galleryGrid.innerHTML = '<p class="no-photos">No photos available yet. Check back soon!</p>';
            return;
        }

        // Display photos
        galleryImages.forEach((image, index) => {
            const photoCard = document.createElement('div');
            photoCard.className = 'gallery-item';

            const img = document.createElement('img');
            img.src = image.thumbnailLink || `https://drive.google.com/thumbnail?id=${image.id}`;
            img.alt = image.name;
            img.loading = 'lazy';

            photoCard.appendChild(img);
            photoCard.addEventListener('click', () => openLightbox(index));

            galleryGrid.appendChild(photoCard);
        });

    } catch (error) {
        console.error('Error loading gallery:', error);
        loadingMessage.style.display = 'none';
        errorMessage.style.display = 'block';
    }
}

// Lightbox functionality
function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.querySelector('.lightbox-caption');

    const image = galleryImages[currentImageIndex];
    lightboxImg.src = `https://drive.google.com/uc?id=${image.id}`;
    caption.textContent = image.name.replace(/\.[^/.]+$/, ''); // Remove file extension

    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }

    const lightboxImg = document.getElementById('lightbox-img');
    const caption = document.querySelector('.lightbox-caption');
    const image = galleryImages[currentImageIndex];

    lightboxImg.src = `https://drive.google.com/uc?id=${image.id}`;
    caption.textContent = image.name.replace(/\.[^/.]+$/, '');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadGalleryPhotos();

    // Lightbox controls
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const lightbox = document.getElementById('lightbox');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => navigateLightbox(-1));
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => navigateLightbox(1));
    }

    // Close lightbox when clicking outside image
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });
});
