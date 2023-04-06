import {FC, ReactNode} from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import {SvgIconProps} from "@mui/material";
import Typography from "@mui/material/Typography";


type ContainerProps = {
  type: 'pros' | 'cons',
};

const Container = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'type',
})<ContainerProps>(({ type }) => ({
  backgroundColor: type === 'pros' ? '#4ce312' : '#ff0000',
  padding: '10px',
  borderRadius: '14px',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

type TitleProps = {
  Icon: FC<SvgIconProps>;
  type: 'pros' | 'cons',
  children: ReactNode;
}
const Title: FC<TitleProps> = ({
  Icon,
  type,
  children,
}) => {

  return (
    <Container type={type}>
      <Icon
        sx={{
          width: 36,
          height: 36,
        }}
      />
      <Typography variant="h6">
        {children}
      </Typography>
    </Container>
  );
};

export default Title;