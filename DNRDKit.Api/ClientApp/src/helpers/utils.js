const email_regular_expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const getItemFromStore = (key, defaultValue, store = localStorage) =>
  JSON.parse(store.getItem(key)) || defaultValue;
export const setItemToStore = (key, payload, store = localStorage) => store.setItem(key, JSON.stringify(payload));

export const isIterableArray = array => Array.isArray(array) && !!array.length;

export const emailIsValid = email => email && email_regular_expression.test(email);

export const formatPrice = (x, currency) => {
  switch (currency) {
    case 'BRL':
      return x.toFixed(2).replace('.', ',');
    default:
      return x.toFixed(2);
  }
};