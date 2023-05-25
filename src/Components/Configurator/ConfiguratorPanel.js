import React, {useContext} from 'react';
import {language} from '../../content/language';
import {GeneralContext} from "../../contexts/GeneralContext";

export const ConfiguratorPanel = () => {
    const {
        appLang,
    } = useContext(GeneralContext);
    const content = language[appLang];

    return (
        <div className='configurator-panel'>
            Panel
        </div>
    );
}
