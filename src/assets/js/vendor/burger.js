const burgerBtn = document.querySelector('.burger-btn');
const burger = document.querySelector('.burger');

burgerBtn.addEventListener('click', (e) => {
    burgerBtn.classList.toggle('burger-btn_active');
    burger.classList.toggle('burger_active');
    document.body.classList.toggle('body_no-scroll');
    e.stopPropagation()
})

window.addEventListener('click', (e) => {
    if (!e.target.classList.contains('burger') && !e.target.classList.contains('header__list')) {
        burgerBtn.classList.remove('burger-btn_active');
        burger.classList.remove('burger_active');
        document.body.classList.remove('body_no-scroll');
    }
})
