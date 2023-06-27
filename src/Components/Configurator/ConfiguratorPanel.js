import React, {useContext, useState} from 'react';
import {ConfiguratorContext} from "../../contexts/ConfiguratorContext";
import HeightIcon from '@mui/icons-material/Height';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ExposureOutlinedIcon from '@mui/icons-material/ExposureOutlined';
import {IconButton, FormControl, FormControlLabel, RadioGroup, Radio} from "@mui/material";
import {AdjustWidth} from "./AdjustWidth";
import {AdjustHeight} from "./AdjustHeight";
import {AdjustDepth} from "./AdjustDepth";
import {AddRemoveSections} from "./AddRemoveSections";
import {GeneralContext} from "../../contexts/GeneralContext";
import {language} from "../../content/language";

export const ConfiguratorPanel = () => {
    const {appLang} = useContext(GeneralContext);
    const {setAddRemoveActive} = useContext(ConfiguratorContext);
    const [activeTab, setActiveTab] = useState(0);
    const content = language[appLang];

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
        setAddRemoveActive(tabIndex === 3);
    };

    return (
        <div className='configurator-panel'>
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

                <FormControl>
                    <RadioGroup
                        row
                        className="color-selection-container"
                    >
                        <FormControlLabel
                            value="#E3E0DB"
                            control={<Radio />}
                            label={content.RAW}
                            labelPlacement="bottom"
                        />
                        <FormControlLabel
                            value="#E3E0DB"
                            control={<Radio />}
                            label={content.DARK}
                            labelPlacement="bottom"
                        />
                        <FormControlLabel
                            value="#E3E0DB"
                            control={<Radio />}
                            label={content.LIGHT}
                            labelPlacement="bottom"
                        />
                        <FormControlLabel
                            value="#E3E0DB"
                            control={<Radio />}
                            label={content.BLUE}
                            labelPlacement="bottom"
                        />
                        <FormControlLabel
                            value="#E3E0DB"
                            control={<Radio />}
                            label={content.RED}
                            labelPlacement="bottom"
                        />
                    </RadioGroup>
                </FormControl>

            </div>
        </div>
    );
}
