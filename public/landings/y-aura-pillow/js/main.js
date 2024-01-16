
// const mediaQuery = window.matchMedia("(max-width: 767px)").matches;
//анимация появления элементов на странице
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
  
  function sectionObserver() {
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
        threshold: 0.6,
      }
    );
  
    const observeElements = document.querySelector(".img-for-visible");
    const whatForItem = document.querySelectorAll(".what-for__item");
  
    whatForItem.forEach((img) => observer.observe(img));
    observer.observe(observeElements);
  }
  if (window.innerWidth > 768) {
    sectionObserver();
  }
  // Swiper слайдер для блока interior
  if (window.innerWidth > 767) {
    
    const swiperBgContainer = new Swiper(".interiors__bg-container", {
      effect: "fade",
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  
    const title = document.querySelector('.interiors__text-container');
  
    swiperBgContainer.on('slideChange', function () {
      // console.log()
      this.activeIndex === 1 ? title.classList.add('hidden') : title.classList.remove('hidden');
      // console.log(this.activeIndex)
    })
  }
  
  //   console.log(interiorSwiper);
  
  // --->
  
  // открытие и закрытие параграфа в блоке effect
  const effectPlusButton = document.querySelector(".effect__text-anim-btn");
  const effectParagraph = document.querySelector(".effect__paragraph");
  
  //   функция обработчик клика на плюсик
  function hendleEffectPlusButtonClick(evt) {
    if (evt.currentTarget.classList.contains("effect__text-anim-btn_active")) {
      evt.currentTarget.classList.remove("effect__text-anim-btn_active");
      effectParagraph.classList.remove("effect__paragraph_visible");
    } else {
      evt.currentTarget.classList.add("effect__text-anim-btn_active");
      effectParagraph.classList.add("effect__paragraph_visible");
    }
  }
  
  //   effectPlusButton.addEventListener('click', hendleEffectPlusButtonClick);
  // --->
  
  $(document).ready(function ($) {
    $(".landing-card-sm__images").slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      dots: false,
      fade: true,
    });
  
    if ($(window).width() < 768) {
      $(".what-for__content").slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        fade: true,
        // adaptiveHeight: true,
        // autoplay: true,
        autoplaySpeed: 2000,
      });
    }
  
    let lotus = setInterval(function () {
      lotusSlides();
    }, 1500);
    var lotusElement;
    if ($(window).width() < 768) {
      lotusElement = ".lotus__mob-img";
    } else {
      lotusElement = ".lotus__img";
    }
    function lotusSlides() {
      let elements = $(lotusElement);
  
      for (let i = 0; i < elements.length; i++) {
        if (i < 1) {
          if (elements[i].classList.contains("img-show")) {
            elements[i].classList.remove("img-show");
            elements[i + 1].classList.add("img-show");
            break;
          }
        } else {
          elements[i].classList.remove("img-show");
          elements[0].classList.add("img-show");
          break;
        }
      }
    }
    $(".effect__anim-icon").click(function () {
      $(".effect__anim").toggleClass("active");
      if ($(window).width() < 768) {
        $(".effect__anim-text").slideToggle();
      }
    });
  });
  
  // --- анимация переключения картинок в блоке roses --->
  const flowerImg = document.querySelector(".rose__img_flower");
  const itemImg = document.querySelector(".rose__img_item");
  
  // колбэк для смены картинок с определенной периодичностью
  function hendleAnimationRoses() {
    if (flowerImg.classList.contains("rose__img_hide")) {
      flowerImg.classList.remove("rose__img_hide");
      itemImg.classList.add("rose__img_hide");
    } else {
      itemImg.classList.remove("rose__img_hide");
      flowerImg.classList.add("rose__img_hide");
    }
  }
  
  // обработчик скролла для блока rose
  function hendleScrollForRosesAnimation() {
    const lastScroll = window.scrollY + document.documentElement.clientHeight;
    const distanceFromImgToTop =
      flowerImg.getBoundingClientRect().bottom + window.scrollY;
    // const lastScroll = window.pageYOffset + document.documentElement.clientHeight;
    // const distanceFromImgToTop = flowerImg.getBoundingClientRect().bottom + window.pageYOffset;
  
    if (lastScroll > distanceFromImgToTop) {
      setInterval(hendleAnimationRoses, 3500);
  
      document.removeEventListener("scroll", hendleScrollForRosesAnimation);
    }
  }
  
  // слушатель скролла для блока rose
  document.addEventListener("scroll", hendleScrollForRosesAnimation);
  // --->
  