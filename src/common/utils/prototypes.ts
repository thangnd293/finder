String.prototype.toCapitalize = function () {
  return this[0].toUpperCase() + this.slice(1);
};

String.prototype.isNumeric = function () {
  return !!this && !isNaN(Number(this)) && !isNaN(parseFloat(this as string));
};

export {};
