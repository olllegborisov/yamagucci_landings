new Swiper('.swiper-top', {
    centeredSlides: true,
    loop: true,
    autoplay: {
         delay: 2000,
    }, 
    speed: 300,
 
    breakpoints: {
     320:{
         spaceBetween: 14,
     },
     767:{
        spaceBetween: 20,
        slidesPerView: 1.2,
    },  
     1239: {
         slidesPerView: 1.6,
         spaceBetween: 40,
     }
    }
 });
 
 new Swiper('.swiper-bottom', {
     centeredSlides: true,
     loop: true,
     autoplay: {
         delay: 2000,
     }, 
     speed: 600,
     breakpoints: {
         320:{
             slidesPerView: 1.15,
             spaceBetween: 4.5,
         },
         1239: {
             slidesPerView: 2,
             spaceBetween: 16,
         }
     },
 
 });
 
 //SCROLL MAGIC ANIMATION
 scrollMagicAnim = (sectionClassName, durationValue = .2, offsetValue = 0, noLeave = null) => {
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
             startingAnimation(section);
         })
         .addTo(addClassOnScrollController);
 };
 
 try {
     scrollMagicAnim(".main-question");
     scrollMagicAnim(".list-answers");
     scrollMagicAnim(".aqua-tester1");
     scrollMagicAnim(".dirty-water");
     scrollMagicAnim(".clean-water");
     scrollMagicAnim(".equipment__bg");
     scrollMagicAnim(".temp");
 } catch (err) {
     console.warn(err);
 };
 
 
 startingAnimation = block => {
 
     const classNameBlock = block.classList;
 
     if (classNameBlock.contains('aqua-tester1')) {
 
         const elementAnimation = block.querySelector('.aqua-screen__screen-tds');
 
         gsap.to(elementAnimation, {
             opacity: 1,
             duration: 4
         })
 
     }
 
     if (classNameBlock.contains('dirty-water')) {
 
         const elementsAnimation = block.querySelectorAll('.warning-card');
 
         Array.from(elementsAnimation).forEach((element, item) => {
             gsap.to(element, {
                 delay: item / 3,
                 opacity: 1,
                 duration: 0.5,
                 x: 0,
             })
         });
     }
 
     if (classNameBlock.contains('equipment__bg')) {
 
         const iconsAdvantages = document.querySelectorAll('.equipment__advantages-icon');
         const notationElements = document.querySelectorAll('.designation');
         const mediaQuery = window.matchMedia("(max-width: 767px)");
 
 
         Array.from(iconsAdvantages).forEach(element => {
             gsap.fromTo(element, {
                 y: -200,
                 opacity: 0,
             }, {
                 opacity: 1,
                 y: 0,
                 duration: 0.2,
             });
         });
 
         Array.from(notationElements).forEach((element, index) => {
             if(mediaQuery.matches && index < 3){
 
                 gsap.fromTo(element, {
                     x: -500,
                     opacity: 0,
                 }, {
                     opacity: 1,
                     x: 0,
                     duration: 1,
                 });
 
                 return false;
             }
 
             if(mediaQuery.matches && index > 2){
 
                 gsap.fromTo(element, {
                     x: 500,
                     opacity: 0,
                 }, {
                     opacity: 1,
                     x: 0,
                     duration: 1,
                 });
 
                 return false;
             }
 
             if(element.classList.contains('designation_cup')) {
                 gsap.fromTo(element, {
                     x: -500,
                     opacity: 0,
                 }, {
                     opacity: 1,
                     x: 0,
                     duration: 1,
                 });
 
                 return false;
             } 
 
             gsap.fromTo(element, {
                 x: 500,
                 opacity: 0,
             }, {
                 opacity: 1,
                 x: 0,
                 duration: 1,
             });
         });
     }
 
     if (classNameBlock.contains('temp')) {
 
         const elementsAnimation = block.querySelectorAll('.temp__text');
 
         Array.from(elementsAnimation).forEach(element => {
             gsap.to(element, {
                 opacity: 1,
             });
         });
     }
 
 }
 
 
 