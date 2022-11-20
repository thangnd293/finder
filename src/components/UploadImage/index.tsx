import { ChangeEvent, FC, useEffect, useState } from 'react';

import { CropImage } from './CropImage.class';
import { UploadModal } from './Modal';
import { UploadCard } from './UploadCard';

interface Props {
  id: string;
  imageSrc: string;
  className?: string;
  onChange: (image: string) => void;
}

const UploadImage: FC<Props> = ({ id, imageSrc, className, onChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [image, setImage] = useState<HTMLImageElement>();
  const [cropImage, setCropImage] = useState<CropImage>();

  useEffect(() => {
    if (!image || !id) return;
    setCropImage(new CropImage(id, image));
  }, [image, id]);

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const imageFile = new Image();

    const file = files?.[0];

    if (!file) return;
    setIsVisible(true);

    imageFile.src = URL.createObjectURL(file);

    imageFile.onload = () => {
      setImage(imageFile);
    };
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <div key={id}>
      <UploadCard
        className={className}
        id={id}
        image={imageSrc}
        onChange={onChangeFile}
      />
      <UploadModal
        onChange={image => onChange(image)}
        cropImage={cropImage}
        image={image}
        isVisible={isVisible}
        closeModal={closeModal}
      />
    </div>
  );
};

export default UploadImage;
