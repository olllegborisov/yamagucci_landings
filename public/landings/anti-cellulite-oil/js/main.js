if (window.matchMedia('(min-width: 768px)').matches) {
    new Swiper('.bottom-swiper', {
      speed: 400,
      autoplay: true,
      loop: true,
      slidesPerView: 1,
    });
  } else {
    new Swiper('.composition__swiper', {
      autoplay: {
        delay: 3000,
        disableOnIteraction: false,
      },
      loop: true,
    })
  }
  
  new Swiper('.effect__swiper', {
    speed: 400,
    autoplay: true,
    loop: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 25,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 39,
      },
    },
    // pagination:{
    //   el: '.swiper-pagination',
    //   type: 'fraction',
    //   renderFraction: function(currentClass, totalClass) {
    //       return 'Фото <span class="' + currentClass + '"></span>'+ ' из ' + '<span class="' + totalClass + '"></span>'; // Фото 1 из 6 
    //   },
    // },
  });
  
  function sectionObserver(className, threshold = 0.5) {
    const sections = document.querySelectorAll(`.${className}`);
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('_active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: threshold,
      }
    );
  
    sections.forEach((section) => {
      observer.observe(section);
    });
  }
  
  try {
    sectionObserver('_observe-section');
  } catch (err) {
    console.log(err);
  }
  
  class CompositionModal {
    constructor(modalClass, closeBtnClass, openBtnClass) {
      this.modal = document.querySelector(`.${modalClass}`);
      this.closeBtn = document.querySelector(`.${closeBtnClass}`);
      this.openBtn = document.querySelector(`.${openBtnClass}`);
      this.body = document.body;
  
      this.init();
    }
  
    openModal() {
      this.modal.classList.add('_active');
    }
  
    closeModal() {
      this.modal.classList.remove('_active');
    }
  
    handleOpenModal() {
      this.openBtn.addEventListener('click', () => {
        this.body.style.overflow = 'hidden';
        this.openModal();
      });
    }
  
    handleCloseModal() {
      this.closeBtn.addEventListener('click', () => {
        this.body.style.overflow = 'unset';
        this.closeModal();
      });
    }
  
    init() {
      this.handleCloseModal();
      this.handleOpenModal();
    }
  }
  
  try {
    new CompositionModal(
      'composition__modal',
      'composition__modal-close-btn',
      'composition__open-modal-btn'
    );
  } catch (err) {
    console.error(err);
  }
  