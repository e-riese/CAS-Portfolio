(function () {
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    })
})();


// CATEGORY FILTERING
const controlButtons = document.querySelectorAll('.control');
const items = document.querySelectorAll('.item'); // assumes your CAS objects have classes like "item creative"


controlButtons.forEach(btn => {
btn.addEventListener('click', () => {
// Remove active state from all buttons
controlButtons.forEach(b => b.classList.remove('active-btn'));
btn.classList.add('active-btn');


// Category is the second class on the button (e.g. 'creative', 'action', etc.)
const category = btn.classList[1];


items.forEach(item => {
if (category === 'all') {
item.style.display = 'block';
} else if (item.classList.contains(category)) {
item.style.display = 'block';
} else {
item.style.display = 'none';
}
});
});
});
// END CATEGORY FILTERING


// === MODAL + CAROUSEL ===
let currentImages = [];
let currentIndex = 0;

const modal = document.getElementById('modal');
const carouselImg = document.getElementById('carousel-img');
const modalInfo = document.getElementById('modal-info');

document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', () => {
    currentImages = item.dataset.images.split(',');
    currentIndex = 0;

    carouselImg.src = currentImages[currentIndex];
    modalInfo.textContent = item.dataset.info;

    modal.classList.remove('hidden');
  });
});

// Close modal
document.getElementById('close-btn').addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Carousel controls
document.getElementById('next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  carouselImg.src = currentImages[currentIndex];
});

document.getElementById('prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  carouselImg.src = currentImages[currentIndex];
});
