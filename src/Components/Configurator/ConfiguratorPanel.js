import React, {useContext, useState} from 'react';
import {ConfiguratorContext} from "../../contexts/ConfiguratorContext";
import widthIcon from '../../assets/width_icon.png';
import HeightIcon from '@mui/icons-material/Height';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ExposureOutlinedIcon from '@mui/icons-material/ExposureOutlined';
import {IconButton} from "@mui/material";
import {AdjustWidth} from "./AdjustWidth";
import {AdjustHeight} from "./AdjustHeight";
import {AdjustDepth} from "./AdjustDepth";
import {AddRemoveSections} from "./AddRemoveSections";

export const ConfiguratorPanel = () => {
    const {setAddRemoveActive} = useContext(ConfiguratorContext);
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
        setAddRemoveActive(tabIndex === 3);
    };

    return (
        <div className='configurator-panel'>
            <div className="tab-container">
                <IconButton
                    className={`tab ${activeTab === 0 ? 'active' : ''}`}
                    onClick={() => handleTabClick(0)}
                >
                    <img alt='adjust width' src={widthIcon} style={{width: 24, height: 24}}/>
                </IconButton>
                <IconButton
                    className={`tab ${activeTab === 1 ? 'active' : ''}`}
                    onClick={() => handleTabClick(1)}
                >
                    <HeightIcon/>
                </IconButton>
                <IconButton
                    className={`tab ${activeTab === 2 ? 'active' : ''}`}
                    onClick={() => handleTabClick(2)}
                >
                    <OpenInFullIcon/>
                </IconButton>
                <IconButton
                    className={`tab ${activeTab === 3 ? 'active' : ''}`}
                    onClick={() => handleTabClick(3)}
                >
                    <ExposureOutlinedIcon/>
                </IconButton>
            </div>
            <div className="tab-content">
                {activeTab === 0 && <AdjustWidth/>}
                {activeTab === 1 && <AdjustHeight/>}
                {activeTab === 2 && <AdjustDepth/>}
                {activeTab === 3 && <AddRemoveSections/>}
            </div>
        </div>
    );
}
