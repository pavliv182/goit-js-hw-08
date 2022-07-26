import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

const FORM_KEY = 'feedback-form-state';

function localStorageUpdateTime(evt) {
  const formData = JSON.parse(localStorage.getItem(FORM_KEY)) || {};

  formData[evt.target.name] = evt.target.value;
  // записываем данные, которые ввели в инпут в localstorage (если ввели что либо)
  localStorage.setItem(FORM_KEY, JSON.stringify(formData));
}

formEl.addEventListener('input', throttle(localStorageUpdateTime, 500));

formEl.addEventListener('submit', evt => {
  evt.preventDefault();
  localStorage.removeItem(FORM_KEY);
  formEl.reset();
});

// Эта функция заполняет поля формы данными из localstorage, после того, как мы перезагружаем страницу

function fillForm(form) {
  const elements = form.elements;

  const localStorageData = JSON.parse(localStorage.getItem(FORM_KEY));
  // Если нет данных в localstorage то прекращаем выполнение функции
  if (!localStorageData) {
    return;
  }
  // Если данные есть, то записываем данные в форму.
  const keys = Object.keys(localStorageData);
  keys.forEach(el => {
    elements[el].value = localStorageData[el];
    // console.log(localStorageData[el]);
  });
}

fillForm(formEl);

// formData[name] = value;
// - это
// form.email = input.value
// form.message = textarea.value
// formData = {
//   email: ukefhfdl(то, что мы вводим),
//   message: fiddfjil(то, что мы вводим),
// };
