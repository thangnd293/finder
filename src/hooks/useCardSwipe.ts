import { useCallback, useEffect, useRef, useState } from 'react';

enum Direction {
  Left = 'LEFT',
  Right = 'RIGHT',
  Top = 'TOP',
  Bottom = 'BOTTOM',
  TopLeft = 'TOP_LEFT',
  TopRight = 'TOP_RIGHT',
  BottomLeft = 'BOTTOM_LEFT',
  BottomRight = 'BOTTOM_RIGHT',
}

type Point = {
  x: number;
  y: number;
};

const detectDirectMove = (x: number, y: Number) => {
  if (x < 0 && y < 0) return Direction.TopLeft;
  if (x > 0 && y < 0) return Direction.TopRight;
  if (x < 0 && y > 0) return Direction.BottomLeft;
  if (x > 0 && y > 0) return Direction.BottomRight;
  if (x < 0) return Direction.Left;
  if (x > 0) return Direction.Right;
  if (y < 0) return Direction.Top;
  if (y > 0) return Direction.Bottom;
};

const DURATION = 500;
const INERTIA = -2;
type Callback = () => void;

const useCardSwipe = <T extends HTMLElement = HTMLDivElement>(
  onLike: Callback,
  onNope: Callback,
) => {
  const [el, setRef] = useState<T | null>(null);
  const position = useRef<Point>({ x: 0, y: 0 });
  const velocity = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    if (!el) return;

    let translateX = 0;
    let translateY = 0;
    let rotate = 0;

    const handleMouseMove = (e: MouseEvent) => {
      translateX = e.clientX - velocity.current.x - position.current.x;

      translateY = e.clientY - velocity.current.y - position.current.y;

      const xMulti = translateX * 0.01;
      const yMulti = translateY / 100;
      rotate = xMulti * yMulti;

      el.style.transition = 'none';
      el.style.transformOrigin = 'center center';
      el.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
    };

    const handleMouseDown = (e: MouseEvent) => {
      const { x, y } = el.getBoundingClientRect();
      velocity.current = { x: x, y: y };

      const bounds = el.getBoundingClientRect();
      const X = Math.round(e.clientX - bounds.left);
      const Y = Math.round(e.clientY - bounds.top);

      position.current = { x: X, y: Y };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMoveUp);
    };

    const handleMoveUp = (e: MouseEvent) => {
      // Just run once to prevent multiple event listeners
      window.removeEventListener('mouseup', handleMoveUp);
      window.removeEventListener('mousemove', handleMouseMove);

      const isLike = translateX > el.clientWidth / 2;
      const isNope = el.clientWidth / -2 > translateX;

      if (isLike) {
        swipeToRight();
        onLike();
      } else if (isNope) {
        swipeToLeft();
        onNope();
      } else {
        // Reduce the speed of the card
        const translateXStepDown = translateX / (DURATION / 10);
        const translateYStepDown = translateY / (DURATION / 10);
        const rotateStepDown = rotate / DURATION;

        el.style.transition = `transform ${DURATION}ms ease-in-out`;
        el.style.transform = `translate(${translateXStepDown * INERTIA}px, ${
          translateYStepDown * INERTIA
        }px) rotate(${rotateStepDown * INERTIA}deg)`;

        setTimeout(() => {
          el.style.transform = 'translate(0, 0) rotate(0)';
        }, DURATION);
      }
    };

    el.addEventListener('mousedown', handleMouseDown);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMoveUp);
    };
  }, [el, onLike, onNope]);

  const swipeToRight = useCallback(() => {
    if (!el) return;
    const parentEl = document.getElementById('card-box') as HTMLElement;

    const elRect = el.getBoundingClientRect();
    const parentRect = parentEl.getBoundingClientRect();
    const { m42: translateY } = new WebKitCSSMatrix(el.style.transform);
    const spaceToRight = (elRect.right - parentRect.left + translateY) * 2;

    el.style.transition = `transform ${DURATION}ms ease-in-out`;
    el.style.transform = `translate(${spaceToRight}px, ${
      translateY * 0.6
    }px) rotate(10deg)`;
  }, [el]);

  const swipeToLeft = useCallback(() => {
    if (!el) return;
    const parentEl = document.getElementById('card-box') as HTMLElement;

    const elRect = el.getBoundingClientRect();
    const { m41: translateX, m42: translateY } = new WebKitCSSMatrix(
      el.style.transform,
    );

    const parentRect = parentEl.getBoundingClientRect();
    const spaceToLeft =
      (translateX - (elRect.right - parentRect.left)) * Math.sqrt(2);

    el.style.transition = `transform ${DURATION}ms ease-in-out`;
    el.style.transform = `translate(${spaceToLeft}px, ${
      translateY * 0.6
    }px) rotate(-10deg)`;
  }, [el]);

  const swipeBack = useCallback(() => {
    if (!el) return;
    el.style.transition = `transform ${DURATION}ms ease-in-out`;
    el.style.transform = 'translate(0, 0) rotate(0)';
  }, [el]);

  return { ref: setRef, swipeToRight, swipeToLeft, swipeBack };
};

export default useCardSwipe;
