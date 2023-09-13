import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';


export interface MenuState {
  open: boolean;
};

const initialState: MenuState = {
  open: true,
};

export const menuSlice = createSlice({
  name: 'modem',
  initialState,
  reducers: {
    statusMenu: (state) => {
      state.open = !state.open;
    },
  },
});

export const { statusMenu } = menuSlice.actions;

export const selectedMenu = (state: RootState) => state.menu;


export default menuSlice.reducer;