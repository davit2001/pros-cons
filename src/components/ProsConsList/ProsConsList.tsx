import {useCallback, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import CommonList from "../CommonList";
import { ListItem } from "../CommonList/CommonList";

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

const ProsConsList = () => {
  const [prosList, setProsList] = useState<ListItem[]>([
    {
      id: 1,
      content: '',
    }
  ]);
  const onChangeProsList = useCallback((prosList: ListItem[]) => {
    setProsList(prosList)
  }, [setProsList]);

  const [consList, setConsList] = useState<ListItem[]>([
    {
      id: 1,
      content: '',
    }
  ]);
  const onChangeConsList = useCallback((consList: ListItem[]) => {
    setConsList(consList);
  }, [setConsList]);


  return (
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
        <CommonList title="Pros" type="pros" list={prosList} onChangeList={onChangeProsList} />
        <CommonList title="Cons" type="cons" list={consList} onChangeList={onChangeConsList} />
      </Wrapper>
    </Container>
  );
};

export default ProsConsList;