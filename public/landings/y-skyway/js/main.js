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
  
  const mobMedia = window.matchMedia("(max-width: 767px)").matches;
  
  const cards = document.querySelectorAll(".program__card");
  
  cards.forEach((card, index) => {
    const imgCard = card.querySelector(".program__card-img");
    const textCard = card.querySelector(".program__card-title");
  
    if (!mobMedia) {
      card.addEventListener("mouseenter", () => {
        imgCard.classList.add("opacity");
        textCard.classList.add('out-card')
        textCardHover(index);
      });
  
      card.addEventListener("mouseleave", () => {
        imgCard.classList.remove("opacity");
        textCard.classList.remove('out-card')
        textCardMouseleave(index);
      });
    }
  
    if (mobMedia) {
      textCardHover(index);
    }
  
    function textCardHover(index) {
      if (index == 0) {
        textCard.textContent = "Пробуждение силы";
      } else if (index == 1) {
        textCard.textContent = "Лёгкость обновления";
      } else if (index == 2) {
        textCard.textContent = "Наедине с собой";
      }
    }
  
    function textCardMouseleave(index) {
      if (index === 0) {
        textCard.textContent = "доброе утро";
      } else if (index === 1) {
        textCard.textContent = "дневной сон";
      } else if (index === 2) {
        textCard.textContent = "Подготовка ко сну";
      }
    }
  });
  
  if (mobMedia) {
    new Swiper(".program__container", {
      centeredSlides: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop: true,
      spaceBetween: 10,
      breakpoints: {
        320: {
          slidesPerView: 1.2,
          centeredSlides: true,
        },
      },
    });
  }
  
  
  
  const text = [
    "разминание",
    "постукивание",
    "комбо-массаж ",
    "глубокий шиацу",
    "похлопывания",
    "растирание",
  ];
  
  function textCard(indexActive) {
    text.forEach((item, index) => {
      const textContainer = document.querySelector(".massage-techniques__text");
  
      if (index == indexActive) {
  
        textContainer
        textContainer.textContent = item;
      }
    });
  }
  const swiperCards = document.querySelectorAll(".massage-techniques__box");
  function handleActiveSlide() {
    swiperCards.forEach((card) => {
      const active = card.classList.contains("swiper-slide-active");
  
      if (active) {
        const attribute = card.getAttribute("aria-label");
        if (attribute == "1 / 6") {
          textCard(1);
        } else if (attribute == "2 / 6") {
          textCard(2);
        } else if (attribute == "3 / 6") {
          textCard(3);
        } else if (attribute == "4 / 6") {
          textCard(4);
        } else if (attribute == "5 / 6") {
          textCard(5);
        } else if (attribute == "6 / 6") {
          textCard(6);
        }
      }
    });
  }
  
  const swiperMassageTechniques = new Swiper(".massage-techniques__container", {
    loop: true,
    autoplay: true,
    slidesPerView: 1,
    speed: 500,
    loopedSlides: 14,
    allowTouchMove: false,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        slidesOffsetBefore: 0,
      },
      768: {
        slidesPerView: 3.8,
        // slidesPerView: 4,
        spaceBetween: 0,
        centeredSlides: true,
        slidesOffsetBefore: -90,
      },
    },
  });
  
  swiperMassageTechniques.on("slideChange", function () {
    handleActiveSlide();
  });
  
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
  
  if (mobMedia) {
    new Swiper(".big-swiper", {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop: true,
      spaceBetween: 0,
      breakpoints: {
        320: {
          slidesPerView: 1,
          centeredSlides: true,
        },
      },
      pagination: {
        el: ".big-swiper__pagination",
      },
    });
  }
  
  if (mobMedia) {
    new Swiper(".materials-mob", {
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop: true,
      spaceBetween: 0,
      breakpoints: {
        320: {
          slidesPerView: 1,
          centeredSlides: true,
        },
      },
      pagination: {
        el: ".materials-mob__pagination",
      },
    });
  }
  
  
  if (!mobMedia) {
    new Swiper(".swiper-img", {
      loop: true,
      autoplay: true,
      slidesPerView: 1,
      speed: 500,
      loopedSlides: 16,
      breakpoints: {
        768: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      },
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
    });
  }
  
  function animeAimDes() {
    anime({
      targets: ".scanning__nimb",
      translateX: [
        { value: "0%", duration: 0, easing: "easeInOutCubic" },
        { value: "70%", duration: 4000, easing: "easeInOutCubic" },
        { value: "155%", duration: 2000, easing: "easeInOutCubic" },
        { value: "255%", duration: 2300, easing: "easeInOutCubic" },
        { value: "155%", duration: 2000, easing: "easeInOutCubic" },
        { value: "70%", duration: 4000, easing: "easeInOutCubic" },
        { value: "0%", duration: 3000, easing: "easeInOutCubic" },
      ],
      translateY: [
        { value: " 0%", duration: 0, easing: "easeInOutCubic" },
        { value: "-20%", duration: 4000, easing: "easeInOutCubic" },
        { value: "0%", duration: 2000, easing: "easeInOutCubic" },
        { value: "-85%", duration: 2300, easing: "easeInOutCubic" },
        { value: "0%", duration: 2000, easing: "easeInOutCubic" },
        { value: "-20%", duration: 4000, easing: "easeInOutCubic" },
        { value: " 0%", duration: 3000, easing: "easeInOutCubic" },
      ],
      rotate: [{ value: 1440, duration: 19600, easing: "linear" }],
      loop: true,
    });
  }
  
  function animeAimMob() {
    anime({
      targets: ".scanning__nimb",
      translateX: [
        { value: "0%", duration: 0, easing: "easeInOutCubic" },
        { value: "75%", duration: 4000, easing: "easeInOutCubic" },
        { value: "155%", duration: 2000, easing: "easeInOutCubic" },
        { value: "255%", duration: 2300, easing: "easeInOutCubic" },
        { value: "155%", duration: 2000, easing: "easeInOutCubic" },
        { value: "100%", duration: 4000, easing: "easeInOutCubic" },
        { value: "0%", duration: 3000, easing: "easeInOutCubic" },
      ],
      translateY: [
        { value: " 0%", duration: 0, easing: "easeInOutCubic" },
        { value: "-20%", duration: 4000, easing: "easeInOutCubic" },
        { value: "0%", duration: 2000, easing: "easeInOutCubic" },
        { value: "-70%", duration: 2300, easing: "easeInOutCubic" },
        { value: "0%", duration: 2000, easing: "easeInOutCubic" },
        { value: "-10%", duration: 4000, easing: "easeInOutCubic" },
        { value: " 0%", duration: 3000, easing: "easeInOutCubic" },
      ],
      rotate: [{ value: 1440, duration: 19600, easing: "linear" }],
      loop: true,
    });
  }
  try {
    if (mobMedia) {
      animeAimMob();
    } else {
      animeAimDes();
    }
  } catch (err) {
    console.warn(err);
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
  