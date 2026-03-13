// Source: https://daltonwalsh.com/blog/lightbox-tutorial/
let swiper;
window.globals = {};
const body = document.getElementsByTagName('body')[0];
const lightboxGroups = document.querySelectorAll("[lightbox-toggle]");
const initLightbox = (lightboxGroups.length > 0);
const destroySwiper = (swiper, timeout) => {
  setTimeout(() => {
    swiper.destroy();
  }, timeout);
};

const closeLightbox = () => {
  if (swiper) {
    destroySwiper(swiper, 250);
  }
  globals.lightboxRef.classList.remove('open');
  body.classList.remove('overflowHidden');
};

const createLightboxSkeleton = () => {
  const lightbox = document.createElement('div');
  const lightboxContainer = document.createElement('div');
  const lightboxClose = document.createElement('div');
  const swiperContainer = document.createElement('div');
  const swiperWrapper = document.createElement('div');
  const swiperBtnNext = document.createElement('div');
  const swiperBtnPrev = document.createElement('div');
  const swiperPagination = document.createElement('div');

  lightbox.classList.add('c-lightbox');
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Image gallery lightbox');
  lightboxContainer.classList.add('c-lightbox__container');
  lightboxClose.classList.add('c-lightbox__close');
  lightboxClose.setAttribute('tabindex', '0');
  lightboxClose.setAttribute('aria-label', 'Close lightbox');
  lightboxClose.innerHTML = '&#10005;';
  swiperContainer.classList.add('swiper');
  swiperWrapper.classList.add('swiper-wrapper');
  swiperBtnNext.classList.add('swiper-button-next');
  swiperBtnNext.setAttribute('aria-label', 'Next image');
  swiperBtnPrev.classList.add('swiper-button-prev');
  swiperBtnPrev.setAttribute('aria-label', 'Previous image');
  swiperPagination.classList.add('swiper-pagination');

  lightboxContainer.appendChild(lightboxClose);
  swiperContainer.appendChild(swiperWrapper);
  swiperContainer.appendChild(swiperBtnNext);
  swiperContainer.appendChild(swiperBtnPrev);
  swiperContainer.appendChild(swiperPagination);
  lightboxContainer.appendChild(swiperContainer);
  lightbox.appendChild(lightboxContainer);
  body.appendChild(lightbox);

  globals.lightboxRef = document.querySelector('.c-lightbox');
  globals.swiperWrapperRef = document.querySelector('.c-lightbox .swiper-wrapper');
};

if (initLightbox) {
  createLightboxSkeleton();

  // Set up click handlers per collection group
  lightboxGroups.forEach((group) => {
    const groupImages = group.querySelectorAll('img');

    groupImages.forEach((el, index) => {
      el.addEventListener('click', function imageClick() {
        globals.swiperWrapperRef.innerHTML = '';

        // Only add images from this collection
        groupImages.forEach((img) => {
          const image = img.cloneNode(true);
          image.removeAttribute('loading');
          const slide = document.createElement('div');
          const imageContainer = document.createElement('div');
          slide.classList.add('swiper-slide');
          imageContainer.classList.add('c-lightbox__image');
          imageContainer.appendChild(image);
          slide.appendChild(imageContainer);
          globals.swiperWrapperRef.appendChild(slide);
        });

        swiper = new Swiper('.c-lightbox .swiper', {
          initialSlide: index,
          centeredSlides: true,
          centeredSlidesBounds: true,
          loop: true,
          slidesPerView: 1,
          spaceBetween: 16,
          watchOverflow: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          zoom: true,
          keyboard: {
            enabled: true,
            onlyInViewport: true,
          },
          mousewheel: {
            sensitivity: 1,
            forceToAxis: true,
            invert: true,
          },
        });

        globals.lightboxRef.classList.add('open');
        body.classList.add('overflowHidden');
        // Focus the close button for keyboard users
        document.querySelector('.c-lightbox__close').focus();
      }, false);
    });
  });

  // Close lightbox on close button click or background click
  document.addEventListener('click', ({ target }) => {
    if (target.matches('.c-lightbox__close') || target.matches('.c-lightbox')) {
      closeLightbox();
    }
  }, false);

  // Close lightbox on escape key
  document.addEventListener('keydown', ({ key }) => {
    if (key === 'Escape') {
      closeLightbox();
    }
  });
}
