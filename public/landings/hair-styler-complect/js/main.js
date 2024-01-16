const mediaQuery = window.matchMedia("(max-width: 767px)").matches;

class LandingVideo {
  constructor(data) {
    this._class = typeof data === 'object' ? data.class : data;
    this._videos = document.querySelectorAll(`.${this._class}`);
  }
  addVideoSource() {
    const _mediaQuery = window.matchMedia('(min-width: 768px)');
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
new LandingVideo('video-on-load').addVideoSource();
new LandingVideo('video-on-load').playOnScroll();

const arrSelectorsThreshold50 = [
  '.naturalness__title_bolder',
  '.naturalness__text',
  '.removable-nozzles__title-text-block-bold',
  '.volumetric-styling__title-text-block-bold',
  '.tech-characters__item-image_curls',
];
const arrSelectorsThreshold10 = [
  '.removable-nozzles__nozzle-img_left',
  '.removable-nozzles__nozzle-img_right',
  '.volumetric-styling__nozzle-img_right',
  '.volumetric-styling__nozzle-img_left',
  '.three-steps__text',
];
const textThreeSteps = document.querySelectorAll('.three-steps__text');

const observer50 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const arrClass = entry.target.classList;
      if (arrClass.contains('naturalness__title_bolder'))
        entry.isIntersecting
          ? arrClass.add('naturalness__title_animation')
          : arrClass.remove('naturalness__title_animation');
      if (arrClass.contains('naturalness__text'))
        entry.isIntersecting
          ? arrClass.add('naturalness__text_animation')
          : arrClass.remove('naturalness__text_animation');
      if (arrClass.contains('removable-nozzles__title-text-block-bold'))
        entry.isIntersecting
          ? arrClass.add('removable-nozzles__title-text-block-bold_animation')
          : arrClass.remove('removable-nozzles__title-text-block-bold_animation');
      if (arrClass.contains('volumetric-styling__title-text-block-bold'))
        entry.isIntersecting
          ? arrClass.add('volumetric-styling__title-text-block-bold_animation')
          : arrClass.remove('volumetric-styling__title-text-block-bold_animation');
      // if(!mediaQuery && arrClass.contains('tech-characters__item-image_curls')) entry.isIntersecting ? arrClass.add('tech-characters__item-image_curls-animation') : arrClass.remove('tech-characters__item-image_curls-animation')
    });
  },
  {
    threshold: 0.5,
  }
);

const observer10 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const arrClass = entry.target.classList;
      const animation = Array.from(arrClass).some((item) => item.match(/animation/));
      if (entry.isIntersecting && !animation) {
        if (arrClass.contains('removable-nozzles__nozzle-img_left'))
          arrClass.add('removable-nozzles__nozzle-img_animation-left');
        if (arrClass.contains('removable-nozzles__nozzle-img_right'))
          arrClass.add('removable-nozzles__nozzle-img_animation-right');
        if (arrClass.contains('volumetric-styling__nozzle-img_right'))
          arrClass.add('volumetric-styling__nozzle-img_right-animation');
        if (arrClass.contains('volumetric-styling__nozzle-img_left'))
          arrClass.add('volumetric-styling__nozzle-img_left-animation');
        if (!mediaQuery && arrClass.contains('three-steps__text'))
          arrClass.add('three-steps__text_animation');
      }
    });
  },
  {
    threshold: 0.1,
  }
);

arrSelectorsThreshold50.forEach((selector) => {
  const observeEl = document.querySelector(selector);
  if (observeEl) {
    observer50.observe(observeEl);
  }
});
arrSelectorsThreshold10.forEach((selector) => {
    const observeEl = document.querySelector(selector);
    if (observeEl) {
      observer10.observe(observeEl);
    }
});
textThreeSteps.forEach((text) => {
  observer10.observe(text);
});

function scrollMagicAnim(sectionClassName, durationValue = .2, offsetValue = 0, noLeave = null) {
    let addClassOnScrollController = new ScrollMagic.Controller();
    const section = document.querySelector(sectionClassName);
    let sectionHeight = section.clientHeight;

    let classOnScroll = new ScrollMagic.Scene({
    triggerElement: section,
    duration: durationValue * sectionHeight,
    offset: offsetValue * sectionHeight,
    })
    .on("enter", () => {
      section.classList.add("active");
    })
    .addTo(addClassOnScrollController);
};
try{
    scrollMagicAnim(".lamination");
    scrollMagicAnim(".modes");
    // scrollMagicAnim(".image");
    scrollMagicAnim(".ions");
    scrollMagicAnim(".volume-nozzle");
    scrollMagicAnim(".curls-nozzle");
    scrollMagicAnim(".straightening-nozzle");
    scrollMagicAnim(".engine");
}catch(err){
    console.warn(err);
};

new Swiper('.effect__swiper', {
    slidesPerView: 1,
    speed: 400,
    spaceBetween: 39,
    autoplay: true,
    loop: true,
    breakpoints:{
        767:{
            slidesPerView: 3,
        },
        1024:{
            slidesPerView: 4,
        }
    }
});

new Swiper('.tech-swiper', {
    loop: true,
    autoplay: true,
    speed: 300,
    disableOnInteraction: false,
    slidesPerView: 2,
    breakpoints: {
        768: {
            speed: 200,
            slidesPerView: "auto",
        },
    },
});

new Swiper('.cold-air__swiper', {
    effect: "fade",
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: true,
    loop: true,
    fadeEffect: {
        crossFade: true,
      },
});

if (window.innerWidth > 450) {
    new Swiper('.gallery', {
        disableOnInteraction: false,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
            disableOnInteraction: false,
            delay: 3000,
        },
        effect: "fade",
        fadeEffect: {
            crossFade: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}
