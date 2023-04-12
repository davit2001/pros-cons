import { RefObject, useCallback, useEffect, useState } from "react";

const useDrag = (sliderRef: RefObject<HTMLElement>, trimBoxRef: RefObject<HTMLElement>) => {
  const [elementBoundary, setElementBoundary] = useState({
    startX: 0,
    left: 0,
    width: 0,
  });
  const [position, setPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const getMaximumPosition = useCallback(() => {
    if (!trimBoxRef.current || !sliderRef.current) return 0;

    const { width: sliderWidth } = sliderRef.current?.getBoundingClientRect();
    const { width: trimWidth } = trimBoxRef.current?.getBoundingClientRect();

    return trimWidth - sliderWidth;
  }, []);

  const updatePosition = useCallback(
    (width: number, x: number) => {
      const maximumPosition = getMaximumPosition();
      setPosition(Math.min(Math.max(0, x), maximumPosition));
    },
    [setPosition]
  );

  const onMouseUp = useCallback((event: MouseEvent) => {
    event.preventDefault();

    setIsDragging(false);
  }, [setIsDragging]);

  const onMouseDown = (event: any) => {
    event.preventDefault();

    const { clientX } = event;
    const { current: draggableElement } = sliderRef;

    if (!draggableElement) return;

    const {
      left,
      width,
    } = draggableElement.getBoundingClientRect();

    setIsDragging(true);
    setElementBoundary({
      startX: clientX,
      left,
      width,
    });
  };

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      const { current: draggableElement } = sliderRef;

      if (!isDragging || !draggableElement) return;

      event.preventDefault();

      const { clientX } = event;
      const position = {
        x: elementBoundary.startX - clientX,
      };
      const { left, width } = elementBoundary;

      updatePosition(width, left - position.x);
    },
    [isDragging, elementBoundary, updatePosition]
  );

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove]);

  return {
    position: position,
    onMouseDown,
  };
};

export default useDrag;