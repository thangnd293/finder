import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

interface Props {
  min: number;
  max: number;
  step: number;
  defaultValues: number[];
  className?: string;
  onChange?: (values: number[]) => void;
}

const Slider = ({
  min,
  max,
  step,
  defaultValues,
  className,
  onChange,
}: Props) => {
  const [values, setValues] = useState(defaultValues);
  const handleChangeValue = (values: number[]) => {
    setValues(values);
    onChange && onChange(values);
  };

  return (
    <Range
      step={step}
      min={min}
      max={max}
      values={values}
      onChange={handleChangeValue}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: '28px',
            display: 'flex',
            width: '100%',
          }}
          className={className}
        >
          <div
            ref={props.ref}
            style={{
              height: '2px',
              width: '100%',
              borderRadius: '4px',
              background: getTrackBackground({
                values,
                colors:
                  values.length === 1
                    ? ['#ff4458', '#7c8591']
                    : ['#7c8591', '#ff4458', '#7c8591'],
                min: min,
                max: max,
              }),
              alignSelf: 'center',
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          style={{
            ...props.style,
            outline: 'none',
          }}
          className='w-[28px] h-[28px] rounded-full bg-white border border-gray-40 hover:border-primary shadow-2xl active:bg-gray-10'
        />
      )}
    />
  );
};

export default Slider;
