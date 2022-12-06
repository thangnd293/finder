import { ButtonHTMLAttributes } from 'react';

import { ButtonStyled } from './styles';

import LoadingIcon from '@/assets/svgs/LoadingIcon';

export type Variant = 'solid' | 'outline' | 'ghost' | 'link';
export type Size = 'small' | 'medium' | 'large';
export type Width = number | 'auto' | 'full';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label: string;
  variant?: Variant;
  size?: Size;
  width?: Width;
  onClick?: () => void;
  loading?: boolean;
}

const Button = ({
  icon,
  label,
  variant = 'solid',
  size = 'medium',
  width,
  disabled,
  loading,
  className,
  onClick,
  ...props
}: Props) => {
  const hasIcon = !!icon;

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
  };

  return (
    <ButtonStyled
      className={className}
      variant={variant}
      size={size}
      hasIcon={hasIcon}
      disabled={disabled || loading}
      width={typeof width === 'string' ? width : undefined}
      onClick={handleClick}
      style={{
        width: typeof width === 'number' ? `${width}px` : undefined,
      }}
      {...props}
    >
      {icon} <span>{label}</span> {loading && <LoadingIcon height='20px' />}
    </ButtonStyled>
  );
};

export default Button;
