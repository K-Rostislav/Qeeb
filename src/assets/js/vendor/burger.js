const burgerBtn = document.querySelector('.burger-btn'),
      burgerBg = document.querySelector('.burger-background'),
      burger = document.querySelector('.burger')
      close = document.querySelector('.close')
      body = document.body

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.add('burger-btn_active')
    burger.classList.add('burger_active')
    burgerBg.classList.add('burger-background_active')
    body.classList.add('body_no-scroll')
})
burgerBg.addEventListener('click', () => {
    burgerBtn.classList.remove('burger-btn_active')
    burger.classList.remove('burger_active')
    burgerBg.classList.remove('burger-background_active')
    body.classList.remove('body_no-scroll')
})
close.addEventListener('click', () => {
    burgerBtn.classList.remove('burger-btn_active')
    burger.classList.remove('burger_active')
    burgerBg.classList.remove('burger-background_active')
    body.classList.remove('body_no-scroll')
})
