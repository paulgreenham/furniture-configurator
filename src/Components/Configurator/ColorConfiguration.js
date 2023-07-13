import React, {useContext, useState} from 'react';
import {FormControl, FormControlLabel, RadioGroup, Radio} from "@mui/material";
import {GeneralContext} from "../../contexts/GeneralContext";
import {language} from "../../content/language";
import {ConfiguratorContext} from "../../contexts/ConfiguratorContext";
import CircleIcon from "@mui/icons-material/Circle";
import {isMobile} from "react-device-detect";

const raw = "";
const light = "#F7BE78";
const dark = "#7A5C39";
const darkBlue = "#00008B";
const red = "#8B0000";

export const ColorConfiguration = () => {
    const {appLang} = useContext(GeneralContext);
    const {selectedColor, setSelectedColor} = useContext(ConfiguratorContext);
    const content = language[appLang];

    return (
        <FormControl className={`color-selection-container${isMobile ? ' is-mobile' : ''}`}>
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
                    control={<Radio className="dark" icon={<CircleIcon/>}/>}
                    label={content.DARK}
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    value={light}
                    control={<Radio className="light" icon={<CircleIcon/>}/>}
                    label={content.LIGHT}
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    value={darkBlue}
                    control={<Radio className="blue" icon={<CircleIcon/>}/>}
                    label={content.BLUE}
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    value={red}
                    control={<Radio className="red" icon={<CircleIcon/>}/>}
                    label={content.RED}
                    labelPlacement="bottom"
                />
            </RadioGroup>
        </FormControl>
    );
}

export default ColorConfiguration;