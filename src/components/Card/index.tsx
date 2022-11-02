import { useEffect, useRef } from 'react';

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

const DURATION = 300;
const INERTIA = -2;

interface Props {}

const Card = ({}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { x, y } = el.getBoundingClientRect();
    let translateX = 0;
    let translateY = 0;
    let rotate = 0;

    const handleMouseMove = (e: MouseEvent) => {
      translateX = e.clientX - x - position.current.x;
      translateY = e.clientY - y - position.current.y;
      const xMulti = translateX * 0.01;
      const yMulti = translateY / 100;
      rotate = xMulti * yMulti;

      el.style.transition = 'none';
      el.style.transformOrigin = 'center center';
      el.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
    };

    const handleMouseDown = (e: MouseEvent) => {
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

      const cardBox = document.getElementById('card-box') as HTMLElement;
      const elRect = el.getBoundingClientRect();
      const cardBoxRect = cardBox.getBoundingClientRect();
      if (isLike) {
        console.log(cardBox.clientWidth);
        console.log(cardBoxRect.right);
        console.log(elRect);

        console.log(
          'test',
          cardBoxRect.right - elRect.left + position.current.x,
        );

        const spaceToRight =
          (cardBoxRect.right - elRect.left + position.current.x) * Math.sqrt(2);
        console.log('spaceToRight', spaceToRight);

        el.style.transition = `transform ${DURATION}ms ease-in-out`;
        // el.style.transform = `translateX(${spaceToRight}px`;
        el.style.transform = `translate(${spaceToRight}px, ${spaceToRight}px) rotate(${rotate}deg)`;
      } else if (isNope) {
        console.log(el.getBoundingClientRect());
      } else {
        // Reduce the speed of the card
        const translateXStepDown = translateX / (DURATION / 10);
        const translateYStepDown = translateY / (DURATION / 10);
        const rotateStepDown = rotate / (DURATION / 10);

        el.style.transition = `transform ${DURATION}ms ease-in-out`;
        el.style.transform = `translate(${translateXStepDown * INERTIA}px, ${
          translateYStepDown * INERTIA
        }px) rotate(${rotateStepDown * INERTIA}deg)`;

        setTimeout(() => {
          el.style.transition = `transform ${DURATION}ms ease-in-out`;
          el.style.transform = `translate(0px, 0px) rotate(0deg)`;
        }, DURATION);
      }

      translateX = 0;
      translateY = 0;
    };

    el.addEventListener('mousedown', handleMouseDown);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMoveUp);
    };
  }, []);

  return (
    <div
      ref={ref}
      className='flex select-none items-center justify-center w-full h-full bg-primary max-h-[667px] max-w-[375px] rounded-8'
    >
      Card
    </div>
  );
};

export default Card;
