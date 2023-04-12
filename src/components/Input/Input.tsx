import { FC, memo, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ContentEditable, {ContentEditableEvent} from "react-contenteditable";

type InputProps = {
  id: number;
  content: string;
  onChange: (event: ContentEditableEvent, id: number) => void;
  orderNumber: number;
};

const Input: FC<InputProps> = ({
  id,
  content,
  onChange,
  orderNumber,
}) => {
  const [isFocused, setIsFocused] = useState(true);

  if (!isFocused) {
    return (
      <Box onClick={() => setIsFocused(true)} padding={1}>
        {content}
      </Box>
    )
  }

  return (
    <Box display="flex" gap={1}>
      <Typography color="#fff">
        {orderNumber}
      </Typography>
      <ContentEditable
        html={content}
        onChange={(event) => onChange(event, id)}
        style={{
          padding: '10px',
          maxWidth: '150px',
        }}
      />
    </Box>
  )
};

export default memo(Input);