import React, {useContext, useEffect} from 'react';
import {GeneralContext} from "../contexts/GeneralContext";
import {Utility, useForceUpdate} from "../Utility";
import "./style.scss"
import CssBaseline from '@mui/material/CssBaseline';
import {Paper} from "@mui/material";
import {language} from "../content/language";

export const routes = {
    ROOT: '/',
    NOT_FOUND: '/404'
};

export const Home = () => {
    const {appLang, setMainSelection} = useContext(GeneralContext);
    const content = language[appLang];
    const forceUpdate = useForceUpdate();

    const path = Utility.getPathArray();
    let currentLocation = path[path.length - 1];

    useEffect(() => {
        window.addEventListener('popstate', forceUpdate);
        return () => window.removeEventListener('popstate', forceUpdate);
    }, [forceUpdate])

    const renderMain = () => {
        switch ("/" + currentLocation) {
            case routes.ROOT:
                setMainSelection("");
                return <div>{content.WELCOME_TO_INCHI}</div>
            default:
                setMainSelection("");
                return <div>{content.NOT_FOUND}</div>
        }
    }

    return (
        <div className={`main-container`}>
            <CssBaseline/>
            <Paper className="selection-container">
                {renderMain()}
            </Paper>
        </div>
    )
}
