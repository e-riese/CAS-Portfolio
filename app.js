(function () {
    const controlButtons = document.querySelectorAll('.control');
    const items = document.querySelectorAll('.cas-item');
    const FADE_DURATION = 500; // same as your CSS fade time

    controlButtons.forEach(btn => {
        btn.addEventListener('click', () => {

            // Update active button
            controlButtons.forEach(b => b.classList.remove('active-btn'));
            btn.classList.add('active-btn');

            const category = btn.classList[1];

            // STEP 1 — Fade-out hidden items but don't collapse yet
            items.forEach(item => {
                const match = category === 'all' || item.classList.contains(category);
                if (!match) item.classList.add('hidden');
                else item.classList.remove('hidden', 'set-none');
            });

            // STEP 2 — After fade-out completes...
            setTimeout(() => {

                // STEP 3 — Record FIRST positions of all visible items
                const firstPositions = new Map();
                items.forEach(item => {
                    if (!item.classList.contains('hidden')) {
                        firstPositions.set(item, item.getBoundingClientRect());
                    }
                });

                // STEP 4 — Collapse hidden items
                items.forEach(item => {
                    if (item.classList.contains('hidden')) {
                        item.classList.add('set-none');
                    }
                });

                // Force browser to apply layout changes
                void document.body.offsetHeight;

                // STEP 5 — Record LAST positions and apply FLIP animation
                items.forEach(item => {
                    if (!firstPositions.has(item)) return;

                    const first = firstPositions.get(item);
                    const last = item.getBoundingClientRect();

                    const dx = first.left - last.left;
                    const dy = first.top - last.top;

                    // Invert
                    item.style.transform = `translate(${dx}px, ${dy}px)`;
                    item.style.transition = "none";

                    // PLAY the animation (animate to natural position)
                    requestAnimationFrame(() => {
                        item.style.transition = "transform 0.8s ease";
                        item.style.transform = "";
                    });
                });

            }, FADE_DURATION);
        });
    });
})();

(function () {
    // Add event listener for the theme toggle button (dark mode)
    document.querySelector(".theme-btn").addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent click from closing pop-up
        document.body.classList.toggle("dark-mode");
    });
})();


// Open popup
function openPopup(element) {
    const popupToOpen = element.querySelector(".popup");

    // Close all other popups
    document.querySelectorAll('.popup.show').forEach(p => {
        if (p !== popupToOpen) p.classList.remove('show');
    });

    // Force the clicked one to open
    popupToOpen.classList.add("show");

    // Stop clicks inside popup from closing it
    popupToOpen.addEventListener('click', e => e.stopPropagation());

    // ⭐️ Scroll it into view
    popupToOpen.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    // Fade it in
    requestAnimationFrame(() => {
        popupToOpen.style.transition = "opacity 0.3s ease";
        popupToOpen.style.opacity = 1;
    });
}

// Arrow key navigation for open popup carousels
document.addEventListener("keydown", function (e) {

    // Find the popup that is currently open
    const openPopup = document.querySelector(".popup.show");
    if (!openPopup) return; // nothing open → ignore arrow keys

    // Find the carousel inside the open popup
    const carousel = openPopup.querySelector(".carousel");
    if (!carousel) return;

    // LEFT arrow → previous slide
    if (e.key === "ArrowLeft") {
        const prevBtn = carousel.querySelector(".prev");
        if (prevBtn) prevSlide(prevBtn);
    }

    // RIGHT arrow → next slide
    if (e.key === "ArrowRight") {
        const nextBtn = carousel.querySelector(".next");
        if (nextBtn) nextSlide(nextBtn);
    }
});


// Close popup
function closePopup(button) {
    const popup = button.closest(".popup");
    popup.classList.remove("show");
}

// Click outside popup
document.addEventListener('click', function(event) {
    const activePopup = document.querySelector('.popup.show');
    if (activePopup) {
        activePopup.classList.remove('show');
    }
});

// Trigger popup click
document.querySelectorAll('.cas-item').forEach(el => {
    el.addEventListener('click', function(e) {
        e.stopPropagation();
        openPopup(el);
    });
});

document.addEventListener('keydown', e => {
    if (e.key === "Escape") {
        document.querySelectorAll('.popup.show')
                .forEach(p => p.classList.remove('show'));
    }
});


function nextSlide(button) {
    const carousel = button.parentElement;
    const items = carousel.querySelectorAll('.carousel-image');
    let current = carousel.querySelector('.carousel-image.active');
    let index = Array.from(items).indexOf(current);

    // Only pause (do NOT reset)
    if (current.tagName.toLowerCase() === 'video') {
        current.pause();
    }

    current.classList.remove('active');
    index = (index + 1) % items.length;

    const next = items[index];
    next.classList.add('active');
}

function prevSlide(button) {
    const carousel = button.parentElement;
    const items = carousel.querySelectorAll('.carousel-image');
    let current = carousel.querySelector('.carousel-image.active');
    let index = Array.from(items).indexOf(current);

    if (current.tagName.toLowerCase() === 'video') {
        current.pause();
    }

    current.classList.remove('active');
    index = (index - 1 + items.length) % items.length;

    const prev = items[index];
    prev.classList.add('active');
}


  