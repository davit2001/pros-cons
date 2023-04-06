import { useCallback, useState } from "react";
import {ContentEditableEvent} from "react-contenteditable";
import Box from "@mui/material/Box";
import ThumbUp from "@mui/icons-material/ThumbUp";
import {styled} from "@mui/material/styles";
import Title from "../Title";
import {isObjectEmpty, removeLastProperty} from "../../object.utils";
import Input from "../Input";

type Pros = {
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

const ProsList = () => {
  const [prosList, setProsList] = useState<Pros>({
    1: {
      id: 1,
      content: '',
    }
  });

  const onChange = useCallback((event: ContentEditableEvent, id: number) => {
    const prosKeys = Object.keys(prosList);
    const isLast = prosKeys.length === id;

    if (!isLast && !event.target.value) {
      const filteredList = removeLastProperty(prosList);
      setProsList({
        ...filteredList,
        [id]: {
          ...prosList[id],
          content: event.target.value,
        },
      });

      return;
    }

    setProsList({
      ...prosList,
      [id]: {
        ...prosList[id],
        content: event.target.value,
      },
      ...(isLast ? {
        [id + 1]: {
          id: id + 1,
          content: '',
        },
      } : {}),
    })
  }, [prosList]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      maxWidth={200}
    >
      <TitleWrapper>
        <Title Icon={ThumbUp} type="pros">
          Pros
        </Title>
      </TitleWrapper>
      <ListWrapper
        display="flex"
        flexDirection="column"
        gap={1}
        padding={1}
      >
        {
          !isObjectEmpty(prosList) && Object.values(prosList).map(({ id, content }) =>(
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

export default ProsList;