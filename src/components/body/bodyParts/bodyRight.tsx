import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SendIcon from '@mui/icons-material/Send';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import {
  addChat,
  selectChat,
  addQuestion
} from '../../../state/slices/chatSlice';
import { formatDateTime } from '../../../utils/chat';
import NewChat from './bodyRightHeader';
import { TextareaAutosize } from '@mui/material';
import '../../../App.css';
import './bodyRight.css';
import '../mainBody.css';


const BodyRight: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const chat = useAppSelector(selectChat);
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.value.length <= 1000 && setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(addQuestion(inputValue));
    dispatch(addChat({search: inputValue, historyChat: chat.activeChat.messages}));
    setInputValue('');
  };

  return (
      <Container className='containerRight' maxWidth="xl">
        <Container className="box">
         <NewChat />
        {chat.activeChat.messages.map((message, index) => (
          <div key={index}>
            <Container className="box">
              <div className="root">
                <Typography className={message.role === 'user' ? "titleChatPerson" : "titleOpenAi"}>
                  {`${message.role}`}
                </Typography>
                <Typography className="timeChatPerson">
                  {`: hace ${formatDateTime(message.date)}`}
                </Typography>
              </div>
              <div style={{ width: '100%' }}>
                <svg width="100%" height="20">
                  <line x1="0" y1="10" x2="100%" y2="10" className="line" />
                </svg>
              </div>
              <Typography>
                {message.content}
              </Typography>
            </Container>
          </div>
        ))}
        {
          chat.activeChat.status === "loading" && "Cargado"
        }
        <Paper
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
        >
          <TextareaAutosize
            value={inputValue}
            onChange={handleInputChange}
            minRows={1}
            maxRows={10}
            maxLength={1000}
            placeholder="Escribir duda"
            className='textArea'
          />
          <label>{1000 - inputValue.length}</label>
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" disabled={inputValue.length === 0} onClick={handleSubmit}>
            <SendIcon />
          </IconButton>
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
            <AutoFixHighIcon />
          </IconButton>
        </Paper>
        </Container>
      </Container>
  );
}

export default BodyRight;
