import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
// console.log(formEl);

const FORM_KEY = 'feedback-form-state';

const formData = {};

function formFill(form) {
  const elements = form.elements;
  //   console.dir(elements);

  const localStorageData = JSON.parse(localStorage.getItem(FORM_KEY));

  if (!localStorageData) {
    return;
  }

  const keys = Object.keys(localStorageData);
  keys.forEach(el => {
    elements[el].value = localStorageData[el];
    // console.log(el);
  });
}
// console.log(formEl.elements);
function localStorageUpdateTime(evt) {
  //   console.log(Date.now());

  const name = evt.target.name;

  const value = evt.target.value;

  formData[name] = value;

  localStorage.setItem(FORM_KEY, JSON.stringify(formData));
}
formEl.addEventListener('input', throttle(localStorageUpdateTime, 500));

formEl.addEventListener('submit', evt => {
  evt.preventDefault();
  console.log(JSON.parse(localStorage.getItem(FORM_KEY)));
  localStorage.removeItem(FORM_KEY);
  formEl.reset();
});

formFill(formEl);
