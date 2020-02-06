const form = document.querySelector('.callback-form');
const inputFirstName = document.querySelector('.js-first-name');
const inputEmail = document.querySelector('.js-email');
const fields = document.querySelectorAll('.form-group__input');
const btnSendMessage = document.querySelector('.footer__send-message');

btnSendMessage.addEventListener('click', function() {
    inputFirstName.focus();
});

function emailIsValid(email) {
    return /\S+@\S+\.\S+/.test(email)
}

for (let i = 0; i < fields.length; i++) {
    fields[i].addEventListener('input', function (event) {
        fields[i].classList.remove('form-group__input_error');
        fields[i].nextElementSibling.innerHTML = '';
    });
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    for (let i = 0; i < fields.length; i++) {
        if (!fields[i].value) {
            fields[i].classList.add('form-group__input_error');
            fields[i].nextElementSibling.innerHTML = 'Cannot be blank!';
        }
    }
    if (inputEmail.value !== '' && !emailIsValid(inputEmail.value)) {
        inputEmail.nextElementSibling.innerHTML = 'Email is incorrect!';
    }
});
