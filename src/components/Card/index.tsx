import React from 'react';
import { ReactNode } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  onDone?: () => void;
  children: ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, Props>(
  ({ title, onDone, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`w-full h-full md:max-h-[667px] md:max-w-[375px] shadow-lg rounded-8 ${className}`}
        {...props}
      >
        {title && (
          <div className='shrink-0 relative rounded-t-8 w-full h-[48px] flex items-center justify-center text-18 font-semibold bg-white border-0 border-b border-solid border-gray-20'>
            <span>{title}</span>
            {onDone && (
              <button
                onClick={onDone}
                className='px-1.3 absolute right-0 text-16 text-primary-a11y'
              >
                Xong
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    );
  },
);

export default Card;
