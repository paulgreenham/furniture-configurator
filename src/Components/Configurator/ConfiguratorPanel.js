import React, {useContext, useState} from 'react';
import {ConfiguratorContext} from "../../contexts/ConfiguratorContext";
import HeightIcon from '@mui/icons-material/Height';
import ExposureOutlinedIcon from '@mui/icons-material/ExposureOutlined';
import {AdjustWidth} from "./AdjustWidth";
import {AdjustHeight} from "./AdjustHeight";
import {AdjustDepth} from "./AdjustDepth";
import {AddRemoveSections} from "./AddRemoveSections";
import ColorConfiguration from "./ColorConfiguration";
import {isMobile} from "react-device-detect";

export const ConfiguratorPanel = () => {
    const {setAddRemoveActive} = useContext(ConfiguratorContext);
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
        setAddRemoveActive(tabIndex === 3);
    };

    return (
        <div className={`configurator-panel${isMobile ? ' is-mobile' : ''}`}>
            <div className="tab-container">
                <div
                    className={`tab left${activeTab === 0 ? ' active' : ''}`}
                    onClick={() => handleTabClick(0)}
                >
                    <HeightIcon style={{transform: 'rotate(90deg)'}} fontSize='large'/>
                </div>
                <div
                    className={`tab${activeTab === 1 ? ' active' : ''}`}
                    onClick={() => handleTabClick(1)}
                >
                    <HeightIcon fontSize='large'/>
                </div>
                <div
                    className={`tab${activeTab === 2 ? ' active' : ''}`}
                    onClick={() => handleTabClick(2)}
                >
                    <HeightIcon style={{transform: 'rotate(-45deg)'}} fontSize='large'/>
                </div>
                <div
                    className={`tab right${activeTab === 3 ? ' active' : ''}`}
                    onClick={() => handleTabClick(3)}
                >
                    <ExposureOutlinedIcon fontSize='large'/>
                </div>
            </div>
            <div className="tab-content">
                {activeTab === 0 && <AdjustWidth/>}
                {activeTab === 1 && <AdjustHeight/>}
                {activeTab === 2 && <AdjustDepth/>}
                {activeTab === 3 && <AddRemoveSections/>}
                {isMobile
                    ? null
                    : <ColorConfiguration/>
                }
            </div>
        </div>
    );
}
