import { useRef } from "react";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import {ChevronLeft, ChevronRight} from "@mui/icons-material";
import SliderButton from "../SliderButton/SliderButton";
import useDrag from "../hooks/useDrag";
import useResize from "../hooks/useResize";

const TrimBox = styled(Box)({
  width: '100%',
  height: '40px',
  backgroundColor: '#F6F7F8',
  borderRadius: '8px',
});

type StyledSliderProps = {
  width: string | number;
};

const StyledSlider = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'width',
})<StyledSliderProps>(({ width }) => ({
  width,
  display: 'flex',
  backgroundColor: '#086ad9',
  borderRadius: '8px',
}));

const Slider = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const trimBoxRef = useRef<HTMLDivElement | null>(null);
  const resizeButtonRef = useRef<HTMLButtonElement | null>(null);
  const { position, onMouseDown } = useDrag(sliderRef, trimBoxRef);
  const { resizedWidth, onMouseDown: resizableButtonMouseDown } = useResize(resizeButtonRef);

  return (
    <TrimBox ref={trimBoxRef}>
      <StyledSlider
        width={resizedWidth || '100%'}
        ref={sliderRef}
        onMouseDown={onMouseDown}
        sx={{
          position: 'absolute',
          left: `${position}px`,
        }}
      >
        <SliderButton
          ref={resizeButtonRef}
          Icon={ChevronLeft}
          onMouseDown={resizableButtonMouseDown}
        />
        <Box width="calc(100% - 80px)" />
        <SliderButton
          ref={resizeButtonRef}
          Icon={ChevronRight}
          onMouseDown={resizableButtonMouseDown}
        />
      </StyledSlider>
    </TrimBox>
  );
};

export default Slider;