
class ObserverVisible {
    constructor(data) {
      this._class = typeof data === "object" ? data.class : data;
      this._currentElements = document.querySelectorAll(`.${this._class}`);
      this._options = {
        root: null,
        rootMargin: `0px 0px ${
          data.marginBottom ? data.marginBottom : "-20%"
        } 0px`,
        threshold: data.threshold ? data.threshold : 0.01,
      };
      this._observer = new IntersectionObserver((entries, obs) => {
        for (let i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            setTimeout(
              () => {
                entries[i].target.classList.remove(`_hide`);
              },
              data.delay ? data.delay : 0
            );
          }
        }
      }, this._options);
    }
  
    setElementsVisibleOnScroll() {
      const _observerArr = [];
      for (let i = 0; i < this._currentElements.length; i++) {
        this._currentElements[i].classList.add("_hide");
        _observerArr.push(this._observer.observe(this._currentElements[i]));
      }
      return _observerArr;
    }
  }
  try {
    if (window.innerWidth > 768)
      new ObserverVisible("element-for-visible").setElementsVisibleOnScroll();
  } catch (err) {
    console.warn(err);
  }
  
  new Swiper(".automatic-programmes__swiper", {
    speed: 6500,
    loopedSlides: 20,
    // spaceBetween: 50,
    breakpoints: {
      1699: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1239: {
        slidesPerView: 3,
      },
      // 767: {
      //   slidesPerView: 2,
      // },
      320: {
        centeredSlides: true,
        spaceBetween: 0,
        slidesPerView: 1,
        delay: 1500,
      },
    },
    loop: true,
    autoplay: {
      disableOnInteraction: false,
      delay: 0,
    },
  });
  
  
  class LandingVideo {
    constructor(data) {
      this._class = typeof data === "object" ? data.class : data;
      this._videos = document.querySelectorAll(`.${this._class}`);
    }
  
    addVideoSource() {
      const _mediaQuery = window.matchMedia("(min-width: 768px)");
  
      for (let i = 0; i < this._videos.length; i++) {
        let _video = this._videos[i];
        if (_video.dataset.videoMob && !_mediaQuery.matches) {
          if (_video.dataset.videoMobWebm) {
            _video.innerHTML = `<source src="${_video.dataset.videoMobWebm}" type='video/webm; codecs="vp8, vorbis"'> <source src="${_video.dataset.videoMob}"> `;
          } else {
            _video.innerHTML = `<source src="${_video.dataset.videoMob}">`;
          }
        } else if (_video.dataset.video && _mediaQuery.matches) {
          if (_video.dataset.videoWebm) {
            _video.innerHTML = `<source src="${_video.dataset.videoWebm}" type='video/webm; codecs="vp8, vorbis"'> <source src="${_video.dataset.video}"> `;
          } else {
            _video.innerHTML = `<source src="${_video.dataset.video}">`;
          }
        }
      }
    }
  
    playOnScroll() {
      const _options = {
        root: null,
        rootMargin: `0px 0px 0px 0px`,
        threshold: 0.001,
      };
      const _observer = new IntersectionObserver((entries, obs) => {
        for (let i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            entries[i].target.play();
          } else {
            entries[i].target.pause();
          }
        }
      }, _options);
      const _observerArr = [];
      for (let i = 0; i < this._videos.length; i++) {
        _observerArr.push(_observer.observe(this._videos[i]));
      }
      return _observerArr;
    }
  }
  // =====================================================================================================================================>
  new LandingVideo("video-on-load").addVideoSource();
  new LandingVideo("video-on-load").playOnScroll();
  
  if (window.matchMedia("(min-width: 768px)").matches) {
  } else {
    new Swiper(".four-modes-mob__swiper", {
      autoplay: {
        delay: 4000,
        disableOnInteraction: true, //TODO: chnage to true
      },
      loop: true,
      speed: 1000,
      slidesPerView: 1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
  
  new Swiper(".four-modes__swiper", {
    loop: true,
    allowTouchMove: false,
    speed: 500,
    effect: "fade",
    slidesPerView: 1,
    spaceBetween: 0,
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      disableOnInteraction: false,
      delay: 1500,
    },
    breakpoints: {
  
    }
  });
  
  
  new Swiper(".any-situation__swiper", {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    slidesPerView: 1.2,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    breakpoints: {
      768: {
        spaceBetween: 20,
        slidesPerView: 4,
        centeredSlides: false,
      },
      319: {
        slidesPerView: 1.3,
        centeredSlides: true,
      },
    },
  });
  
  new Swiper(".advantages__swiper", {
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: true,
    slidesPerView: 1,
    speed: 500,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: ".advantages__pagination",
    },
  });
  
  function sectionObserver(className, threshold) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("_active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
      }
    );
  
    const sections = document.querySelectorAll(className);
    sections.forEach((section) => {
      observer.observe(section);
    });
  }
  
  sectionObserver(".__js-observe-section", 0.5);
  
  new Swiper(".massage-swiper", {
    autoplay: {
      delay: 0,
    },
    allowTouchMove: false,
    slidesPerView: 1.5,
    spaceBetween: 13,
    loop: true,
    speed: 8000,
    breakpoints: {
      768: {
        slidesPerView: 2.76,
        spaceBetween: 20,
      },
      319: {
        slidesPerView: 1.4,
        centeredSlides: true,
      },
    },
  });
  
  if (window.matchMedia("(max-width: 768px)").matches) {
    new Swiper(".automatic-programmes__content", {
      autoplay: {
        delay: 4000,
        disableOnInteraction: true,
      },
      centeredSlides: true,
      loop: true,
      speed: 1000,
      slidesPerView: 1.25,
      spaceBetween: 10,
    });
  } else {
    new Swiper('.bottom-swiper', {
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      speed: 1000,
      loop: true,
      slidesPerView: 1,
      pagination: {
        el: ".bottom-swiper__pagination",
      },
    })
  }
  
  new Swiper(".materials__swiper", {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    loop: true,
    spaceBetween: 13,
    breakpoints: {
      768: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      319: {
        slidesPerView: 1.17,
        centeredSlides: true,
      },
    },
  });
  
  new Swiper(".two-positions__swiper", {
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },
    loop: true,
    slidesPerView: 1,
    speed: 1000,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });
  
  
  