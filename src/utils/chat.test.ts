import { IMessageItem } from '../interfaces/chat';
import { IChatState } from '../state/slices/chatSlice';
import { formatCommentToApiAI, formatDateTime, mapIndexSignatureToArray, resolveChatTitle } from './chat';
import moment from 'moment';

//#region formatDateTime
describe('formatDateTime', () => {
  it('debería formatear la fecha correctamente para segundos', () => {
    const fecha = moment().subtract(30, 'seconds').toDate();
    const resultado = formatDateTime(fecha);
    expect(resultado).toBe('30 segundos atrás');
  });

  it('debería formatear la fecha correctamente para minutos', () => {
    const fecha = moment().subtract(45, 'minutes').toDate();
    const resultado = formatDateTime(fecha);
    expect(resultado).toBe('45 minutos atrás');
  });

  it('debería formatear la fecha correctamente para horas', () => {
    const fecha = moment().subtract(3, 'hours').toDate();
    const resultado = formatDateTime(fecha);
    expect(resultado).toBe('3 horas atrás');
  });

  it('debería formatear la fecha correctamente para días', () => {
    const fecha = moment().subtract(2, 'days').toDate();
    const resultado = formatDateTime(fecha);
    expect(resultado).toBe('2 días atrás');
  });
});
//#endregion

//#region formatCommentToApiAI
describe('formatCommentToApiAI', () => {
  it('debería eliminar la propiedad "date" de cada objeto del array', () => {
    const messages: IMessageItem[] = [
      { role: 'user', content: 'Mensaje 1', date: new Date('2023-01-01') },
      { role: 'bot', content: 'Mensaje 2', date: new Date('2023-01-02') },
      { role: 'user', content: 'Mensaje 3', date: new Date('2023-01-03') },
    ];

    const resultado = formatCommentToApiAI(messages);

    // Verifica que cada objeto en el resultado no tenga la propiedad "date"
    resultado.forEach((objeto) => {
      expect(objeto).not.toHaveProperty('date');
    });
  });

  it('debería mantener las demás propiedades intactas', () => {
    const messages: IMessageItem[] = [
      { role: 'user', content: 'Mensaje 1', date: new Date('2023-01-01') },
      { role: 'bot', content: 'Mensaje 2', date: new Date('2023-01-02') },
      { role: 'user', content: 'Mensaje 3', date: new Date('2023-01-03') },
    ];

    const resultado = formatCommentToApiAI(messages);

    // Verifica que las demás propiedades se mantengan intactas
    resultado.forEach((objeto, index) => {
      expect(objeto).toEqual({
        role: messages[index].role,
        content: messages[index].content,
      });
    });
  });

  it('debería devolver un array vacío si se le pasa un array vacío', () => {
    const messages: IMessageItem[] = [];

    const resultado = formatCommentToApiAI(messages);

    expect(resultado).toEqual([]);
  });
});
//#endregion

//#region mapIndexSignatureToArray
describe('mapIndexSignatureToArray', () => {
  it('debería mapear un objeto con índice de firma a un array de IChatItem', () => {
    const history = {
      chat1: {
        id: 'chat1',
        dateTime: new Date('2023-01-01'),
        title: 'Chat 1',
        messages: [
          { role: 'user', content: 'Mensaje 1', date: new Date('2023-01-01') },
          { role: 'bot', content: 'Mensaje 2', date: new Date('2023-01-02') },
        ],
      },
      chat2: {
        id: 'chat2',
        dateTime: new Date('2023-02-01'),
        title: 'Chat 2',
        messages: [
          { role: 'user', content: 'Mensaje 3', date: new Date('2023-02-01') },
        ],
      },
    };

    const resultado = mapIndexSignatureToArray(history);

    // Verificamos que el resultado sea un array de IChatItem
    expect(Array.isArray(resultado)).toBe(true);
    resultado.forEach((chatItem) => {
      expect(chatItem).toHaveProperty('id');
      expect(chatItem).toHaveProperty('dateTime');
      expect(chatItem).toHaveProperty('title');
      expect(chatItem).toHaveProperty('messages');
    });

    // Verificamos que se mapeen correctamente los objetos
    expect(resultado.length).toBe(2);
    expect(resultado[0].id).toBe('chat1');
    expect(resultado[1].id).toBe('chat2');
  });

  it('debería devolver un array vacío si se le pasa un objeto vacío', () => {
    const history = {};

    const resultado = mapIndexSignatureToArray(history);

    expect(Array.isArray(resultado)).toBe(true);
    expect(resultado.length).toBe(0);
  });
});
//#endregion

//#region resolveChatTitle
describe('resolveChatTitle', () => {
  it('debería devolver "Sin chat activo" si el id del chat activo es "-1"', () => {
    const chatState: IChatState = {
      activeChat: {
        id: '-1',
        messages: [],
        status: 'idle',
      },
      history: {
        chat1: {
          id: 'chat1',
          dateTime: new Date('2023-01-01'),
          title: 'Chat 1',
          messages: [],
        },
      },
    };

    const resultado = resolveChatTitle(chatState);

    expect(resultado).toBe('Sin chat activo');
  });

  it('debería devolver el título del chat activo si el id no es "-1"', () => {
    const chatState: IChatState = {
      activeChat: {
        id: 'chat1',
        messages: [],
        status: 'idle',
      },
      history: {
        chat1: {
          id: 'chat1',
          dateTime: new Date('2023-01-01'),
          title: 'Chat 1',
          messages: [],
        },
      },
    };

    const resultado = resolveChatTitle(chatState);

    expect(resultado).toBe('Chat 1');
  });

  it('debería devolver "Sin chat activo" si no existe el chat activo en el historial', () => {
    const chatState: IChatState = {
      activeChat: {
        id: '-1', // Chat activo con un ID que no existe en el historial
        messages: [],
        status: 'idle',
      },
      history: {
        chat1: {
          id: 'chat1',
          dateTime: new Date('2023-01-01'),
          title: 'Chat 1',
          messages: [],
        },
      },
    };

    const resultado = resolveChatTitle(chatState);
    console.log(resultado)

    expect(resultado).toBe('Sin chat activo');
  });
});
//#endregion


