function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
    
testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    }else{
        document.querySelector('body').classList.add('no-webp');
    }
});

document.addEventListener('DOMContentLoaded', function() { // Аналог $(document).ready(function(){
    let select = function () {
        let selectHeader = document.querySelectorAll('.select__header');
        let selectItem = document.querySelectorAll('.select__item');

        selectHeader.forEach(item => {
            item.addEventListener('click', selectToggle)
        });

        selectItem.forEach(item => {
            item.addEventListener('click', selectChoose)
        });

        function selectToggle() {
            this.parentElement.classList.toggle('is-active');
        }

        function selectChoose() {
            let text = this.innerText,
                select = this.closest('.select'),
                currentText = select.querySelector('.select__current');
            currentText.innerText = text;
            select.classList.remove('is-active');

        }
    };
    select();

    const slide = (slider, step, period) => () => {
        const startTime = Date.now();
        const startLeft = slider.scrollLeft;
        const render = () => {
            const dt = Date.now() - startTime
            if(dt < period){
                slider.scrollLeft = startLeft + step * dt / period 
                requestAnimationFrame(render)
            }
        }
        requestAnimationFrame(render);
    }
    
    (()=>{
        const slider = document.querySelector('#scroll-content');
        slider.scrollLeft = 155;
        document.querySelector('#scroll-right').addEventListener('click', slide(slider, 200, 300));
        document.querySelector('#scroll-left').addEventListener('click', slide(slider, -200, 300));
    })()
})