import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { IChatItem } from '../../../interfaces/chat';
import { useAppDispatch } from '../../../state/hooks';
import {
  deleteChat
} from '../../../state/slices/chatSlice';

interface ItemHistory {
  item: IChatItem;
}

const BodyLeftItemHistory: React.FC<ItemHistory>  = ({ item }) => {
  const [showIconDeleteValue, setShowIconDelete] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const handleDeleteChat = (chatId: string) => {
    dispatch(deleteChat(chatId));
    setShowIconDelete(true);
  };
  return (
    <React.Fragment>
      {
          showIconDeleteValue ? 
          <IconButton onClick={() => setShowIconDelete(!showIconDeleteValue)} edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
          :
          <React.Fragment>
            <IconButton edge="end" aria-label="delete">
              <CheckIcon onClick={() => handleDeleteChat(item.id)} />
            </IconButton>
            <IconButton onClick={() => setShowIconDelete(!showIconDeleteValue)} edge="end" aria-label="delete">
              <ClearIcon />
            </IconButton>
          </React.Fragment>
        }
    </React.Fragment>
                 
  );
}

export default BodyLeftItemHistory;
