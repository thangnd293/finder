import { useField, useFormikContext } from 'formik';
import React, { ChangeEvent, useEffect, useId, useRef, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface Props {
  label: string;
  name: string;
  startDay?: string;
  endDay?: string;
}

type ErrorOf = {
  name: string;
  hasError: boolean;
};

const DayInput = ({ name, label }: Props) => {
  const id = useId();
  const [hasError, setHasError] = useState({
    day: false,
    month: false,
    year: false,
  });
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const { setFieldValue, values } = useFormikContext<any>();
  const [field, meta, helpers] = useField(name);

  const value = values[name];

  const [day, setDay] = useState(() => {
    if (value) {
      return value.split('-')[2];
    }
  });

  const [month, setMonth] = useState(() => {
    if (value) {
      return value.split('-')[1];
    }
  });

  const [year, setYear] = useState(() => {
    if (value) {
      return value.split('-')[0];
    }
  });

  useEffect(() => {
    const isHasError = Object.values(hasError).some(item => item);

    if (!isHasError && day && month && year) {
      setFieldValue(name, `${year}-${month}-${day}`);
    } else {
      helpers.setError('Vui lòng nhập ngày hợp lệ.');
    }
  }, [day, month, year, hasError]);

  const onError = ({ name, hasError }: ErrorOf) => {
    setHasError(prev => ({
      ...prev,
      [name]: hasError,
    }));
  };

  return (
    <>
      <label className='block mb-1 text-16 font-semibold' htmlFor={id}>
        {label}
      </label>
      <div className='flex space-x-1'>
        <Input
          name={'day'}
          value={day}
          limit={2}
          placeholder='DD'
          onError={onError}
          onChangeValue={day => setDay(day)}
          onNext={() => {
            monthRef.current?.focus();
          }}
          onFocused={() => helpers.setTouched(true)}
        />
        <Input
          ref={monthRef}
          name={'month'}
          value={month}
          limit={2}
          placeholder='MM'
          onError={onError}
          onChangeValue={month => setMonth(month)}
          onNext={() => {
            yearRef.current?.focus();
          }}
          onFocused={() => helpers.setTouched(true)}
        />
        <Input
          ref={yearRef}
          name={'year'}
          value={year}
          limit={4}
          placeholder='YY'
          onError={onError}
          onChangeValue={year => setYear(year)}
          onFocused={() => helpers.setTouched(true)}
        />
      </div>
      {meta.touched &&
        (hasError.day || hasError.month || hasError.year || meta.error) && (
          <p className='my-0.4 text-text-error text-12'>{meta.error}</p>
        )}
    </>
  );
};

export default DayInput;

interface InputProps {
  id?: string;
  name: string;
  value: string;
  limit: number;
  placeholder?: string;
  onChangeValue?: (value: string) => void;
  onError?: (error: ErrorOf) => void;
  onNext?: () => void;
  onFocused?: () => void;
}

const InputStyled = styled.input<{ error?: boolean }>`
  ${tw`w-[96px] py-1.7 px-1.6 outline-none border-2 border-solid border-gray-20 focus:border-gray-60 caret-blue-60 rounded-8 bg-gray-10 leading-tight text-center`}
  ${({ error }) => error && tw`!border-primary`}
`;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      value,
      limit,
      placeholder,
      onChangeValue,
      onError,
      onNext,
      onFocused,
    },
    ref,
  ) => {
    const [hasFocus, setHasFocus] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
      onError?.({
        name,
        hasError,
      });
    }, [hasError]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (value.length <= limit) {
        onChangeValue?.(value);
        setHasError(value.length !== limit || !value.isNumeric());
      } else {
        onNext?.();
      }
    };

    return (
      <InputStyled
        ref={ref}
        id={id}
        error={hasError}
        type='text'
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={handleChange}
        onFocus={e => {
          setHasFocus(true);
          onFocused?.();
          if (hasError) {
            e.target.select();
          }
        }}
        onBlur={() => {
          setHasError(hasFocus && !value.isNumeric());
        }}
      />
    );
  },
);
