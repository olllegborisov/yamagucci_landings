
const mediaQuery = window.matchMedia("(max-width: 767px)").matches;

const dumbbells = document.querySelectorAll('.dumbbell-item');
const searchButton = document.querySelector('.dumbbell-search__button');

const dumbbellSearchSwiper = document.querySelector('.dumbbell-search__swiper');
const interactiveTitle = document.querySelector('.dumbbell-search__interactive-title');


if(!mediaQuery){
    new Swiper('.components__swiper',{
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 2000,
        }, 
        speed: 500,
        spaceBetween: 30,
        effect: 'flip',
        flipEffect: {
            slideShadows: false,
        },
        direction: 'vertical'
    });
}

if(mediaQuery) {
    const button = document.querySelector('.dumbbell-search__button');
    button.textContent = null;
}


new Swiper('.weight-adjustment__swiper',{
    centeredSlides: true,
    loop: true,
    loopedSlides: 25,
    autoplay: {
        delay: 2000,
    }, 
    speed: 300,
    breakpoints: {
        // 320: {
        //     slidesPerView: 1.25,
        //     spaceBetween: 10,
        // },
        // 767: {
        //     slidesPerView: 2.875,
        //     spaceBetween: 25,
        // }
        320: {
            slidesPerView: 1.57,
            spaceBetween: 12,
        },
        767: {
            slidesPerView: 4.28,
            spaceBetween: 25,
        }
    }
});

new Swiper('.dumbbell-presentation__swiper',{
    centeredSlides: true,
    loop: true,
    autoplay: {
        delay: 2000,
    }, 
    speed: 300,
    breakpoints: {
        320: {
            slidesPerView: 1.6,
            spaceBetween: 10,
        },
        767: {
            // slidesOffsetBefore: 64,
            slidesPerView: 4.28,
            spaceBetween: 28,
        }
    }
});

new Swiper('.kettlebell__swiper',{
    slidesOffsetBefore: 32,
    loop: true,
    slidesPerView: 4.15,
    // spaceBetween: 31,
    spaceBetween: 26,
    autoplay: {
        delay: 2000,
    }, 
    speed: 300,    
    breakpoints: {
        320: {
            slidesOffsetBefore: 60,
            slidesPerView: 1.6,
            spaceBetween: 12.5,
        },
        767: {
            slidesOffsetBefore: 27,
            slidesPerView: 4.3,

        }
    }
});

new Swiper('.benefit__swiper',{
    loop: true,
    autoplay: {
        delay: 2000,
    }, 
    speed: 300,
    breakpoints: {
        320: {
            // centeredSlides: true,
            slidesOffsetBefore: 45,
            slidesPerView: 1.45,
            spaceBetween: 23,
        },
        767: {
            slidesOffsetBefore: 180,
            slidesPerView: 4.9,
            spaceBetween: 43,
        }
    }
});

const dumbbellSearchSwiperClass =  new Swiper(dumbbellSearchSwiper,{
    loop: true,
    autoplay: {
        delay: 4000,
    }, 
    speed: 500,
    breakpoints:{
        slidesOffsetBefore: 100,
    }
});


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

// Обработка события клика на кнопку поиска гантели
const pointDumbbell = () => {
    const activeSlide = dumbbellSearchSwiper.querySelector('.swiper-slide-active');

    // удаление окна отображения гантели в интерьере 
    if(/[a-z]_show/.test(activeSlide.className)) {
        const regex = activeSlide.className.match(/\S+_show/gi);        
        regex.forEach(item => activeSlide.classList.remove(item));
        return false
    }
    
    if(dumbbellSearchSwiperClass.activeIndex === 4 || 
        dumbbellSearchSwiperClass.activeIndex === 0) {
            activeSlide.classList.add('dumbbell-search__dumbbell-search-fourth_show');
            return false
        }

    if(dumbbellSearchSwiperClass.activeIndex === 1 || 
        dumbbellSearchSwiperClass.activeIndex === 5) {
            activeSlide.classList.add('dumbbell-search__dumbbell-search-first_show');
            return false
        } 
    
    if(dumbbellSearchSwiperClass.activeIndex === 2) activeSlide.classList.add('dumbbell-search__dumbbell-search-second_show');
    
    if(dumbbellSearchSwiperClass.activeIndex === 3) activeSlide.classList.add('dumbbell-search__dumbbell-search-third_show');
    

}
searchButton.addEventListener('click', pointDumbbell)

// Обработка события смены box-shadow у заголовка
dumbbellSearchSwiperClass.on('slideChange', function () {
    if(mediaQuery) return false; // в моб версии убрать функционал

    const title = document.querySelector('.dumbbell-search__interactive-title');

    title.className = '';
    title.classList.add('dumbbell-search__interactive-title');
    
    if(this.activeIndex === 1 || 5)title.classList.add('dumbbell-search__interactive-title_shadow-brown');
    
    if(this.activeIndex === 2)title.classList.add('dumbbell-search__interactive-title_shadow-blue');
    
    if(this.activeIndex === 3)title.classList.add('dumbbell-search__interactive-title_shadow-yellow');
    
    if(this.activeIndex === 4 || 0)title.classList.add('dumbbell-search__interactive-title_shadow-white'); // 0 === 4 слайд не работают

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
    // scrollMagicAnim(".stylish-barbell");
    scrollMagicAnim(".multifunctional-rod");
    scrollMagicAnim(".weight-adjustment");
    // scrollMagicAnim(".weight-adjustment__alert-top");
    scrollMagicAnim(".dumbbell-presentation");
    scrollMagicAnim(".kettlebell");
    scrollMagicAnim(".benefit");
    scrollMagicAnim(".easy-and-simple");
    scrollMagicAnim('.comfortable-handle')
    scrollMagicAnim('.dumbbell-search');
    scrollMagicAnim('.home-fitness-room');
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