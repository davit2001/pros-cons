import {ChangeEvent, FC, memo} from "react";
import TextField from "@mui/material/TextField";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type InputProps = {
  id: number;
  content: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, id: number) => void;
};

const CustomInput = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#faba44',
    },
    '&:hover fieldset': {
      borderColor: 'green',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
})
const Input: FC<InputProps> = ({
  id,
  content,
  onChange,
}) => (
  <Box display="flex" gap={1}>
    <Typography color="#fff">
      {id}
    </Typography>
    <CustomInput
      key={id}
      value={content}
      onChange={(event) => onChange(event, id)}
      variant="outlined"
      size="small"
    />
  </Box>
);

export default memo(Input);