import moment from 'moment';
import { IChatItem, IMessageItem } from '../interfaces/chat';
import { IChatState } from '../state/slices/chatSlice';

export const formatDateTime = (fecha: Date): string => {
  const ahora = moment();
  const fechaMoment = moment(fecha);

  const diferencia = ahora.diff(fechaMoment, 'seconds');

  if (diferencia < 60) {
    return `${diferencia} segundos atrás`;
  } else if (diferencia < 3600) {
    return `${Math.floor(diferencia / 60)} minutos atrás`;
  } else if (diferencia < 86400) {
    return `${Math.floor(diferencia / 3600)} horas atrás`;
  } else {
    return `${Math.floor(diferencia / 86400)} días atrás`;
  }
}

export const formatCommentToApiAI = (messages: IMessageItem[]) => {
  return messages.map(({ date, ...restoDelObjeto }) => restoDelObjeto);
}

export const mapIndexSignatureToArray = (history: { [historyChatId: string]: IChatItem }): IChatItem[] => {
  const chatIds = Object.keys(history);
  const chatsItems : IChatItem[] = [];
  for (const chatId of chatIds) {
    const chatItem = history[chatId];
    chatsItems.push(chatItem);
  }

  return chatsItems;
}

export const resolveChatTitle = (chat: IChatState) => {
  return chat.activeChat.id === "-1" ? "Sin chat activo" :
    chat.history[chat.activeChat.id].title;
}
