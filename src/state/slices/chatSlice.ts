import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { createChat } from '../../api/chat';
// import { getUniqueObjectsByProperties, mapImodemItemToIModemItemToAddInJson } from '../../utils/chat';
import { IChatItem, IMessageItem } from '../../interfaces/chat';
import shortid from 'shortid';
import { formatCommentToApiAI } from '../../utils/chat';


export interface IChatState {
  activeChat: {
      id: string; 
      messages: IMessageItem[];
      status: 'idle' | 'ok' | 'loading' | 'failed';
  },
  history: {
    [historyChatId: string]: IChatItem };
};

const initialState: IChatState = {
  activeChat: {
    id: "-1",
    messages: [],
    status: 'idle'
  },
  history: {},
};

export const addChat = createAsyncThunk<IMessageItem, {search: string, historyChat: IMessageItem[]}>(
  'v1/chat/completions',
  async (parameters: {search: string, historyChat: IMessageItem[]}, thunkAPI) => {
    const data = await createChat(parameters.search, formatCommentToApiAI(parameters.historyChat));
    return data;
  }
);

export const modemSlice = createSlice({
  name: 'modem',
  initialState,
  reducers: {
    addQuestion: (state, action: PayloadAction<string>) => {
      if (state.activeChat.messages.length === 0) {
        state.activeChat.id = shortid.generate();

        state.history = {...state.history, 
        [state.activeChat.id]: {
          id: state.activeChat.id,
          dateTime: new Date(),
          title: action.payload,
          messages: state.activeChat.messages
      }}} else {
        state.history = {...state.history, 
        [state.activeChat.id]: {
          ...state.history[state.activeChat.id],
          dateTime: new Date(),
          messages: state.activeChat.messages
      }}};

      state.activeChat.messages = [...state.activeChat.messages, {role: 'user', content: action.payload, date: new Date()}];

    },
    newChat: (state) => { 
      state.activeChat.id = "-1";
      state.activeChat.messages = [];
      state.activeChat.status = "idle";
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      const { [action.payload]: _, ...newHistory } = state.history;
      state.history = newHistory;
      if (state.activeChat.id === action.payload) {
        state.activeChat.id = "-1";
        state.activeChat.messages = [];
        state.activeChat.status = "idle";
      }
    },
    selectItemHistoryChat: (state, action: PayloadAction<string>) => {
      state.activeChat.id = state.history[action.payload].id;
      state.activeChat.messages = state.history[action.payload].messages;
      state.activeChat.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addChat.pending, (state) => {
        state.activeChat.status = 'loading';
      })
      .addCase(addChat.fulfilled, (state, action) => {
        state.activeChat.status = 'ok';
        state.activeChat.messages = [...state.activeChat.messages, action.payload];
        state.history = {...state.history, 
          [state.activeChat.id]: {
            ...state.history[state.activeChat.id],
            dateTime: new Date(),
            messages: state.activeChat.messages
        }}
        })
      .addCase(addChat.rejected, (state) => {
        state.activeChat.status = 'failed';
      });
  },
});

export const { addQuestion, newChat, deleteChat, selectItemHistoryChat } = modemSlice.actions;

export const selectChat = (state: RootState) => state.chat;


export default modemSlice.reducer;