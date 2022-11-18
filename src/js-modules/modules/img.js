const Img = function(){
    const imgs = document.querySelectorAll('.main-footer__img img');
    let i = -1;

    setInterval(()=>{
        i++;
        
        imgs.forEach((item)=>{
            item.classList.add('none');
        });
        imgs[i].classList.remove('none');
        if(i == 4){
            i=-1;
        }
    },2000);

};
export default Img;