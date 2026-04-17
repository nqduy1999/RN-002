String.prototype.isEmpty = function() {
  return this.trim().length === 0;
};

String.prototype.trimAll = function() {
  return this.trim().replace(/\s+/g, ' ');
};

export const emailValidation = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const minimumWordsValidation = (string, minimum) => {
  return string.trimAll().split(' ').length >= minimum;
};

export const idValidation = id => {
  return id > 0;
};

export const requiredValidation = value => {
  return !!value;
};

export const notEmptyStringValidation = value => {
  return !value.isEmpty();
};

export const lengthValidation = (value, min = 0, max) => {
  if (max) {
    return value.length >= min && value.length <= max;
  }
  return value.length >= min;
};

export const matchValidation = (value1, value2) => {
  return value1 == value2;
};
