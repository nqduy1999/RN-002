import BuildVersion from '@resources/build_version/BuildVersion';
const setting = BuildVersion.setting;
Number.prototype.format = function (n, x, s, c) {
  var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = this.toFixed(Math.max(0, ~~n));

  return (c ? num.replace('.', c) : num).replace(
    new RegExp(re, 'g'),
    '$&' + (s || ','),
  );
};

export const formatCurrency = (number) => {
  if (setting.currencyUnit === 'FlexA') {
    number = number / 1000;
  }
  return `${number.format(0, 3, ',', '.')} ${setting.currencyUnit}`;
};

export const formatCurrencyNoLocale = number => {
  return `${number.format(0, 3, ',', '.')}`;
};

export const removeBorderWith = text => {
  return text
    .replace(new RegExp('border-width: initial;', 'g'), '')
    .replace(new RegExp('line-height', 'g'), '')
    .replace(new RegExp('font-family: arial, helvetica, sans-serif;', 'g'), '');
};
