// Mobile slide menu toggle
const menuBtn = document.getElementById('menu-btn');
const closeMenu = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('-translate-x-full');
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.add('-translate-x-full');
});

// Collapsible submenus (mobile)
document.querySelectorAll('.submenu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const submenu = btn.nextElementSibling;
      submenu.classList.toggle('hidden');
      const sign = btn.querySelector('span');
      sign.textContent = submenu.classList.contains('hidden') ? '+' : '-';
    });
});

// Mobile search toggle (slide down/up)
const mobileSearchBtn = document.getElementById('mobile-search-btn');
const mobileSearchBar = document.getElementById('mobile-search-bar');
mobileSearchBtn.addEventListener('click', () => {
    mobileSearchBar.classList.toggle('-translate-y-full');
    setTimeout(() => {
      const input = document.getElementById('mobile-search-input');
      if (input && !mobileSearchBar.classList.contains('-translate-y-full')) input.focus();
    }, 200);
});

// Desktop search toggle (expand/collapse)
const desktopSearchBtn = document.getElementById('desktop-search-btn');
const desktopSearchWrap = document.getElementById('desktop-search');
const desktopSearchInput = document.getElementById('desktop-search-input');

desktopSearchBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    // toggle width classes: w-0 <-> w-56
    if (desktopSearchWrap.classList.contains('w-0')) {
      desktopSearchWrap.classList.remove('w-0');
      desktopSearchWrap.classList.add('w-64');
      setTimeout(() => desktopSearchInput && desktopSearchInput.focus(), 150);
    } else {
      desktopSearchWrap.classList.remove('w-64');
      desktopSearchWrap.classList.add('w-0');
    }
});

// click outside to close desktop search
document.addEventListener('click', (e) => {
    const isClickOnSearch = desktopSearchWrap.contains(e.target) || desktopSearchBtn.contains(e.target);
    if (!isClickOnSearch) {
      if (desktopSearchWrap.classList.contains('w-64')) {
        desktopSearchWrap.classList.remove('w-64');
        desktopSearchWrap.classList.add('w-0');
      }
    }
});

// Mobile Search Icon (open & close)
const searchBtn = document.getElementById("mobile-search-btn");
const searchBar = document.getElementById("mobile-search-bar");
const searchIcon = document.getElementById("mobile-search-icon");
const searchText = document.getElementById("mobile-search-text");

let isOpen = false;

searchBtn.addEventListener("click", () => {
    isOpen = !isOpen;

    if(isOpen) {
        searchBar.classList.remove("-translate-y-full");
        searchBar.classList.add("translate-y-0")
        searchIcon.classList.remove("fa-magnifying-glass");
        searchIcon.classList.add("fa-xmark");
        searchText.innerText = "Close";
    } else {
        searchBar.classList.remove("translate-y-0");
        searchBar.classList.add("-translate-y-full");
        searchIcon.classList.remove("fa-xmark");
        searchIcon.classList.add("fa-magnifying-glass");
        searchText.innerText = "Search";
    }
});

// optional: prevent mobile menu from staying open when screen resized to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      mobileMenu.classList.add('-translate-x-full');
      mobileSearchBar.classList.add('-translate-y-full');
    }
});

// Slider
const slider = document.getElementById("slider");
  const slides = document.querySelectorAll("#slider > div");
  const dots = document.querySelectorAll(".dot");
  let index = 0;

  function updateSlide() {
    slider.style.transform = `translateX(-${index * 100}%)`;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("bg-white", i === index);
      dot.classList.toggle("bg-gray-400", i !== index);
    });

    // Animate slide text
    slides.forEach(slide => {
      slide.querySelectorAll(".slide-text").forEach(el => {
        el.classList.add("opacity-0", "translate-y-10");
        el.classList.remove("opacity-100", "translate-y-0");
      });
    });

    slides[index].querySelectorAll(".slide-text").forEach((el, i) => {
      setTimeout(() => {
        el.classList.remove("opacity-0", "translate-y-10");
        el.classList.add("opacity-100", "translate-y-0");
      }, i * 200); // staggered animation
    });
  }

  // Initial display
  updateSlide();

  // Buttons
  document.getElementById("next").addEventListener("click", () => {
    index = (index + 1) % slides.length;
    updateSlide();
  });
  document.getElementById("prev").addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    updateSlide();
  });

  // Dots click
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      updateSlide();
    });
  });

  // Auto-slide every 4 seconds
  setInterval(() => {
    index = (index + 1) % slides.length;
    updateSlide();
  }, 3000);


// Why us Card
feather.replace();

const carousel = document.getElementById('carousel');
const gap = 24;

function slideNext() {
  const first = carousel.children[0];
  const last = carousel.children[carousel.children.length - 2];
  const cardWidth = first.offsetWidth + gap;

  // Enlarge card that comes from the right (last card)
  last.classList.add('slide-enlarge');

  carousel.style.transition = 'transform 1s linear';
  carousel.style.transform = `translateX(-${cardWidth}px)`;

  setTimeout(() => {
    carousel.style.transition = 'none';
    carousel.style.transform = 'translateX(0)';
    carousel.appendChild(first);

    // Remove enlarge after sliding
    last.classList.remove('slide-enlarge');
  }, 1000);
}

