import React from 'react';
import { ReactNode } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`w-full h-full max-h-[667px] max-w-[375px] shadow-lg rounded-8 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

export default Card;
