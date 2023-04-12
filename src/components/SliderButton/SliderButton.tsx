import React, {FC, forwardRef} from "react";
import IconButton from "@mui/material/IconButton";

type SliderButtonProps = {
  Icon: FC;
  onMouseDown: (event: any) => void;
}
const SliderButton = forwardRef<HTMLButtonElement, SliderButtonProps>(({ Icon, onMouseDown }, ref) => (
  <IconButton
    ref={ref}
    onMouseDown={onMouseDown}
    sx={{
      cursor: 'e-resize',
    }}
  >
    <Icon />
  </IconButton>
));

export default SliderButton;