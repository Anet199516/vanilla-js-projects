const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('password2');


//show error message
const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';

    const small = formControl.querySelector('small');
    small.innerText = message;
}


//show success message
const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

const validateEmail = (email) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (reg.test(email.value.trim())) {
        showSuccess(email);
    } else if(email.value == '') {
        showError(email, `${getFieldNAme(email)} is required`);
    } else {
        showError(email, `${getFieldNAme(email)} is not valid`);
    }
}

const getFieldNAme = (input) => {
    const result = input.id[0].toUpperCase() + input.id.slice(1);
    return result;
}

const checkRequired = (inputArray) => {
    inputArray.forEach(item => {
        if (item.value.trim() == '') {
            showError(item, `${getFieldNAme(item)} is required`);
        } else {
            showSuccess(item);
        }
    })
}

const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(input, `${getFieldNAme(input)} must be at least ${min}`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldNAme(input)} must be less than ${max}`)
    } else {
        showSuccess(input);
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    checkRequired([username, email, password, confirmPassword]);
    checkLength(username, 3, 9);
    checkLength(password, 8, 15);
    checkLength(confirmPassword, 8, 15);
    validateEmail(email);
})
