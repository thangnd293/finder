import { FC, SVGProps, useEffect, useState } from 'react';
import styled from 'styled-components';

import { BOX_HEIGHT, BOX_WIDTH, CropImage } from '../CropImage.class';
import { useEventListener } from '../useEventListener';

import Modal from '@/components/Modal';

interface UploadModalProps {
  isVisible: boolean;
  cropImage?: CropImage;
  image?: File;
  onChange: (image: string) => void;
  closeModal: () => void;
}

export const UploadModal: FC<UploadModalProps> = ({
  isVisible,
  cropImage,
  image,
  onChange,
  closeModal,
}) => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [zoomDefault, setZoomDefault] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    if (!cropImage?.zoomDefault) return;
    setZoomDefault(cropImage?.zoomDefault);
  }, [cropImage]);

  useEventListener(cropImage?.id, 'zoom', event => {
    const { detail } = event;
    const zoom = detail.zoom;
    setZoom(zoom);
  });

  useEventListener(cropImage?.id, 'translate', event => {
    const { detail } = event;
    const translate = detail.translate;
    setTranslate(translate);
  });

  useEventListener(cropImage?.id, 'rotate', event => {
    const { detail } = event;
    const rotate = detail.rotate;
    setRotate(rotate);
  });

  useEventListener(cropImage?.id, 'zoomDefault', event => {
    const { detail } = event;
    const zoomDefault = detail.zoomDefault;
    setZoomDefault(zoomDefault);
  });

  useEventListener(cropImage?.id, 'result', event => {
    const { detail } = event;
    const result = detail.result;
    onChange(result);
    closeModal();
  });

  return (
    <Modal visible={isVisible} isOutside={false}>
      <div className='bg-white rounded-[8px] space-y-1.5 px-1 select-none'>
        <p className='text-center font-bold text-[20px]'>Chỉnh sửa ảnh</p>
        <div
          id='crop-image-complete'
          style={{ height: BOX_HEIGHT + 'px', width: BOX_WIDTH + 'px' }}
          className='relative overflow-hidden rounded-[8px] flex justify-center items-center cursor-pointer'
          onMouseDown={cropImage?.onMove}
        >
          {image && (
            <div
              className='absolute'
              style={{
                height: cropImage?.image?.height + 'px',
                width: cropImage?.image?.width + 'px',
                backgroundImage: `url(${cropImage?.image?.src})`,
                backgroundRepeat: 'no-repeat',
                transform: `scale(${zoom * zoomDefault}) translate(${
                  translate.x
                }px, ${translate.y}px) rotate(${rotate}deg)`,
              }}
            />
          )}
        </div>
        <div className='py-0.5 flex gap-1.5 items-center px-1'>
          <Slider
            min='1'
            max='5'
            step='0.1'
            defaultValue={1}
            type='range'
            onChange={cropImage?.onZoom}
            className='w-full block'
          />

          <button
            onClick={cropImage?.onRotate}
            className='block border border-solid border-[#33333357] rounded-[50%] p-0.8'
          >
            <ChangeIcon />
          </button>
        </div>
        <div className='flex justify-between font-bold text-[#333] items-center'>
          <button onClick={closeModal}>Hủy</button>
          <button
            onClick={cropImage?.saveImage}
            className='text-white bg-primary py-0.5 px-1 rounded-[20px]'
          >
            Chọn
          </button>
        </div>
      </div>
    </Modal>
  );
};

export const ChangeIcon: FC<SVGProps<SVGSVGElement>> = ({ ...rest }) => (
  <svg
    focusable='false'
    aria-hidden='true'
    role='presentation'
    viewBox='0 0 24 24'
    width='16px'
    height='16px'
    {...rest}
  >
    <path d='M7.34,6.41L0.86,12.9L7.35,19.38L13.84,12.9L7.34,6.41M3.69,12.9L7.35,9.24L11,12.9L7.34,16.56L3.69,12.9M19.36,6.64C17.61,4.88 15.3,4 13,4V0.76L8.76,5L13,9.24V6C14.79,6 16.58,6.68 17.95,8.05C20.68,10.78 20.68,15.22 17.95,17.95C16.58,19.32 14.79,20 13,20C12.03,20 11.06,19.79 10.16,19.39L8.67,20.88C10,21.62 11.5,22 13,22C15.3,22 17.61,21.12 19.36,19.36C22.88,15.85 22.88,10.15 19.36,6.64Z'></path>
  </svg>
);

export const Slider = styled.input`
  -webkit-appearance: none; /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 3px; /* Specified height */
  border-radius: 2px;
  background: #5b5b5b; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
  transition: opacity 0.2s;

  /* Mouse-over effects */
  &:hover {
    opacity: 0.8; /* Fully shown on mouse-over */
  }

  /* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 24px; /* Set a specific slider handle width */
    height: 24px; /* Slider handle height */
    background: white; /* Green background */
    border: 1px solid #333;
    border-radius: 50%;
    cursor: pointer; /* Cursor on hover */
  }
`;
