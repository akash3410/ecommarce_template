document.addEventListener("DOMContentLoaded", function() {
  // ---------------- Mobile slide menu toggle ----------------
  const menuBtn = document.getElementById('menu-btn');
  const closeMenu = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');

  menuBtn?.addEventListener('click', () => mobileMenu?.classList.remove('-translate-x-full'));
  closeMenu?.addEventListener('click', () => mobileMenu?.classList.add('-translate-x-full'));

  document.querySelectorAll('.submenu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const submenu = btn.nextElementSibling;
      submenu.classList.toggle('hidden');
      const sign = btn.querySelector('span');
      if(sign) sign.textContent = submenu.classList.contains('hidden') ? '+' : '-';
    });
  });

  // ---------------- Mobile & Desktop search toggle ----------------
  const mobileSearchBtn = document.getElementById('mobile-search-btn');
  const mobileSearchBar = document.getElementById('mobile-search-bar');
  const desktopSearchBtn = document.getElementById('desktop-search-btn');
  const desktopSearchWrap = document.getElementById('desktop-search');
  const desktopSearchInput = document.getElementById('desktop-search-input');

  mobileSearchBtn?.addEventListener('click', () => {
    mobileSearchBar?.classList.toggle('-translate-y-full');
    setTimeout(() => {
      const input = document.getElementById('mobile-search-input');
      if (input && !mobileSearchBar.classList.contains('-translate-y-full')) input.focus();
    }, 200);
  });

  desktopSearchBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (desktopSearchWrap.classList.contains('w-0')) {
      desktopSearchWrap.classList.replace('w-0', 'w-64');
      setTimeout(() => desktopSearchInput?.focus(), 150);
    } else {
      desktopSearchWrap.classList.replace('w-64', 'w-0');
    }
  });

  document.addEventListener('click', (e) => {
    if (!desktopSearchWrap?.contains(e.target) && !desktopSearchBtn?.contains(e.target)) {
      desktopSearchWrap?.classList.replace('w-64', 'w-0');
    }
  });

  // ---------------- Mobile search icon text toggle ----------------
  let isOpen = false;
  const searchIcon = document.getElementById("mobile-search-icon");
  const searchText = document.getElementById("mobile-search-text");

  mobileSearchBtn?.addEventListener("click", () => {
    isOpen = !isOpen;
    if(isOpen) {
      mobileSearchBar?.classList.replace("-translate-y-full","translate-y-0");
      searchIcon?.classList.replace("fa-magnifying-glass","fa-xmark");
      if(searchText) searchText.innerText = "Close";
    } else {
      mobileSearchBar?.classList.replace("translate-y-0","-translate-y-full");
      searchIcon?.classList.replace("fa-xmark","fa-magnifying-glass");
      if(searchText) searchText.innerText = "Search";
    }
  });

  // ---------------- Optional: resize fix ----------------
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      mobileMenu?.classList.add('-translate-x-full');
      mobileSearchBar?.classList.add('-translate-y-full');
    }
  });

  // ---------------- Slider ----------------
  const slider = document.getElementById("slider");
  const slides = slider ? slider.querySelectorAll(":scope > div") : [];
  const dots = document.querySelectorAll(".dot");
  let index = 0;

  function updateSlide() {
    if(slider){
      slider.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot,i) => {
        dot.classList.toggle("bg-white", i===index);
        dot.classList.toggle("bg-gray-400", i!==index);
      });
      slides.forEach(slide => {
        slide.querySelectorAll(".slide-text").forEach(el => {
          el.classList.add("opacity-0","translate-y-10");
          el.classList.remove("opacity-100","translate-y-0");
        });
      });
      slides[index]?.querySelectorAll(".slide-text").forEach((el,i)=>{
        setTimeout(()=> {
          el.classList.remove("opacity-0","translate-y-10");
          el.classList.add("opacity-100","translate-y-0");
        }, i*200);
      });
    }
  }

  updateSlide();

  document.getElementById("next")?.addEventListener("click",()=>{index=(index+1)%slides.length;updateSlide();});
  document.getElementById("prev")?.addEventListener("click",()=>{index=(index-1+slides.length)%slides.length;updateSlide();});
  dots.forEach((dot,i)=>{dot.addEventListener("click",()=>{index=i;updateSlide();});});
  setInterval(()=>{index=(index+1)%slides.length;updateSlide();},3000);

  // ---------------- Why Us carousel ----------------
  feather.replace();
  const carousel = document.getElementById('carousel');
  const gap = 24;

  function slideNext() {
    if(!carousel) return;
    const first = carousel.children[0];
    const last = carousel.children[carousel.children.length - 2];
    const cardWidth = first.offsetWidth + gap;
    last?.classList.add('slide-enlarge');
    carousel.style.transition = 'transform 1s linear';
    carousel.style.transform = `translateX(-${cardWidth}px)`;
    setTimeout(()=>{
      carousel.style.transition='none';
      carousel.style.transform='translateX(0)';
      carousel.appendChild(first);
      last?.classList.remove('slide-enlarge');
    },1000);
  }
  setInterval(slideNext,2000);

  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('mouseenter',()=>card.querySelectorAll('h3').forEach(el=>el.classList.add('bounce-up')));
    card.addEventListener('mouseleave',()=>card.querySelectorAll('h3').forEach(el=>el.classList.remove('bounce-up')));
  });

  // ---------------- Product modal / quick view ----------------
  document.querySelectorAll('.open-modal').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const target=document.getElementById(btn.dataset.target);
      target?.classList.add('active');
    });
  });

  document.querySelectorAll('.close-modal').forEach(btn=>{
    btn.addEventListener('click',()=>btn.closest('.modal')?.classList.remove('active'));
  });

  document.querySelectorAll('.modal-thumb').forEach(thumb=>{
    thumb.addEventListener('click',()=>thumb.closest('.modal').querySelector('.main-img').src=thumb.src);
  });

  // ---------------- Zoom lens ----------------
  const zoom=2;
  document.querySelectorAll('.zoom-container').forEach(container=>{
    const lens=container.querySelector('.lens');
    const image=container.querySelector('img');
    container?.addEventListener('mousemove',(e)=>{
      if(!lens || !image) return;
      lens.style.display='block';
      lens.style.backgroundImage=`url(${image.src})`;
      lens.style.backgroundSize=`${image.width*zoom}px ${image.height*zoom}px`;
      const rect=container.getBoundingClientRect();
      let x=e.clientX-rect.left-lens.offsetWidth/2;
      let y=e.clientY-rect.top-lens.offsetHeight/2;
      if(x<0) x=0; if(y<0) y=0;
      if(x>rect.width-lens.offsetWidth) x=rect.width-lens.offsetWidth;
      if(y>rect.height-lens.offsetHeight) y=rect.height-lens.offsetHeight;
      lens.style.left=x+'px';
      lens.style.top=y+'px';
      lens.style.backgroundPosition=`-${x*zoom}px -${y*zoom}px`;
    });
    container?.addEventListener('mouseleave',()=>lens.style.display='none');
  });

  // ---------------- Scroll to top button ----------------
  const scrollTopBtn=document.getElementById("scrollTopBtn");
  const navbar=document.querySelector("nav");
  const footer=document.querySelector("footer");

  window.addEventListener("scroll",function(){
    const footerTop=footer?.getBoundingClientRect().top||0;
    const windowHeight=window.innerHeight;
    const width=this.window.innerWidth;
    if(footerTop<windowHeight){
      if(scrollTopBtn) scrollTopBtn.style.display="block";
      if(navbar && width>=768) navbar.style.display="none";
    } else {
      if(scrollTopBtn) scrollTopBtn.style.display="none";
      if(navbar) navbar.style.display="block";
    }
  });

  scrollTopBtn?.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

  
  // ---------------- Cart sidebar ----------------
  const cartBtn=document.getElementById("myCartBtn");
  const cartSidebar=document.getElementById("cartSidebar");
  const closeCart=document.getElementById("closeCart");
  cartBtn?.addEventListener("click",()=>{cartSidebar?.classList.remove("translate-x-full");cartSidebar?.classList.add("translate-x-0");});
  closeCart?.addEventListener("click",()=>{cartSidebar?.classList.remove("translate-x-0");cartSidebar?.classList.add("translate-x-full");});

    // ---------------- Cart button slide-in on page load ----------------
  document.addEventListener("DOMContentLoaded", () => {
    if (!cartBtn) return;

    setTimeout(() => {
        cartBtn.classList.remove("-translate-y-20", "opacity-0");
        cartBtn.classList.add("translate-y-0", "opacity-100");
    }, 300); // 300ms delay
  });

  // ---------------- Filter drawer & Sort by ----------------
  const openFilterBtn = document.getElementById("openFilterBtn");
  const closeFilterBtn = document.getElementById("closeFilterBtn");
  const filterDrawer = document.getElementById("filterDrawer");
  const overlay = document.getElementById("overlay");
  const clearBtn = document.getElementById("clearFiltersBtn");
  const filterInputs = document.querySelectorAll('#filterDrawer input[type="radio"]');

  function openDrawer(){filterDrawer?.classList.remove("translate-x-full");overlay?.classList.remove("hidden");}
  function closeDrawer(){filterDrawer?.classList.add("translate-x-full");overlay?.classList.add("hidden");}
  openFilterBtn?.addEventListener("click",openDrawer);
  closeFilterBtn?.addEventListener("click",closeDrawer);
  overlay?.addEventListener("click",closeDrawer);

  filterInputs.forEach(input=>{input.addEventListener("change",()=>clearBtn?.classList.remove("hidden"));});
  clearBtn?.addEventListener("click",()=>{filterInputs.forEach(input=>input.checked=false);clearBtn?.classList.add("hidden");});

  const btn = document.getElementById('dropdownBtn');
  const menu = document.getElementById('dropdownMenu');

  btn?.addEventListener('click',()=>menu?.classList.toggle('hidden'));
  document.addEventListener('click',(e)=>{if(btn && menu && !btn.contains(e.target) && !menu.contains(e.target)) menu.classList.add('hidden');});
  menu?.querySelectorAll('li').forEach(item=>item.addEventListener('click',()=>{btn.textContent=`Sort by: ${item.textContent}`;menu.classList.add('hidden');}));
});


// Animation (Smooth Ease In)
document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".smooth-ease-in"); // product grid wrapper
    if (!grid) return;

    grid.classList.add("opacity-0", "scale-95"); // শুরুতে hidden + slightly down
    setTimeout(() => {
        grid.classList.remove("opacity-0", "scale-95");
        grid.classList.add("opacity-100", "scale-100", "transition-all", "duration-1000", "ease-in");
    }, 100); // short delay for smooth start
});

document.addEventListener("DOMContentLoaded", () => {
    const cartBtn = document.getElementById("myCartBtn");
    if (!cartBtn) return;

    setTimeout(() => {
        cartBtn.classList.remove("-translate-y-20", "opacity-0");
        cartBtn.classList.add("translate-y-0", "opacity-100", "transition-all", "duration-1000", "ease-out");
    }, 200); // 200ms delay, adjust as needed
});

