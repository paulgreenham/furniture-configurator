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
    const density= 3 / currentHorizontalGap;

    const handleChangeWidth = (e, newWidth) => {
        adjustWidth(newWidth / 12);
    }

    const handleManualWidthChange = isAdd => {
        adjustWidth(Utility.getNewDimensionIncrement(currentWidthInInches, isAdd, allowedWidth));
    }

    const handleChangeDensity = (e, newDensity) => {
        adjustHorizontalGap(3 - (newDensity / 2));
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
                        aria-label="Volume"
                        value={currentWidthInInches}
                        onChange={handleChangeWidth}
                        track={false}
                        min={12}
                        max={12*(8 - (2 * standardOverhang))}
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
                        aria-label="Volume"
                        value={density}
                        onChange={handleChangeDensity}
                        track={true}
                        min={1}
                        max={6}
                    />
                    <AddIcon onClick={() => handleManualDensityChange(true)}/>
                </Stack>
                <Typography id="width-input-slider" gutterBottom>
                    {content.DENSITY} {density}"
                </Typography>
            </Box>
        </div>
    );
}