const form = document.querySelector('#form')
const inputBlock = document.querySelector('.input')
const input = document.getElementById('input')
const btnSubmit = document.getElementById('btnSubmit')

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    const regex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/

    if (regex.test(input.value)) {
        inputBlock.classList.remove('input_error')
        form.submit()
    } else {
        inputBlock.classList.add('input_error')
    }
})