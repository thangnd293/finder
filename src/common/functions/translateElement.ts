const DURATION = 500;

export const handleSwipeToRightOut = (
  child: HTMLElement,
  parent: HTMLElement,
  duration: number = DURATION,
) => {
  const elRect = child.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  const { m42: translateY } = new WebKitCSSMatrix(child.style.transform);
  const spaceToRight = (elRect.right - parentRect.left + translateY) * 2;

  child.style.transition =
    duration > 0 ? `transform ${duration}ms ease-in-out` : 'none';
  child.style.transform = `translate(${spaceToRight}px, ${
    translateY * 0.6
  }px) rotate(10deg)`;
};

export const handleSwipeToLeftOut = (
  child: HTMLElement,
  parent: HTMLElement,
  duration: number = DURATION,
) => {
  const elRect = child.getBoundingClientRect();
  const { m41: translateX, m42: translateY } = new WebKitCSSMatrix(
    child.style.transform,
  );

  const parentRect = parent.getBoundingClientRect();
  const spaceToLeft =
    (translateX - (elRect.right - parentRect.left)) * Math.sqrt(2);

  child.style.transition =
    duration > 0 ? `transform ${duration}ms ease-in-out` : 'none';
  child.style.transform = `translate(${spaceToLeft}px, ${
    translateY * 0.6
  }px) rotate(-10deg)`;
};
