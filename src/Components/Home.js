import React, {useContext, useEffect} from 'react';
import {GeneralContext, routes} from "../contexts/GeneralContext";
import {useForceUpdate} from "../Utility";
import "./style.scss"
import {Button, Paper} from "@mui/material";
import {Configurator} from "./Configurator/Configurator";
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import {ConfiguratorProvider} from "../contexts/ConfiguratorContext";
import {TopAppBar} from "./TopAppBar";
import {ConfiguratorPanel} from "./Configurator/ConfiguratorPanel";

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
                <Route path={routes.CONFIGURATOR} element={
                    <ConfiguratorProvider>
                        <Configurator/>
                        <ConfiguratorPanel/>
                    </ConfiguratorProvider>
                }/>
                <Route path={routes.NOT_FOUND} element={<div>{content.NOT_FOUND}</div>}/>
                <Route path={routes.ROOT} element={<div className='landing-page'>
                    {content.WELCOME_TO_INCHI}
                    <Link to={routes.CONFIGURATOR}>
                        <Button
                            className='standard-btn'
                            variant='contained'
                        >
                            {content.TRY_OUR_CONFIGURATOR}
                        </Button>
                    </Link>
                </div>}/>
            </Routes>
        </BrowserRouter>

    return (
        <div className={`main-container`}>
            <TopAppBar/>
            <Paper
                className="selection-container"
                elevation={0}
                square
            >
                {renderMain()}
            </Paper>
        </div>
    )
}
