import Swiper from './modules/swip';

import Img from './modules/img';

import Sliders from './modules/sliders';

document.addEventListener('DOMContentLoaded', ()=>{
    try{
        Swiper();
    }catch(error){};

    try{
        Img();
    }catch(error){};

    try{
        Sliders();
    }catch(error){};


});


