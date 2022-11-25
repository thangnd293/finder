import arrayMove from 'array-move';
import { useField, useFormikContext } from 'formik';
import { FC, useCallback, useEffect, useState } from 'react';
import SortableList, { SortableItem } from 'react-easy-sort';
import styled from 'styled-components';
import tw from 'twin.macro';
import { v4 as uuid } from 'uuid';

import UploadImage from '../UploadImage';

interface IData {
  id: string;
  src: string;
}
interface UploadImageGroupProps {
  name: string;
  length?: number;
  className?: string;
  itemClassName?: string;
  onChange?: (data: IData[]) => void;
}
export const UploadImageGroup: FC<UploadImageGroupProps> = ({
  name,
  length = 4,
  className,
  itemClassName,
  onChange,
}) => {
  const { setFieldValue } = useFormikContext();
  const [fields] = useField(name);
  const data = fields.value || [];

  const [items, setItems] = useState<IData[]>([
    ...data.map((value: string) => ({ id: uuid(), src: value })),
    ...Array.from({ length: length - data.length }).map(() => ({
      id: uuid(),
      src: '',
    })),
  ]);

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setItems((array: any) => arrayMove(array, oldIndex, newIndex));
  };

  useEffect(() => {
    onChange?.(items.filter(item => item.src));
  }, [items]);

  const setFormValue = useCallback(
    (items: IData[]) => {
      setFieldValue(
        name,
        items.filter(item => item.src).map(item => item.src),
      );
    },
    [name],
  );

  const handleSetImage = useCallback(
    (id?: number) => (imageSrc: string) => {
      const newItems = [...items];
      if (typeof id === 'undefined') {
        const idNotFound = newItems.findIndex(item => item.src === '');

        newItems[idNotFound] = { ...items[idNotFound], src: imageSrc };

        setItems(newItems);
        setFormValue(newItems);
        return;
      }

      if (items?.[id]) {
        newItems[id] = { ...items[id], src: imageSrc };

        setItems(newItems);
        setFormValue(newItems);
        return;
      }
    },
    [items],
  );

  return (
    <SortableListContainer
      onSortEnd={onSortEnd}
      className={`list ${className ? className : ''}`}
      draggedItemClassName='dragged'
    >
      {items.map((item, index) =>
        item.src ? (
          <SortableItem key={item.id}>
            <div tw='flex justify-center' key={item.id}>
              <UploadImage
                className={itemClassName}
                imageSrc={item.src}
                onChange={handleSetImage(index)}
                id={item.id}
              />
            </div>
          </SortableItem>
        ) : (
          <UploadImage
            className={itemClassName}
            imageSrc={item.src}
            onChange={handleSetImage()}
            id={item.id}
            key={item.id}
          />
        ),
      )}
    </SortableListContainer>
  );
};

const SortableListContainer = styled(SortableList)`
  ${tw`grid grid-cols-3 gap-1`}
`;
