const form = document.querySelector('.callback-form');
const fields = document.querySelectorAll('.form-group__input');
const inputCheckbox = document.querySelector('.form-checkbox__input');
const inputFirstName = document.querySelector('#first-name');
const inputEmail = document.querySelector('#email');
const btnSendMessage = document.querySelector('.footer__send-message');

//Focus onclick
btnSendMessage.addEventListener('click', function() {
    inputFirstName.focus();
});

//Form Validation
function emailIsValid(email) {
    return /\S+@\S+\.\S+/.test(email)
}

function isFieldsPresence() {
    let error = true;
    for (let i = 0; i < fields.length; i++) {
        if (!fields[i].value) {
            fields[i].classList.add('form-group__input_error');
            fields[i].nextElementSibling.innerHTML = 'Cannot be blank!';
            error = false;
        }
    }
    return error;
}

function isEmailMatch() {
    let error = true;
    if (inputEmail.value !== '' && !emailIsValid(inputEmail.value)) {
        inputEmail.nextElementSibling.innerHTML = 'Email is incorrect!';
        error = false;
    }
    return error;
}

function isCheckbox() {
    let error = true;
    if(!inputCheckbox.checked) {
        inputCheckbox.nextElementSibling.classList.add('form-checkbox__label_error');
        error = false;
    }
    return error;
}

for (let i = 0; i < fields.length; i++) {
    fields[i].addEventListener('input', function (event) {
        fields[i].classList.remove('form-group__input_error');
        fields[i].nextElementSibling.innerHTML = '';
    });
}

inputCheckbox.addEventListener('input', function (event) {
    inputCheckbox.nextElementSibling.classList.remove('form-checkbox__label_error');
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    isFieldsPresence();
    
    isEmailMatch();

    isCheckbox();

    if(isFieldsPresence() && isEmailMatch() && isCheckbox()) {
        $.ajax({
            type: "POST",
            url: $(this).attr('action'),
            data: $(this).serialize(),
            dataType: 'json',
        }).done(function(data) {
            form.reset();
            let $message = $(form).find('.callback-form__message');
            $message.text('Thank you! Your message has been sent.');
        });
    }
});