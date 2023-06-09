import React, {useContext} from 'react';
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
        currentHorizontalGap,
        adjustHorizontalGap,
        standardOverhang,
    } = useContext(ConfiguratorContext);
    const content = language[appLang];

    const currentWidthInInches = currentWidth * 12;
    const density= 7 - currentHorizontalGap * 2;

    const handleChangeWidth = (e, newWidth) => {
        adjustWidth(newWidth / 12);
    }

    const handleManualWidthChange = isAdd => {
        adjustWidth(Utility.getNewDimensionIncrement(currentWidthInInches, isAdd, allowedWidth));
    }

    const handleChangeDensity = (e, newDensity) => {
        adjustHorizontalGap((7 - newDensity) / 2);
    }

    const handleManualDensityChange = isAdd => {
        if (isAdd && currentHorizontalGap === 0.5) return;
        if (!isAdd && currentHorizontalGap === 3) return;
        adjustHorizontalGap(currentHorizontalGap + (isAdd ? -0.5 : 0.5));
    }

    return (
        <div className='configurator-panel-tab-content'>
            <Box sx={{ width: 200 }}>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <RemoveIcon onClick={() => handleManualWidthChange(false)}/>
                    <Slider
                        aria-labelledby="width-input-slider"
                        aria-label="Width"
                        value={currentWidthInInches}
                        onChange={handleChangeWidth}
                        track={false}
                        min={allowedWidth.min * 12}
                        max={allowedWidth.max * 12}
                    />
                    <AddIcon onClick={() => handleManualWidthChange(true)}/>
                </Stack>
                <Typography id="width-input-slider" gutterBottom>
                    {content.WIDTH} {currentWidthInInches}"
                </Typography>
            </Box>
            <Box sx={{ width: 200 }}>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <RemoveIcon onClick={() => handleManualDensityChange(false)}/>
                    <Slider
                        aria-labelledby="horizontal-density-input-slider"
                        aria-label="Density"
                        value={density}
                        onChange={handleChangeDensity}
                        track
                        min={1}
                        max={6}
                    />
                    <AddIcon onClick={() => handleManualDensityChange(true)}/>
                </Stack>
                <Typography id="horizontal-density-input-slider" gutterBottom>
                    {content.DENSITY} {density}"
                </Typography>
            </Box>
        </div>
    );
}