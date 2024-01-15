if(window.matchMedia('(max-width: 767px)').matches) {
  new Swiper('.dumbbell-2__container', {
      speed: 400,
      autoplay: true,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      centeredSlides: true,
  });
};

if(window.matchMedia('(max-width: 767px)').matches) {
  new Swiper('.better-set__container', {
      speed: 400,
      autoplay: true,
      loop: true,
      slidesPerView: 1,
      spaceBetween: 30,
      centeredSlides: true,
  });
};


new Swiper('.more-option__container', {
  speed: 400,
  autoplay: true,
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,
  centeredSlides: true,
  breakpoints: {
      768: {
          slidesPerView: 1,
          loop: true,
      },
      1240: {
          slidesPerView: 3,
          loop: true,
      },
  }
});

function putSomeParallax() {
  let parallaxes = document.querySelectorAll('.parallax-effect')
  if (parallaxes) {
      let parArray = Array.from(parallaxes)
          window.addEventListener('scroll', function(event) {
          let top = this.scrollY
          let speed
          let yPos
          parallaxes.forEach((el) => {
              speed = el.dataset.speed
              yPos = -(top * +speed / 100)
              el.style = 'top:' + yPos + 'px;'
          })
      })
  }
};
putSomeParallax();


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
  scrollMagicAnim(".silicone-dumbell");
  scrollMagicAnim(".dumbbell-2");
  scrollMagicAnim(".more-option");
  scrollMagicAnim(".better-set");
}catch(err){
  console.warn(err);
};
