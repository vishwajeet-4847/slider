/* script.js */

const slides = document.querySelectorAll('.slide');
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');
const thumbnails = document.querySelectorAll('.thumbnail');
let currentIndex = 0;
let autoSlideInterval;

const showSlide = (index) => {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
  updateThumbnails();
};

const nextSlide = () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
};

const prevSlide = () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
};

const startAutoSlide = () => {
  autoSlideInterval = setInterval(nextSlide, 3000);
};

const stopAutoSlide = () => {
  clearInterval(autoSlideInterval);
};

nextButton.addEventListener('click', () => {
  nextSlide();
  stopAutoSlide();
  startAutoSlide();
});

prevButton.addEventListener('click', () => {
  prevSlide();
  stopAutoSlide();
  startAutoSlide();
});

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', (e) => {
    currentIndex = parseInt(e.target.getAttribute('data-index'));
    showSlide(currentIndex);
    stopAutoSlide();
    startAutoSlide();
  });
});

const updateThumbnails = () => {
  thumbnails.forEach((thumbnail, i) => {
    thumbnail.classList.remove('active');
    if (i === currentIndex) {
      thumbnail.classList.add('active');
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  startAutoSlide();
  showSlide(currentIndex);
});

// Touch/Swipe functionality
let startX;

const handleTouchStart = (e) => {
  startX = e.touches[0].clientX;
};

const handleTouchMove = (e) => {
  if (!startX) return;

  let currentX = e.touches[0].clientX;
  let diffX = startX - currentX;

  if (diffX > 0) {
    nextSlide();
  } else {
    prevSlide();
  }

  startX = null; // Reset after swipe
};

document.querySelector('.slides').addEventListener('touchstart', handleTouchStart);
document.querySelector('.slides').addEventListener('touchmove', handleTouchMove);