setInterval(slideNext, 2000);

// Hover text bounce animation
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.querySelectorAll('h3').forEach(el => el.classList.add('bounce-up'));
  });
  card.addEventListener('mouseleave', () => {
    card.querySelectorAll('h3').forEach(el => el.classList.remove('bounce-up'));
  });
});


// New Arrival Slider functionality
feather.replace();

const naSliderWrapper = document.getElementById('naSliderWrapper');
const track = document.getElementById('sliderTrack');
const prev = document.getElementById('naprev');
const next = document.getElementById('nanext');
let currentIndex = 0;

function updateSlider() {
  const card = track.children[0];
  const cardWidth = card.offsetWidth + parseInt(getComputedStyle(card).marginRight);
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

next.addEventListener('click', () => {
  if (currentIndex < track.children.length - 1) currentIndex++;
  updateSlider();
});
prev.addEventListener('click', () => {
  if (currentIndex > 0) currentIndex--;
  updateSlider();
});
window.addEventListener('resize', updateSlider);

// Show buttons on slider hover (New Arrival)
naSliderWrapper.addEventListener('mouseenter', () => {
  prev.classList.remove('-translate-x-10', 'opacity-0');
  prev.classList.add('translate-x-5', 'opacity-100');

  next.classList.remove('translate-x-10', 'opacity-0');
  next.classList.add('-translate-x-5', 'opacity-100');
});

naSliderWrapper.addEventListener('mouseleave', () => {
  prev.classList.add('-translate-x-10', 'opacity-0');
  prev.classList.remove('translate-x-5', 'opacity-100');

  next.classList.add('translate-x-10', 'opacity-0');
  next.classList.remove('-translate-x-5', 'opacity-100');
});

// Best Sell Slider functionality
const bssliderWrapper = document.getElementById('bssliderWrapper');
const bstrack = document.getElementById('bsSliderTrack');
const bsprev = document.getElementById('bsprev');
const bsnext = document.getElementById('bsnext');
let bscurrentIndex = 0;

function bsupdateSlider() {
  const card = bstrack.children[0];
  const cardWidth = card.offsetWidth + parseInt(getComputedStyle(card).marginRight);
  bstrack.style.transform = `translateX(-${bscurrentIndex * cardWidth}px)`;
}

bsnext.addEventListener('click', () => {
  if (bscurrentIndex < bstrack.children.length - 1) bscurrentIndex++;
  bsupdateSlider();
});
bsprev.addEventListener('click', () => {
  if (bscurrentIndex > 0) bscurrentIndex--;
  bsupdateSlider();
});
window.addEventListener('resize', bsupdateSlider);

// Show buttons on slider hover (Best Sell)
bssliderWrapper.addEventListener('mouseenter', () => {
  bsprev.classList.remove('-translate-x-10', 'opacity-0');
  bsprev.classList.add('translate-x-5', 'opacity-100');

  bsnext.classList.remove('translate-x-10', 'opacity-0');
  bsnext.classList.add('-translate-x-5', 'opacity-100');
});

bssliderWrapper.addEventListener('mouseleave', () => {
  bsprev.classList.add('-translate-x-10', 'opacity-0');
  bsprev.classList.remove('translate-x-5', 'opacity-100');

  bsnext.classList.add('translate-x-10', 'opacity-0');
  bsnext.classList.remove('-translate-x-5', 'opacity-100');
});

// Modal functionality
document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    target.classList.add('active');
  });
});

document.querySelectorAll('.close-modal').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.modal').classList.remove('active');
  });
});

// Thumbnail click
document.querySelectorAll('.modal-thumb').forEach(thumb => {
  thumb.addEventListener('click', () => {
    thumb.closest('.modal').querySelector('.main-img').src = thumb.src;
  });
});

// Lens
const zoom = 2;

// সব zoom-container এর জন্য apply করো
document.querySelectorAll('.zoom-container').forEach(container => {
  const lens = container.querySelector('.lens');
  const image = container.querySelector('img');

  container.addEventListener('mousemove', (e) => {
    lens.style.display = 'block';
    lens.style.backgroundImage = `url(${image.src})`;
    lens.style.backgroundSize = `${image.width * zoom}px ${image.height * zoom}px`;

    const rect = container.getBoundingClientRect();
    let x = e.clientX - rect.left - lens.offsetWidth / 2;
    let y = e.clientY - rect.top - lens.offsetHeight / 2;

    if(x < 0) x = 0;
    if(y < 0) y = 0;
    if(x > rect.width - lens.offsetWidth) x = rect.width - lens.offsetWidth;
    if(y > rect.height - lens.offsetHeight) y = rect.height - lens.offsetHeight;

    lens.style.left = x + 'px';
    lens.style.top = y + 'px';

    lens.style.backgroundPosition = `-${x * zoom}px -${y * zoom}px`;
  });

  container.addEventListener('mouseleave', () => {
    lens.style.display = 'none';
  });
});
