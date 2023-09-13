import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ListItemText from '@mui/material/ListItemText';
import { IChatItem } from '../../../interfaces/chat';
import { formatDateTime, mapIndexSignatureToArray } from '../../../utils/chat';
import { useAppDispatch, useAppSelector } from '../../../state/hooks';
import {
  selectChat,
  selectItemHistoryChat
} from '../../../state/slices/chatSlice';
import BodyLeftItemHistory from './bodyLeftHistoryItem';
import '../../../App.css';
import './bodyLeft.css';

const BodyLeft: React.FC = () => {
  const historyChats = useAppSelector(selectChat);
  const dispatch = useAppDispatch();
  const chatsItems : IChatItem[] = mapIndexSignatureToArray(historyChats.history);

  const handleSelectChatHistory = (chatId: string) => {
    dispatch(selectItemHistoryChat(chatId));
  };

  return (
      <Container className="containerLeft" maxWidth="sm">
        <Container className="box">
          <Typography variant="h6">
            Sistema
          </Typography>
          <Typography>
          Para conseguir una respuesta adecuada a tus necesidades, escribe un prompt para el sistema.
          </Typography>
        </Container>
         <Container className="box">
          <Typography variant="h6">
          Historial de Búsqueda
          </Typography>
          <div style={{ width: '100%' }}>
            <svg width="100%" height="20">
              <line x1="0" y1="10" x2="100%" y2="10" className="line" />
            </svg>
          </div>
          <List>
            {
              chatsItems.map((item: IChatItem) => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <BodyLeftItemHistory key={item.id} item={item} />
                  }
                >
                  <IconButton onClick={() => handleSelectChatHistory(item.id)} edge="start">
                    <Avatar sx={{ backgroundColor: '#FDBA74' }}>
                      <SearchIcon />
                    </Avatar>
                  </IconButton>
                  <ListItemText
                    primary={`${item.title.substring(0, 30)}...`}
                    secondary={`hace ${formatDateTime(item.dateTime)}`}
                  />
                </ListItem>
              ))  
            }
                
          </List>
        </Container>
      </Container>
  );
}

export default BodyLeft;
