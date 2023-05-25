import React, {useContext, useEffect} from 'react';
import {language} from '../../content/language';
import {GeneralContext} from "../../contexts/GeneralContext";
import {ConfiguratorContext} from "../../contexts/ConfiguratorContext";
import {Box, Stack, Slider, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {Utility} from "../../Utility";

export const AdjustWidth = () => {
    const {appLang} = useContext(GeneralContext);
    const {
        currentWidth,
        adjustWidth,
        allowedWidth,
    } = useContext(ConfiguratorContext);
    const content = language[appLang];

    const currentWidthInInches = currentWidth * 12;

    const handleChangeWidth = (e, newWidth) => {
        adjustWidth(newWidth / 12);
    }

    const handleManualChange = isAdd => {
        adjustWidth(Utility.getNewDimensionIncrement(currentWidthInInches, isAdd, allowedWidth));
    }

    return (
        <div className='configurator-panel-tab-content'>
            <Box sx={{ width: 200 }}>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <RemoveIcon onClick={() => handleManualChange(false)}/>
                    <Slider
                        aria-labelledby="width-input-slider"
                        aria-label="Volume"
                        value={currentWidthInInches}
                        onChange={handleChangeWidth}
                        track={false}
                        min={12}
                        max={12*9}
                    />
                    <AddIcon onClick={() => handleManualChange(true)}/>
                </Stack>
                <Typography id="width-input-slider" gutterBottom>
                    {content.WIDTH} {currentWidthInInches}"
                </Typography>
            </Box>
        </div>
    );
}