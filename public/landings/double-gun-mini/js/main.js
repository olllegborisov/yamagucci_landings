
const mediaQuery = window.matchMedia("(max-width: 767px)").matches;
const targetTitleFirsWord = document.querySelector(".target__title");
const targetTitleSecondWord = document.querySelector(".target__title-target");


new Swiper('.product-preview__running-line-container',{
    centeredSlides: true,
    loop: true,
    loopedSlides: 25,
    autoplay: {
        delay: 2000,
    }, 
    speed: 300,
    breakpoints: {
        320: {

        },
        767: {
            slidesPerView: 1,
        }
    }
});

const swiperText = new Swiper('.deep-massage__swiper-text',{
    centeredSlides: true,
    loop: true,
    // loopedSlides: 25,
    autoplay: {
        delay: 2250,
    }, 
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // speed: 300,
    breakpoints: {
        320: {
            // slidesPerView: auto,
            slidesPerView: 1,
            spaceBetween: 50,
        }, 
        767: {
            slidesPerView: 3,
        }
    }
});

const swiperContainer = new Swiper('.deep-massage__container',{
    loop: true,
    // initialSlide: 2,
    // speed: 300,
    autoplay: {
        delay: 2250,
    }, 
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
        crossFade: true,
    },
});

swiperText.on('slideChange', () => swiperContainer.slideToLoop(swiperText.realIndex));

const targetSwiper = new Swiper('.target__swiper', {
    disableOnInteraction: false,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: true,
    loop: true,
    effect: "fade",
    fadeEffect: {
    },
});

if(!mediaQuery){
    targetSwiper.on('slideChange', () => {
        targetTitleFirsWord.classList.remove('target__title_bold');
        targetTitleSecondWord.classList.remove('target__title-target_bold');

        targetSwiper.realIndex === 1 ? 
            targetTitleFirsWord.classList.add('target__title_bold') : 
            targetTitleSecondWord.classList.add('target__title-target_bold');
    });
}

if (mediaQuery){
    new Swiper(".characters__wrapper", {
        loop: true,
        // loopedSlides: 26,
        // disableOnInteraction: false,
        speed: 1000,
        autoplay: true,
        slidesPerView: "auto",
        slidesPerView: 1,
})}

if(!mediaQuery){
    new Swiper('.swiper-footer__container',{
        loop: true,
        autoplay: {
            delay: 2000,
        }, 
        speed: 300,
        breakpoints: {
            767: {
                init: true,
                slidesPerView: 1,
                direction: 'horizontal',
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    clickable: true
                },
            }
        }
    });
}

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
            if (_video.dataset.videoMob && _mediaQuery.matches) {
                if (_video.dataset.videoMobWebm) {
                    _video.innerHTML = `<source src="${_video.dataset.videoMobWebm}" type='video/webm; codecs="vp8, vorbis"'> <source src="${_video.dataset.videoMob}"> `;
                } else {
                    _video.innerHTML = `<source src="${_video.dataset.videoMob}">`;
                }
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

new LandingVideo('video-on-load').addVideoSource();

initializeTickerSwiper('arm-pro-slider_left');
initializeTickerSwiper('arm-pro-slider_right');

function initializeTickerSwiper(className) {
    const armProSwiper = new Swiper(`.${className}`, {
        slidesPerView: 1.33,
        spaceBetween: 0,
        speed: 30000,
        loop: true,
        autoplay: {
            disableOnInteraction: false,
            reverseDirection: true,
            delay: 0,
        },
    });
    return armProSwiper;
}

new Swiper(".deep-massage-help__wrapper", {
    // slidesPerView: 1.2,
    speed: 6000,
    // spaceBetween: 40,
    breakpoints: {
      768: {
        spaceBetween: 35,
        slidesPerView: 4.25,
      },
      320: {
        spaceBetween: 25,
        slidesPerView: 1.145,
      },
    },
    loop: true,
    autoplay: {
      disableOnInteraction: true,
      delay: 0,
    },
});

class ObserverVisible {
    constructor(data, selector) {
        this._class = typeof data === 'object' ? data.class : data;
        this._currentElements = document.querySelectorAll(`.${this._class}`);
        this._options = {
            root: null,
            rootMargin: `0px 0px ${
                data.marginBottom ? data.marginBottom : '-20%'
            } 0px`,
            threshold: data.threshold ? data.threshold : .01,
        }
        this._observer = new IntersectionObserver((entries, obs) => {
            for (let i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    setTimeout(() => {
                        // Удаление класса this._selector у элемента при скролле
                        entries[i].target.classList.remove(this._selector);
                    }, data.delay ? data.delay : 0)
                }
            }
        }, this._options);
        this._selector = selector;
    }

    setElementsVisibleOnScroll() { 
        const _observerArr = [];
        for (let i = 0; i < this._currentElements.length; i++) {
            // добавляет класс this._selector к элементам при загрузке страницы
            this._currentElements[i].classList.add(this._selector);
            // добавляет в общий массив 
            _observerArr.push(this._observer.observe(this._currentElements[i]));
        }
        return _observerArr;
    }
}


new ObserverVisible('element-for-visible', '_hide').setElementsVisibleOnScroll();

const sketchingAnimation = new ObserverVisible('animated-element', 'without-animation').setElementsVisibleOnScroll();