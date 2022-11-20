import arrayMove from 'array-move';
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
  length?: number;
  data: IData[];
  className?: string;
  itemClassName?: string;
  onChange: (data: IData[]) => void;
}
export const UploadImageGroup: FC<UploadImageGroupProps> = ({
  length = 4,
  data,
  className,
  itemClassName,
  onChange,
}) => {
  const [items, setItems] = useState<IData[]>([
    ...data,
    ...Array.from({ length: length - data.length }).map(() => ({
      id: uuid(),
      src: '',
    })),
  ]);

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setItems((array: any) => arrayMove(array, oldIndex, newIndex));
  };

  useEffect(() => {
    onChange(items.filter(item => item.src));
  }, [items]);

  const handleSetImage = useCallback(
    (imageSrc: string) => {
      let flag = false;

      setItems(
        items.map(item => {
          if (item.src === '' && !flag) {
            flag = true;
            return {
              ...item,
              src: imageSrc,
            };
          }

          return item;
        }),
      );
    },
    [items],
  );

  return (
    <SortableListContainer
      onSortEnd={onSortEnd}
      className={`list ${className ? className : ''}`}
      draggedItemClassName='dragged'
    >
      {items.map(item =>
        item.src ? (
          <SortableItem key={item.id}>
            <div tw='flex justify-center' key={item.id}>
              <UploadImage
                imageSrc={item.src}
                onChange={handleSetImage}
                id={item.id}
              />
            </div>
          </SortableItem>
        ) : (
          <UploadImage
            key={item.id}
            className={itemClassName}
            imageSrc={item.src}
            onChange={handleSetImage}
            id={item.id}
          />
        ),
      )}
    </SortableListContainer>
  );
};

const SortableListContainer = styled(SortableList)`
  ${tw`grid grid-cols-3 gap-1`}
`;
