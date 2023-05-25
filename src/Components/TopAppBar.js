import React, {useContext} from 'react';
import {language} from '../content/language';
import {GeneralContext} from "../contexts/GeneralContext";

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import logo from '../assets/logos/Logo_Inchi_white_background.jpg';
import {Button, Tooltip} from "@mui/material";

export const TopAppBar = () => {
    const {appLang, /*signOut*/} = useContext(GeneralContext);
    const content = language[appLang];

    return (
        <div className='app-bar'>
            <AppBar position="static" color="secondary">
                <Toolbar variant="dense">
                    <img src={logo} alt='INCHI logo' className='logo'/>
                    <Button>{content.CUSTOMIZE}</Button>
                    <Button>{content.INSPIRE}</Button>
                    <Button>{content.ABOUT}</Button>
                    <Button
                        className='far-right'
                    >
                        {content.MY_ACCOUNT}
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
