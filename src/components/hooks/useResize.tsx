import { RefObject, useCallback, useEffect, useState } from "react";

const useResize = (sliderRef: RefObject<HTMLElement>, minWidth = 100) => {
  const [elementBoundary, setElementBoundary] = useState({
    startX: 0,
    left: 0,
    width: 0,
  });
  const [width, setWidth] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback(
    (width: number, x: number) => {
      setWidth(Math.max(width + x, minWidth));
    },
    [minWidth, setWidth]
  );

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseDown = (event: MouseEvent) => {
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
    resizedWidth: width,
    onMouseDown,
  };
};

export default useResize;