import { useEffect, useRef } from 'react';

enum Direction {
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
};

interface Props {}

const Card = ({}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timerId: NodeJS.Timer;
    let _timeId: NodeJS.Timer;

    const { x, y } = el.getBoundingClientRect();
    let translateX = 0;
    let translateY = 0;
    let rotate = 0;
    const handleMouseMove = (e: MouseEvent) => {
      translateX = e.clientX - x - position.current.x;
      translateY = e.clientY - y - position.current.y;
      rotate = -translateX / 20;

      el.style.transformOrigin = 'center center';
      el.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
    };

    const handleMouseDown = (e: MouseEvent) => {
      position.current = { x: e.offsetX, y: e.offsetY };
      window.addEventListener('mousemove', handleMouseMove);
    };

    const handleMoveUp = () => {
      let count = 30;
      const translateXDown = translateX / 30;
      const translateYDown = translateY / 30;
      const rotateDown = rotate / 30;
      const direction = detectDirectMove(translateX, translateY);

      timerId = setInterval(() => {
        count--;
        el.style.transform = `translate(${translateXDown * count}px, ${
          translateYDown * count
        }px) rotate(${rotateDown * count}deg)`;

        if (count === -3) {
          let rollBack = -30;
          _timeId = setInterval(() => {
            rollBack++;

            el.style.transform = `translate(${
              translateXDown * (rollBack / 10)
            }px, ${translateYDown * (rollBack / 10)}px) rotate(${
              rotateDown * (rollBack / 10)
            }deg)`;
            if (rollBack === 0) clearInterval(_timeId);
          }, 1);
          clearInterval(timerId);
        }
      }, 10);

      console.log(Math.abs(translateX) > el.clientWidth / 2);

      window.removeEventListener('mousemove', handleMouseMove);
    };

    el.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMoveUp);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMoveUp);
      clearInterval(timerId);
    };
  }, []);

  return (
    <div
      ref={ref}
      className='flex items-center justify-center w-full h-full bg-primary max-h-[667px] max-w-[375px] rounded-8'
    >
      Card
    </div>
  );
};

export default Card;
