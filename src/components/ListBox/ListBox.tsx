import { ChangeEvent, FC } from "react";
import {styled} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

type ListBoxProps = {
  id: number;
  content: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => void;
  orderNumber: number;
};

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'green',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

const ListBox: FC<ListBoxProps> = ({
  id,
  content,
  onChange,
  orderNumber,
}) => (
  <Box display="flex" gap={1} alignItems="center">
    <Typography color="#fff">
      {orderNumber}
    </Typography>
    <StyledTextField
      value={content}
      onChange={(event) => onChange(event, id)}
    />
  </Box>
);

export default ListBox;