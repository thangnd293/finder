const TIME_ANIMATION = 200;

const reset = (el: HTMLElement, wrapper: HTMLElement) => {
  wrapper.style.perspective = 'none';
  el.style.transform = 'rotateY(0deg)';
  el.style.transformStyle = 'none';
  el.style.transition = 'none';
};

export const flipLeft = () => {
  const cardInner = document.getElementById('card-inner');
  const cardBox = document.getElementById('card-wrapper');

  if (cardBox && cardInner) {
    cardInner.style.perspective = '1000px';
    cardBox.style.transform = 'rotateY(-10deg)';
    cardBox.style.transformStyle = 'preserve-3d';
    cardBox.style.transition = `transform ${TIME_ANIMATION}ms ease-in-out`;
    setTimeout(() => {
      reset(cardBox, cardInner);
    }, TIME_ANIMATION);
  }
};

export const flipRight = () => {
  const cardInner = document.getElementById('card-inner');
  const cardBox = document.getElementById('card-wrapper');

  if (cardBox && cardInner) {
    cardInner.style.perspective = '1000px';
    cardBox.style.transform = 'rotateY(10deg)';
    cardBox.style.transformStyle = 'preserve-3d';
    cardBox.style.transition = `transform ${TIME_ANIMATION}ms ease-in-out`;
    setTimeout(() => {
      reset(cardBox, cardInner);
    }, TIME_ANIMATION);
  }
};
