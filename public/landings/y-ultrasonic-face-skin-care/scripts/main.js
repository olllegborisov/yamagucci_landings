const effectSwiper = new Swiper('.effect__swiper', {
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
        }
    }
});

const bottomSwiper = new Swiper('.ultrasonic-bottom-swiper', {
    speed: 400,
    autoplay: true,
    loop: true,
    slidesPerView: 1,
});



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
// =====================================================================================================================================>
new LandingVideo('video-on-load').addVideoSource();
new LandingVideo('video-on-load').playOnScroll();


//SCROLL MAGIC ANIMATION
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
    scrollMagicAnim(".advantages");
    scrollMagicAnim(".ultrasound");
    scrollMagicAnim(".phonoforez__top");
    scrollMagicAnim(".phonoforez__bottom");
    scrollMagicAnim(".modes__top");
    scrollMagicAnim(".modes__middle");
    scrollMagicAnim(".modes__bottom");
    scrollMagicAnim(".hyaluronic-acid");
}catch(err){
    console.warn(err);
};
