const Sliders = function(){

    const rew = new Swiper('.ice__slider', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 2,
        spaceBetween: 10,
        navigation: {
          nextEl: '.ice__slider .swiper-button-next',
          prevEl: '.ice__slider .swiper-button-prev',
        },
        breakpoints: {
            320: {
              slidesPerView: 2,
            },
            400: {
              slidesPerView: 3,
            },
            600: {
              slidesPerView: 4,
            },
            800: {
                slidesPerView: 4,
            },
            1000: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 5,
            },
            1400: {
                slidesPerView: 6,
            },
              
        
        },
        
        
      });

};
export default Sliders;