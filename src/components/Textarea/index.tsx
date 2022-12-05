import {
  KeyboardEvent,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
} from 'react';

interface Props {}

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxRows?: number;
  onEnter?: () => void;
}
const Textarea = ({ maxRows, onEnter, ...props }: Props) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
  }, [ref]);

  const onInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;

    const lineHeight = window.getComputedStyle(textarea).lineHeight;
    const oneLineHeight = +lineHeight.slice(0, -2) || 0;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    textarea.style.maxHeight = `${oneLineHeight * (maxRows || 1)}px`;
  };

  const onKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.which === 13 && !e.shiftKey) {
      e.preventDefault();

      onEnter?.();
    }
  };

  return (
    <textarea ref={ref} {...props} onInput={onInput} onKeyPress={onKeyPress} />
  );
};

export default Textarea;
