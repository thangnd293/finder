import { useCallback, useEffect, useRef, useState } from 'react';

import {
  handleSwipeToLeftOut,
  handleSwipeToRightOut,
} from '../common/functions/translateElement';

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

type Status = 'idle' | 'like' | 'nope';
type Callback = () => void;

const useCardSwipe = <T extends HTMLElement = HTMLDivElement>(
  onLike: Callback,
  onNope: Callback,
) => {
  const [isDisable, setDisable] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [el, setRef] = useState<T | null>(null);
  const position = useRef<Point>({ x: 0, y: 0 });
  const velocity = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    if (!el || isDisable) return;
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

      if (translateX > el.clientWidth / 2) {
        setStatus('like');
      } else if (el.clientWidth / -2 > translateX) {
        setStatus('nope');
      } else {
        setStatus('idle');
      }

      if (Math.abs(translateX) < 10 && Math.abs(translateY) < 10) {
        setIsDrag(true);
      }
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
      setIsDrag(false);
    };

    const handleMoveUp = () => {
      // Just run once to prevent multiple event listeners
      window.removeEventListener('mouseup', handleMoveUp);
      window.removeEventListener('mousemove', handleMouseMove);
      const isLike = translateX > el.clientWidth / 2;
      const isNope = el.clientWidth / -2 > translateX;

      if (isLike) {
        swipeToRight();
        onLike();
        setDisable(true);
      } else if (isNope) {
        swipeToLeft();
        onNope();
        setDisable(true);
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
  }, [el, onLike, onNope, isDisable]);

  const swipeToRight = useCallback(() => {
    if (!el) return;
    setStatus('like');

    const parentEl = document.getElementById('card-box') as HTMLElement;
    handleSwipeToRightOut(el, parentEl, DURATION);
  }, [el]);

  const swipeToLeft = useCallback(() => {
    if (!el) return;
    setStatus('nope');

    const parentEl = document.getElementById('card-box') as HTMLElement;
    handleSwipeToLeftOut(el, parentEl, DURATION);
  }, [el]);

  const swipeBack = useCallback(() => {
    if (!el) return;
    setDisable(false);
    el.style.transition = `transform ${DURATION}ms ease-in-out`;
    el.style.transform = 'translate(0, 0) rotate(0)';
  }, [el]);

  return {
    ref: setRef,
    swipeToRight,
    swipeToLeft,
    swipeBack,
    setDisable,
    isDrag,
    status,
  };
};

export default useCardSwipe;
