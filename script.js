const username = document.querySelector('#username');
const pass = document.querySelector('#password');
const pass2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');
const popup = document.querySelector('.popup');
const inputs = document.querySelectorAll('input');

const showError = (input, msg) => {
  const formBox = input.parentElement;
  const errorMsg = formBox.querySelector('.error-text');

  formBox.classList.add('error');
  errorMsg.textContent = msg;
};

const clearError = (input) => {
  const formBox = input.parentElement;
  formBox.classList.remove('error');
};

const checkForm = (input) => {
  input.forEach((el) => {
    if (el.value === '') {
      showError(el, el.placeholder);
    } else {
      clearError(el);
    }
  });
};

const checkLength = (input, min) => {
  if (input.value.length < min) {
    showError(
      input,
      `${input.previousElementSibling.textContent.slice(
        0,
        -1
      )} must contain at least ${min} characters`
    );
  }
};

const checkPassword = (pass1, pass2) => {
  const strongPassword = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );
  if (pass1.value !== pass2.value) {
    showError(pass2, `Passwords do not match`);
  } else if (strongPassword.test(pass1.value)) {
    clearError(pass);
  } else {
    showError(pass, 'Password is not strong enough');
  }
};

const checkEmail = (email) => {
  const regEmail = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm;
  if (regEmail.test(email.value)) {
    clearError(email);
  } else {
    showError(email, 'E-mail is incorrect');
  }
};

const checkErrors = () => {
  const allInputs = document.querySelectorAll('.form-box');
  let errorCount = 0;

  allInputs.forEach((el) => {
    if (el.classList.contains('error')) {
      errorCount++;
    }
  });
  if (errorCount === 0) {
    popup.classList.add('show-popup');
  }
  console.log(popup.classList);
};

clearBtn.addEventListener('click', (e) => {
  e.preventDefault();

  inputs.forEach((el) => {
    el.value = '';
    clearError(el);
  });
});

sendBtn.addEventListener('click', (e) => {
  e.preventDefault();

  checkForm(inputs);
  checkLength(username, 3);
  checkPassword(pass, pass2);
  checkLength(pass, 8);
  checkEmail(email);
  checkErrors();
});
