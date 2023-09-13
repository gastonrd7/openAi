  import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import {
  selectedMenu,
  statusMenu,
} from '../state/slices/menuSlice';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import './header.css';
import '../App.css';


function Header() {
  const dispatch = useAppDispatch();
  const menu = useAppSelector(selectedMenu);

  const handleMenu = () => {
    dispatch(statusMenu());
  };

  return (
    <AppBar position="static">
      <Toolbar className="Toolbar">
        <div className={`button${!menu.open && 'Selected'}`}>
          <Button color="inherit" onClick={handleMenu}>
            <ViewSidebarIcon />
          </Button>
        </div>
        <div className='buttonSettings'>
          <Button color="inherit"><SettingsIcon></SettingsIcon></Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
