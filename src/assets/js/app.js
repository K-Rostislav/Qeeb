function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2)
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}
testWebP(function (support) {
    if (support == true) {
        document.querySelector('html').classList.add('webp');
    } else {
        document.querySelector('html').classList.add('no-webp');
    }
});
//=============================================================================================================================================
const burgerBtn = document.querySelector('.burger-btn');
const burger = document.querySelector('.burger');

burgerBtn.addEventListener('click', (e) => {
    burgerBtn.classList.toggle('burger-btn_active');
    burger.classList.toggle('burger_active');
    e.stopPropagation()
})

window.addEventListener('click', (e) => {
    if (!e.target.classList.contains('burger') && !e.target.classList.contains('header__list')) {
        burgerBtn.classList.remove('burger-btn_active');
        burger.classList.remove('burger_active');
    }
})
