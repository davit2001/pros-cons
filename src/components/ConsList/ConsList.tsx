import { useCallback, useState } from "react";
import {ContentEditableEvent} from "react-contenteditable";
import Box from "@mui/material/Box";
import ThumbDown from "@mui/icons-material/ThumbDown";
import {styled} from "@mui/material/styles";
import Title from "../Title";
import {isObjectEmpty, removeLastProperty} from "../../object.utils";
import Input from "../Input";

type Cons = {
  [key: string]: {
    id: number;
    content: string;
  }
};

const TitleWrapper = styled(Box)({
  marginBottom: '8px',
});

const ListWrapper = styled(Box)({
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#E1E5EC',
    borderRadius: '16px',
  },
  maxHeight: '300px',
  overflowY: 'auto',
});

const ConsList = () => {
  const [consList, setConsList] = useState<Cons>({
    1: {
      id: 1,
      content: '',
    }
  });

  const onChange = useCallback((event: ContentEditableEvent, id: number) => {
    const prosKeys = Object.keys(consList);
    const isLast = prosKeys.length === id;

    if (!isLast && !event.target.value) {
      const filteredList = removeLastProperty(consList);
      setConsList({
        ...filteredList,
        [id]: {
          ...consList[id],
          content: event.target.value,
        },
      });

      return;
    }

    setConsList({
      ...consList,
      [id]: {
        ...consList[id],
        content: event.target.value,
      },
      ...(isLast ? {
        [id + 1]: {
          id: id + 1,
          content: '',
        },
      } : {}),
    })
  }, [consList, setConsList]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      maxWidth={200}
    >
      <TitleWrapper>
        <Title Icon={ThumbDown} type="cons">
          Cons
        </Title>
      </TitleWrapper>
      <ListWrapper
        display="flex"
        flexDirection="column"
        gap={1}
        padding={1}
      >
        {
          !isObjectEmpty(consList) && Object.values(consList).map(({ id, content }) =>(
            <Input
              key={id}
              id={id}
              content={content}
              onChange={onChange}
            />
          ))
        }
      </ListWrapper>
    </Box>
  );
};

export default ConsList;