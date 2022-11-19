import { TextareaHTMLAttributes } from 'react';

interface Props {}

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxRows?: number;
}
const Textarea = ({ maxRows, ...props }: Props) => {
  const onInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;

    const lineHeight = window.getComputedStyle(textarea).lineHeight;
    const oneLineHeight = +lineHeight.slice(0, -2) || 0;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    textarea.style.maxHeight = `${oneLineHeight * (maxRows || 1)}px`;
  };

  return <textarea {...props} onInput={onInput} />;
};

export default Textarea;
