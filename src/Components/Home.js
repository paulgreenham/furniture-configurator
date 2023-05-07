import React, {useContext, useEffect} from 'react';
import {GeneralContext, routes} from "../contexts/GeneralContext";
import {useForceUpdate} from "../Utility";
import "./style.scss"
import CssBaseline from '@mui/material/CssBaseline';
import {Paper} from "@mui/material";
import {Configurator} from "./Configurator/Configurator";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import logo from '../assets/logos/Logo_Inchi_white_background.jpg';

export const Home = (props) => {
    const {content} = useContext(GeneralContext);
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        window.addEventListener('popstate', forceUpdate);
        return () => window.removeEventListener('popstate', forceUpdate);
    }, [forceUpdate])

    const renderMain = () =>
        <BrowserRouter history={props.history}>
            <Routes>
                <Route path={routes.NOT_FOUND} element={<div>{content.NOT_FOUND}</div>}/>
                <Route path={routes.ROOT} element={<div className='landing-page'>
                    {/*<img src={logo} alt='INCHI logo' className='logo'/>*/}
                    {content.WELCOME_TO_INCHI}
                    <Configurator/>
                </div>}/>
            </Routes>
        </BrowserRouter>

    return (
        <div className={`main-container`}>
            <CssBaseline/>
            <Paper className="selection-container">
                {renderMain()}
            </Paper>
        </div>
    )
}
