import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ProsList from "../ProsList";
import ConsList from "../ConsList";

const Container = styled(Box)({
  backgroundColor: 'rgba(255, 153, 0, 0.8)',
  borderRadius: '14px',
  maxWidth: '800px',
  minHeight: '500px',
  margin: '160px auto 0',
  padding: '10px',
});

const Wrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '40px',
  }
}));

const ProsConsList = () => (
  <Container>
    <Box display="flex" justifyContent="center">
      <Typography variant="h4" color="#fff">
        Should I eat at McDonald's ?
      </Typography>
    </Box>
    <Wrapper
      display="flex"
      justifyContent="space-between"
      padding={3}
    >
      <ProsList />
      <ConsList />
    </Wrapper>
  </Container>
);

export default ProsConsList;