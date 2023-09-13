import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import {
  newChat, selectChat,
} from '../../../state/slices/chatSlice';
import { resolveChatTitle } from '../../../utils/chat';
import '../../../App.css';
import './bodyRightHeader.css';

const NewChat: React.FC = () => {
  const dispatch = useAppDispatch();
  const chat = useAppSelector(selectChat);
  const status = useAppSelector((state) => state.chat.activeChat.status);
  const title = resolveChatTitle(chat);

  const handleSubmit = () => {
    chat.activeChat.messages.length !== 0 && dispatch(newChat());
  };

  return (
      <React.Fragment>
         <div className="root">
          <div className="text">
           <Typography variant="h5">
            { `${title.substring(0, 30)}...`}
            </Typography>
          </div>
          <div className="buttonNewChat">
            <Button disabled={status === "loading"} onClick={handleSubmit}>Nueva Búsqueda</Button>
          </div>
        </div>
        <div style={{ width: '100%' }}>
            <svg width="100%" height="20">
              <line x1="0" y1="10" x2="100%" y2="10" className="line" />
            </svg>
        </div>
      </React.Fragment>
  );
}

export default NewChat;
