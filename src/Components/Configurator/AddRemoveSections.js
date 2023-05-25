import React, {useContext} from 'react';
import {language} from '../../content/language';
import {GeneralContext} from "../../contexts/GeneralContext";
import {ConfiguratorContext} from "../../contexts/ConfiguratorContext";

export const AddRemoveSections = () => {
    const {appLang} = useContext(GeneralContext);
    const {currentShelfArr} = useContext(ConfiguratorContext);
    const content = language[appLang];

    return (
        <div className='configurator-panel-tab-content'>
            Add/Remove sections coming soon!
        </div>
    );
}