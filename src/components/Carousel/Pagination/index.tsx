import { Button, PaginationWrapper } from './styles';

interface Props {
  numberOfPages: number;
  currentPage: number;
  onChange: (page: number) => void;
}
const Pagination = ({ numberOfPages, currentPage, onChange }: Props) => {
  const handleChange = (page: number) => {
    onChange(page);
  };

  return (
    <PaginationWrapper>
      {Array.from({ length: numberOfPages }).map((_, index) => {
        return (
          <Button
            key={index}
            active={currentPage === index}
            onClick={() => {
              handleChange(index);
            }}
          />
        );
      })}
    </PaginationWrapper>
  );
};

export default Pagination;
