// const mediaQuery = window.matchMedia('(max-width: 767px)').matches;

new Swiper(".rotate-swiper__swiper", {
    speed: 4000,
    loopedSlides: 25,
    spaceBetween: 15,
    breakpoints: {
        767: {
        slidesPerView: 3.2,
        },
        320: {
        spaceBetween: 5,
        centeredSlides: true,
        slidesPerView: 1.65,
        },
    },
    loop: true,
    autoplay: {
        disableOnInteraction: true,
        delay: 0,
    },
});

new Swiper('.effect__swiper', {
    loop: true,
    autoplay: {
            delay: 2000,
    }, 
    speed: 300,

    breakpoints: {
        320: {
            // slidesPerView: 1.4,
            spaceBetween: 14,
            centeredSlides: 'true',
            slidesPerView: 1.25,
            // slidesOffsetBefore: 35,
        },
        767:{
            slidesPerView: 2,
            spaceBetween: 25,
            slidesOffsetBefore: -44,
        },
        1100:{
            slidesPerView: 2.65,
            spaceBetween: 25,
            slidesOffsetBefore: -44,
        },
        1239:{
            slidesPerView: 3.65,
            spaceBetween: 25,
            slidesOffsetBefore: -44,
        },
        1420: {
            slidesPerView: 4.65,
            spaceBetween: 25,
            slidesOffsetBefore: -44,
        },
}
});

// if(!mediaQuery){
//     new Swiper('.swiper-footer__container',{
//         loop: true,
//         autoplay: {
//             delay: 2000,
//         }, 
//         speed: 300,
//         breakpoints: {
//             767: {
//                 init: true,
//                 slidesPerView: 1,
//                 direction: 'horizontal',
//             }
//         }
//     });
// }


function hoursAnim() {
    const timeNumber = document.querySelector(".hours__time-number");
    let numberTimerId;

    let observer = new IntersectionObserver(
        (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
        numberTimerId  = setInterval(changeNumber, 150, timeNumber, numberTimerId);
            observer.unobserve(entry.target);
            }
        });
        },
        { threshold: 1 }
    );

    observer.observe(timeNumber);
}

hoursAnim();


function changeNumber(element, timerId) {
    let elementValue = +element.innerText;
    if (elementValue < 6) {
      element.innerText = elementValue + 1;
    } else {
      clearInterval(timerId);
    }
  } 
  

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
    scrollMagicAnim(".massage-imitation");
    scrollMagicAnim(".massage-4-hands");
    scrollMagicAnim(".voice-prompts");
    scrollMagicAnim(".effect");
    scrollMagicAnim(".light-therapy");
    scrollMagicAnim(".meditation");
    scrollMagicAnim(".music");
    scrollMagicAnim(".central-panel");
    scrollMagicAnim(".head-size");
}catch(err){
    console.warn(err);
};

class LandingVideo {

    constructor(data) {
        console.log(data)
        this._class = typeof data === 'object' ? data.class : data;
        this._videos = document.querySelectorAll(`.${this._class}`);
    }

    addVideoSource() {
        const _mediaQuery = window.matchMedia('(max-width: 768px)');

        for (let i = 0; i < this._videos.length; i++) {
            let _video = this._videos[i];
            console.log(_video.dataset, )

            // Добавление видео в моб. версию
            if (_video.dataset.videoMob && _mediaQuery.matches) {

                if (_video.dataset.videoMobWebm) {
                    _video.innerHTML = `<source src="${_video.dataset.videoMobWebm}" type='video/webm; codecs="vp8, vorbis"'> <source src="${_video.dataset.videoMob}"> `;
                } else {
                    _video.innerHTML = `<source src="${_video.dataset.videoMob}">`;
                }

            // Добавление видео в десктоп версию
            } else if (_video.dataset.video && !_mediaQuery.matches) {
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
            /**
             * threshold - при каком проценте появления видео
             * в области видимости запускать его
             */    
            threshold: 0.001, 
        }

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

const videoOnLoad = new LandingVideo('video-on-load');
videoOnLoad.addVideoSource(); // Добавление data-тэгов c ссылками на видео 
videoOnLoad.playOnScroll(); // Запуск видео при появлении в области видимости