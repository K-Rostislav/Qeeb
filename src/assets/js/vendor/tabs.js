const switchBtns = document.querySelectorAll('.collections__swicth-item');
const collections = document.querySelectorAll('.collections__content');

for (let item of switchBtns) {
    item.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-tab');

        for (let elem of collections) {
            elem.classList.remove('collections__content_active');
        }
        document.getElementById(id).classList.add('collections__content_active')

        for (let elem of switchBtns) {
            elem.classList.remove('collections__swicth-item_active');
        }
        item.classList.add('collections__swicth-item_active');
    });
}