import { useEffect, useRef } from 'react';

import { CropImageEvent } from './CropImage.class';

export const useEventListener = <
  T extends CropImageEvent,
  Name extends string = T extends `${infer Name}-${string}` ? Name : T,
  CB = (event: CustomEvent<{ [k in Name]: any }>) => void,
>(
  id: string | undefined,
  eventName: T,
  handler: CB,
  element = window,
) => {
  const savedHandler = useRef<any>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported || !savedHandler || !id) return;
    const eventListener = (event: any) => savedHandler.current?.(event);

    element.addEventListener(`${eventName}-${id}`, eventListener);

    return () => {
      element.removeEventListener(`${eventName}-${id}`, eventListener);
    };
  }, [eventName, element, id]);
};
