String.prototype.toCapitalize = function () {
  return this[0].toUpperCase() + this.slice(1);
};

String.prototype.isNumeric = function () {
  return !!this && !isNaN(Number(this)) && !isNaN(parseFloat(this as string));
};

Date.prototype.toTime = function () {
  let hours = this.getHours();
  const minutes = this.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if (hours === 0) {
    hours = ampm === 'AM' ? 0 : 12;
  }
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutesStr + ' ' + ampm;
  return strTime;
};

export {};
