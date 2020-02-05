const btnSendMessage = document.querySelector('.footer__send-message');
const inputFirstName = document.querySelector('#first-name');

btnSendMessage.addEventListener('click', function() {
    inputFirstName.focus();
});