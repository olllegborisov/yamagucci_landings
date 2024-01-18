new Swiper(".before-after__slider", {
    loop: true,
    autoplay: true,
    speed: 2000,
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    autoplay: {
      disableOnInteraction: false,
      delay: 1000,
    },
  });
  

  new Swiper(".benefits__wrapper", {
    slidesPerView: 1,
    speed: 6000,
    // spaceBetween: 40,
    breakpoints: {
      768: {
        spaceBetween: 40,
        slidesPerView: 4,
      },
      320: {
        spaceBetween: 10,
        slidesPerView: 1,
      },
    },
    loop: true,
    autoplay: {
      disableOnInteraction: false,
      delay: 0,
    },
  });


  new Swiper(".faces__wrapper-big", {
    slidesPerView: 1,
    speed: 6000,
    // spaceBetween: 40,
    breakpoints: {
      1110: {
        spaceBetween: 40,
        slidesPerView: 4,
      },
      768: {
        spaceBetween: 10,
        slidesPerView: 2,
      },
      320: {
        spaceBetween: 10,
        slidesPerView: 1,
      },
    },
    loop: true,
    autoplay: {
      disableOnInteraction: false,
      delay: 0,
    },
  });

  if (window.matchMedia("(max-width: 1239px)").matches) {
    new Swiper(".faces__wrapper-small", {
        slidesPerView: 1,
        speed: 6000,
        spaceBetween: 40,
        breakpoints: {
          1110: {
            spaceBetween: 40,
            slidesPerView: 6,
          },
          768: {
            spaceBetween: 10,
            slidesPerView: 4,
          },
          320: {
            spaceBetween: 10,
            slidesPerView: 2,
          },
        },
        loop: true,
        autoplay: {
          disableOnInteraction: false,
          delay: 0,
        },
      });
  }
  

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

if(window.matchMedia('(min-width: 768px)').matches) {
  const beautySectionSwiper = new Swiper('.bottom-swiper', {
      speed: 400,
      autoplay: true,
      loop: true,
      slidesPerView: 1,
  });
};

if(!window.matchMedia('(min-width: 767px)').matches) {
  const technologiesSectionSwiper = new Swiper('.technologies__container', {
      speed: 400,
      autoplay: true,
      loop: true,
      slidesPerView: 1,
  });
};


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
new LandingVideo("video-on-load").addVideoSource();
new LandingVideo("video-on-load").playOnScroll();