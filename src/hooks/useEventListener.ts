import { useEffect, useRef } from 'react';

export const useEventListener = <
  T extends keyof WindowEventMap | string,
  CB extends (event: Event) => void,
>(
  eventName: T,
  handler: CB,
  element = window,
) => {
  const savedHandler = useRef<CB>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported || !savedHandler) return;

    const eventListener = (event: any) => savedHandler.current?.(event);

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};
