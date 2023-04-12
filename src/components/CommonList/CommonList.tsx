import {FC, useCallback} from "react";
import {ContentEditableEvent} from "react-contenteditable";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import ThumbUp from "@mui/icons-material/ThumbUp";
import ThumbDown from "@mui/icons-material/ThumbDown";
import Title from "../Title";
import Input from "../Input";


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

export type ListItem = {
  id: number;
  content: string;
};

type CommonListProps = {
  title: string;
  type: 'pros' | 'cons';
  list: ListItem[];
  onChangeList: (list: ListItem[]) => void;
};

const CommonList: FC<CommonListProps> = ({ title, type, list, onChangeList }) => {
  const onChange = useCallback((event: ContentEditableEvent, id: number) => {
    const isLast = list[list.length - 1].id === id;

    if (!isLast && !event.target.value) {
      const filteredList = list.filter((item) => item.id !== id);
      onChangeList(filteredList);

      return;
    }

    const updatedList = list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          content: event.target.value,
        };
      }

      return item;
    });

    if (isLast) {
      updatedList.push({
        id: id + 1,
        content: '',
      });
    }

    onChangeList(updatedList);
  }, [list, onChangeList]);
  
  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      maxWidth={200}
    >
      <TitleWrapper>
        <Title Icon={type === 'pros' ? ThumbUp : ThumbDown} type={type}>
          {title}
        </Title>
      </TitleWrapper>
      <ListWrapper
        display="flex"
        flexDirection="column"
        gap={1}
        padding={1}
      >
        {
          list.map(({ id, content }, index) =>(
            <Input
              key={id}
              id={id}
              orderNumber={index + 1}
              content={content}
              onChange={onChange}
            />
          ))
        }
      </ListWrapper>
    </Box>
  );
};

export default CommonList;