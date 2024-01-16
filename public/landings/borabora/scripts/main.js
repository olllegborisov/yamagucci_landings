//details slider
$('.details__slider').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1
          }
        }
      ]
})

const getSlideNumber = (slide) => {
    const slideNumber = parseInt(slide, 10);
    return slideNumber <= 9 ? `0${slideNumber}` : `${slideNumber}`;
  };

$('.details__slider').on(`init reInit`, function(event, slick) {
    $('.details__count span').text(`01`);
  })
  $('.details__slider').on(`afterChange`, function(event, slick, currentSlide) {
    $('.details__count span').text(getSlideNumber(currentSlide + 1));
  })

//slider click
document.querySelector('#countLeft').addEventListener('click', (evt) =>  {
    document.querySelector('.details__slider .slick-prev').click();
});

document.querySelector('#countRight').addEventListener('click', (evt) =>  {
    document.querySelector('.details__slider .slick-next').click();
});

//popup
const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.style.display = `none`;
    document.removeEventListener('keydown', closeKeydownPopup);
    document.removeEventListener('click', closeLayoutPopup);
};

const closeKeydownPopup = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        closePopup();
    }
}

const closeLayoutPopup = (evt) => {
    const popup = document.querySelector('.popup');
    if (popup.style.display === `block` && evt.target.className === 'popup') {
        closePopup();
    }
}

const handlePopupButtonClick = () => {
    const popup = document.querySelector('.popup');
    const popupCloseButton = document.querySelector('.popup__close-button');

    popup.style.display = `block`;
    document.addEventListener('keydown', closeKeydownPopup);
    document.addEventListener('click', closeLayoutPopup);
    popupCloseButton.addEventListener('click', closePopup)
};

document.querySelector('.thought-out__button').addEventListener('click', handlePopupButtonClick);

