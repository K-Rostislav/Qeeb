new Swiper('.categories__slider', {
    breakpoints: {
        1700: {
            slidesPerView: 6,
        },
        1200: {
            slidesPerView: 5,
        },
        900: {
            slidesPerView: 4,
        },
        768: {
            slidesPerView: 3,
        },
        480: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1.3,
        }
    },

    spaceBetween: 30,

    pagination: {
        el: '.categories__pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.categories__button-next',
        prevEl: '.categories__button-prev',
    },
});

new Swiper('.tranding__slider', {
    breakpoints: {
        1200: {
            slidesPerView: 4,
        },
        950: {
            slidesPerView: 3,
        },
        580: {
            slidesPerView: 2,
        },
        0: {
            slidesPerView: 1,
        },
    },

    spaceBetween: 30,

    pagination: {
        el: '.tranding__pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.tranding__button-next',
        prevEl: '.tranding__button-prev',
    },
});