function testWebP(callback) {
    let webP = new Image();
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
});
// Слайдер цены________________
let slider = document.querySelector('#sliderFilter');

noUiSlider.create(slider, {
    start: [0, 999],
    connect: true,
    step: 10,
    range: {
        'min': 0,
        'max': 900
    }
});
let Min = document.getElementById('Min');
let Max = document.getElementById('Max');

slider.noUiSlider.on('update', function (values, handle) {
    if (handle) {
        Max.value = Number(values[handle]);
    } else {
        Min.value = Number(values[handle]);
    }
});


document.getElementById('apply').addEventListener('click', function() {
    slider.noUiSlider.set([Min.value, Max.value]);
});
document.getElementById('reset').addEventListener('click', function() {
    Min.value = 0;
    Max.value = 900;
    slider.noUiSlider.set([Min.value, Max.value]);
});


function openCity(cityName, event) {
    if (event.target.className != "info__percent_green") {
        let i;
        let x = document.getElementsByClassName("tabcontent");
        let g = document.querySelectorAll(".w3-button");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
            g[i].id = '';
        }
        document.getElementById(cityName).style.display = "block";
        console.log(event);
        event.target.id = 'button-green';
    }
}

// Бургер
function burger(event, name) {
    let cl_name = document.querySelector(name);

    cl_name.classList.toggle("burger__active");
    document.querySelector("body").classList.toggle("body__active");
}

// Grid, list view
function gridVi(event) {
    document.querySelector('.main__list-view').classList.remove('main__list-view_active');
    event.target.className += " main__grid-view_active";
    
    document.querySelectorAll('.main__product').forEach((i) => {
        i.classList.add("product__grid");
    });
    document.querySelectorAll('.product__button_arRight').forEach((i) => {
        i.innerHTML = 'Buy now';
    });
    document.querySelector(".main__categoryProduct").classList.add("main__categoryProduct_grid");
}
function listVi(event) {
    document.querySelector('.main__grid-view').classList.remove('main__grid-view_active');
    event.target.className += " main__list-view_active";
    
    document.querySelectorAll('.main__product').forEach((i) => {
        i.classList.remove("product__grid");
    });
    document.querySelectorAll('.product__button_arRight').forEach((i) => {
        i.innerHTML = '<span class="button_list">Product Detail</span><span class="button_grid">Buy now</span>';
    });
    document.querySelector(".main__categoryProduct").classList.remove("main__categoryProduct_grid");
}

// Filter
function butFilter() {
    document.querySelector(".categoryFilter").classList.toggle("categoryFilter__active");
    // Прокрутка блока Filter
    (function(){
        let a = document.querySelector('#categoryFilter'), 
            b = null, K = null, 
            Z = 0, P = 0, N = 0;  // если у P ноль заменить на число, то блок будет прилипать до того, как верхний край окна браузера дойдёт до верхнего края элемента, если у N — нижний край дойдёт до нижнего края элемента. Может быть отрицательным числом
        window.addEventListener('scroll', Ascroll, false);
        document.body.addEventListener('scroll', Ascroll, false);
        function Ascroll() {
        let Ra = a.getBoundingClientRect(),
            R1bottom = document.querySelector('#categoryProduct').getBoundingClientRect().bottom;
        if (Ra.bottom < R1bottom) {
            if (b == null) {
            let Sa = getComputedStyle(a, ''), s = '';
            for (let i = 0; i < Sa.length; i++) {
                if (Sa[i].indexOf('overflow') == 0 || Sa[i].indexOf('padding') == 0 || 
                    Sa[i].indexOf('border') == 0 || Sa[i].indexOf('outline') == 0 || 
                    Sa[i].indexOf('box-shadow') == 0 || Sa[i].indexOf('background') == 0) {
                    
                    s += Sa[i] + ': ' + Sa.getPropertyValue(Sa[i]) + '; '
                }
            }
            b = document.createElement('div'); // To be continued
            b.className = "stop";
            b.style.cssText = s + ' box-sizing: border-box; width: ' + a.offsetWidth + 'px;';
            a.insertBefore(b, a.firstChild);
            let l = a.childNodes.length;
            for (let i = 1; i < l; i++) {
                b.appendChild(a.childNodes[1]);
            }
            a.style.height = b.getBoundingClientRect().height + 'px';
            a.style.padding = '0';
            a.style.border = '0';
            }
            let Rb = b.getBoundingClientRect(),
                Rh = Ra.top + Rb.height,
                W = document.documentElement.clientHeight,
                R1 = Math.round(Rh - R1bottom),
                R2 = Math.round(Rh - W);
        
            if (Rb.height > W) {
            if (Ra.top < K) {  // скролл вниз
                if (R2 + N > R1) {  // не дойти до низа
                if (Rb.bottom - W + N <= 0) {  // подцепиться
                    b.className = 'sticky';
                    b.style.bottom = 5 + 'px'; // -419px
                    Z = N + Ra.top + Rb.height - W;
                } 
                else {
                    b.className = 'stop';
                    b.style.top = "";
                }
                } else {
                b.className = 'stop';
                b.style.bottom = R1 + 'px';
                Z = R1;
                }
                
            } else {  // скролл вверх
                if (Ra.top - P < 0) {  // не дойти до верха
                if (Rb.top - P >= 0) {  // подцепиться
                    b.className = 'sticky';
                    b.style.top = P + 'px';
                    Z = Ra.top - P;
                } else {
                    b.className = 'stop';
                    b.style.bottom = "";
                    b.style.top = - Z + 'px';
                }
                } else {
                b.className = '';
                b.style.top = '';
                Z = 0;
                }
            }
            K = Ra.top;
                
            } else {
            if ((Ra.top - P) <= 0) {
                if ((Ra.top - P) <= R1) {
                b.className = 'stop';
                b.style.top = - R1 +'px';
                } else {
                b.className = 'sticky';
                b.style.top = P + 'px';
                }
            } else {
                b.className = '';
                b.style.top = '';
            }
            }
            window.addEventListener('resize', function() {
            a.children[0].style.width = getComputedStyle(a, '').width
            }, false);
        }
        }
        })()
}
