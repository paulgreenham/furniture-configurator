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

const raw = "";
const light = "#F7BE78";
const dark = "#7A5C39";
const darkBlue = "#00008B";
const red = "#FF1F1F";

export const ConfiguratorPanel = () => {
    const {appLang} = useContext(GeneralContext);
    const {setAddRemoveActive, selectedColor, setSelectedColor} = useContext(ConfiguratorContext);
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

                <FormControl className="color-selection-container">
                    <RadioGroup
                        row
                        className="color-selection"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                    >
                        <FormControlLabel
                            value={raw}
                            control={<Radio className="raw"/>}
                            label={content.RAW}
                            labelPlacement="bottom"
                        />
                        <FormControlLabel
                            value={dark}
                            control={<Radio className="dark"/>}
                            label={content.DARK}
                            labelPlacement="bottom"
                        />
                        <FormControlLabel
                            value={light}
                            control={<Radio className="light"/>}
                            label={content.LIGHT}
                            labelPlacement="bottom"
                        />
                        <FormControlLabel
                            value={darkBlue}
                            control={<Radio className="blue" />}
                            label={content.BLUE}
                            labelPlacement="bottom"
                        />
                        <FormControlLabel
                            value={red}
                            control={<Radio className="red" />}
                            label={content.RED}
                            labelPlacement="bottom"
                        />
                    </RadioGroup>
                </FormControl>

            </div>
        </div>
    );
}
