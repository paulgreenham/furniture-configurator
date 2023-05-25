import React, {useContext} from 'react';
import {language} from '../../content/language';
import {GeneralContext} from "../../contexts/GeneralContext";
import {ConfiguratorContext} from "../../contexts/ConfiguratorContext";

export const AdjustHeight = () => {
    const {appLang} = useContext(GeneralContext);
    const {currentHeight} = useContext(ConfiguratorContext);
    const content = language[appLang];

    return (
        <div className='configurator-panel-tab-content'>
            {currentHeight}
        </div>
    );
}