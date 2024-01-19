$('.landing-card-sm__images').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    fade: true
});
if($(window).width() < 768){
$('.points__mob').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    fade: true
});
};

// document.addEventListener('DOMContentLoaded', function(){
    let wrapper = document.getElementById('wrapper');
    let topLayer = wrapper.querySelector('.top');
    let handle = wrapper.querySelector('.handle');
    let skew = 0;
    let delta = 0;

    if(wrapper.className.indexOf('skewed') != -1){
    skew = 500;
    }

    wrapper.addEventListener("mousemove", function(e){
    delta = (e.clientX - window.innerWidth / 2) * 0.5;

    handle.style.left = e.clientX + delta + "px";

    topLayer.style.width= e.clientX + skew + delta + "px";
    });

    wrapper.addEventListener("touchmove", function(e) {
        console.log(this)
    delta = (e.changedTouches[0].clientX - window.innerWidth / 2) * 0.5;
    handle.style.left = e.changedTouches[0].clientX + delta + "px";
    topLayer.style.width = e.changedTouches[0].clientX + skew + delta + "px";
    });
// });

let interior = setInterval(function () {
    interiorSlides();
}, 2000);

var interiorElement ;
if($(window).width() < 768){
  interiorElement = '.interior__img-mob';
} else{
  interiorElement = '.interior__img';
}
function interiorSlides() {
    let elements = $(interiorElement);

    for (let i = 0; i < elements.length; i++) {
        if (i < 4) {
            if (elements[i].classList.contains('img-show')) {
                elements[i].classList.remove('img-show');
                elements[i + 1].classList.add('img-show');
                break;
            }
        } else {
            elements[i].classList.remove('img-show');
            elements[0].classList.add('img-show');
            break;
        }
    }
};

 // None of the options are set
$(".makeMeScrollable").smoothDivScroll({
    // mousewheelScrolling: 'allDirections',
    manualContinuousScrolling: true,
    autoScrollingMode: "onStart",
    autoScrollingInterval: 1,
    autoScrollingStep: 1,
    touchScrolling: true,
    hotSpotScrollingStep: 3,
    // autoScrollingPauseOnHover: true
});

$(".makeMeScrollable").bind("mouseout", function () {
    $(".makeMeScrollable").smoothDivScroll("startAutoScrolling");
});

let points = setInterval(function () {
    pointsSlides();
}, 1000);

var pointsElement ;
// if($(window).width() < 768){
//     interiorElement = '.interior__img-mob';
//   } else{
//     interiorElement = '.interior__img';
//   }
function pointsSlides() {
    let elementRed = $('.points__item--red');
    let elementGreen = $('.points__item--green');

    for (let i = 0; i < elementRed.length; i++) {
        if (i < 3) {
            if (elementRed[i].classList.contains('active') && elementGreen[i].classList.contains('active')) {
                elementRed[i].classList.remove('active');
                elementRed[i + 1].classList.add('active');
                elementGreen[i].classList.remove('active');
                elementGreen[i + 1].classList.add('active');
                break;
            }
        } else {
            elementRed[i].classList.remove('active');
            elementRed[0].classList.add('active');
            elementGreen[i].classList.remove('active');
            elementGreen[0].classList.add('active');
            break;
        }
    }
};