import { useEffect, useRef } from 'react';
import { CSSProperties } from 'styled-components';

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

interface Props {
  imgUrl: string;
  onLike?: () => void;
  onNope?: () => void;
  className?: string;
  style?: CSSProperties;
}

const Card = ({ imgUrl, className, style, onLike, onNope }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const position = useRef<Point>({ x: 0, y: 0 });
  const velocity = useRef<Point>({ x: 0, y: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let translateX = 0;
    let translateY = 0;
    let rotate = 0;

    const handleMouseMove = (e: MouseEvent) => {
      translateX = e.clientX - velocity.current.x - position.current.x;
      translateY = e.clientY - velocity.current.y - position.current.y;
      console.log(position.current.x, position.current.y);

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
      position.current = { x: e.offsetX, y: e.offsetY };

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
        handleClickLike();
      } else if (isNope) {
        handleClickNope();
      } else {
        // Reduce the speed of the card
        const translateXStepDown = translateX / (DURATION / 10);
        const translateYStepDown = translateY / (DURATION / 10);
        const rotateStepDown = rotate / DURATION;

        el.style.transition = `transform ${DURATION}ms ease-in-out`;
        el.style.transform = `translate(${translateXStepDown * INERTIA}px, ${
          translateYStepDown * INERTIA
        }px) rotate(${rotateStepDown * INERTIA}deg)`;
      }

      position.current = { x: 0, y: 0 };
      translateX = 0;
      translateY = 0;
    };

    el.addEventListener('mousedown', handleMouseDown);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMoveUp);
    };
  }, []);

  const handleClickLike = () => {
    const el = ref.current;
    if (!el) return;
    const cardBox = document.getElementById('card-box') as HTMLElement;
    swipeToRight(el, cardBox);
    if (onLike) {
      setTimeout(() => {
        onLike();
      }, DURATION);
    }
  };

  const handleClickNope = (translateX: number = 0) => {
    const el = ref.current;
    if (!el) return;
    const cardBox = document.getElementById('card-box') as HTMLElement;
    swipeToLeft(el, cardBox);
    if (onNope) {
      setTimeout(() => {
        onNope();
      }, DURATION);
    }
  };

  return (
    <div className={`w-full h-full absolute`} style={style}>
      <div
        ref={ref}
        className='w-full h-full object-cover object-center rounded-8'
        style={{
          backgroundPosition: 'center',
          backgroundImage: `url(${imgUrl})`,
        }}
      >
        <div className='bg-black w-1/2 h-1/2'></div>
      </div>
      <div className='flex items-center justify-around absolute bottom-0 w-full h-6 bg-base'>
        <button
          className='w-6 h-6 rounded-full border border-solid border-blue-15 text-white'
          onClick={() => {
            handleClickNope();
            console.log('nope');
          }}
        >
          Nope
        </button>
        <button
          className='w-6 h-6 rounded-full border border-solid border-blue-15 text-white'
          onClick={() => {
            handleClickLike();
          }}
        >
          Like
        </button>
      </div>
    </div>
  );
};

export default Card;

const swipeToRight = (el: HTMLElement, parentEl: HTMLElement) => {
  const elRect = el.getBoundingClientRect();
  const parentRect = parentEl.getBoundingClientRect();
  const { m41: translateX, m42: translateY } = new WebKitCSSMatrix(
    el.style.transform,
  );
  const spaceToRight = (elRect.right - parentRect.left + translateY) * 2;

  el.style.transition = `transform ${DURATION}ms ease-in-out`;
  el.style.transform = `translate(${spaceToRight}px, ${
    translateY * 0.6
  }px) rotate(10deg)`;

  setTimeout(() => {
    el.style.transition = `none`;
    el.style.transform = `translate(0px, 0px) rotate(0deg)`;
  }, DURATION);
};

const swipeToLeft = (el: HTMLElement, parentEl: HTMLElement) => {
  const elRect = el.getBoundingClientRect();
  const { m41: translateX, m42: translateY } = new WebKitCSSMatrix(
    el.style.transform,
  );

  const parentRect = parentEl.getBoundingClientRect();
  const spaceToLeft =
    (translateX - (elRect.right - parentRect.left)) * Math.sqrt(2);
  console.log(elRect.right, parentRect.left, translateX, spaceToLeft);

  el.style.transition = `transform ${DURATION}ms ease-in-out`;
  el.style.transform = `translate(${spaceToLeft}px, ${
    translateY * 0.6
  }px) rotate(-10deg)`;

  setTimeout(() => {
    el.style.transition = `none`;
    el.style.transform = `translate(0px, 0px) rotate(0deg)`;
  }, DURATION);
};
