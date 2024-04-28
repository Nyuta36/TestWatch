// Ползунок фильтра стоимости
const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-input input"),
range = document.querySelector(".slider .progress");
let priceGap = 5000;

priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);
        
        if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
            if(e.target.className === "input-min"){
                rangeInput[0].value = minPrice;
                range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
            }else{
                rangeInput[1].value = maxPrice;
                range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});


// аккордеон фильтра

const titlesFilter = document.querySelectorAll('.accordion--title');
const contentsFilter = document.querySelectorAll('.accordion--content');

titlesFilter.forEach(item => item.addEventListener('click', () => {
    const  activeContent = document.querySelector('#' + item.dataset.tab);

    if (activeContent.classList.contains('active')) {
        activeContent.classList.remove('active');
        item.classList.remove('active');
        activeContent.style.maxHeight = 0;
    } else {
        contentsFilter.forEach(element => {
            element.classList.remove('active');
            element.style.maxHeight = 0;
        });

        titlesFilter.forEach(element => element.classList.remove('active'));

        item.classList.add('active');
        activeContent.classList.add('active');
        activeContent.style.maxHeight = activeContent.scrollHeight + 'px';
    }
}))

document.querySelector('[data-tab="tab-1"]').classList.add('active');
document.querySelector('#tab-1').classList.add('active');
document.querySelector('#tab-1').style.maxHeight = document.querySelector('#tab-1').scrollHeight + 'px';


// Слайдер

const slider = document.querySelector('.straps__slider--box');
const sliderLine = document.querySelector('.straps--sliderline');
const cards = document.querySelectorAll('.slide');

console.log (cards);
let count = 0;
let width ;

function init() {

    width = slider.offsetWidth;
    sliderLine.style.width = width * cards.length + 'px';
    cards.forEach(item => {
        item.style.width = width/cards.length +'px';
        item.style.height = 'auto';
    });
}

window.addEventListener('resize', init);
init();

function rollSlider(){
    sliderLine.style.transform = 'translate(-' + count * width +'px)';
}

document.querySelector(".slider__arrow--right").addEventListener('click', function(){
    count++
    if (count >= cards.length){
        count = 0;
    }
    rollSlider();
});
document.querySelector(".slider__arrow--left").addEventListener('click', function(){
    count--;
    if (count < 0){
        count = cards.length - 1;
    }
    rollSlider();
});

