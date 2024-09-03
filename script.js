   // Simple image slider (auto slide)
   let currentSlide = 0;
   const slides = document.querySelector('.slider-images');
   const totalSlides = slides.children.length;

   function showNextSlide() {
       currentSlide = (currentSlide + 1) % totalSlides;
       slides.style.transform = `translateX(-${currentSlide * 100}%)`;
   }

   setInterval(showNextSlide, 3000); // Change slide every 3 seconds

   // Replace 'Username' with actual username dynamically (this is just for demo purposes)
   document.getElementById('username').textContent = 'Nihar'; // Replace with actual username

   // Function to set active navigation item
function setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop(); // Get the current page
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');

    navItems.forEach(item => {
        const link = item.getAttribute('href');

        if (link === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', setActiveNavItem);
