import React, {useContext} from 'react';
import {language} from '../../content/language';
import {GeneralContext} from "../../contexts/GeneralContext";
import {ConfiguratorContext} from "../../contexts/ConfiguratorContext";
import {Utility} from "../../Utility";
import {Box, Slider, Stack, Typography} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export const AdjustHeight = () => {
    const {appLang} = useContext(GeneralContext);
    const {
        currentHeight,
        adjustHeight,
        allowedHeight,
        currentVerticalGap,
        adjustVerticalGap,
        standardOverhang,
    } = useContext(ConfiguratorContext);
    const content = language[appLang];

    const currentHeightInInches = currentHeight * 12;
    const density= 7 - currentVerticalGap * 2;

    const handleChangeHeight = (e, newHeight) => {
        adjustHeight(newHeight / 12);
    }

    const handleManualHeightChange = isAdd => {
        adjustHeight(Utility.getNewDimensionIncrement(currentHeightInInches, isAdd, allowedHeight));
    }

    const handleChangeDensity = (e, newDensity) => {
        adjustVerticalGap((7 - newDensity) / 2);
    }

    const handleManualDensityChange = isAdd => {
        if (isAdd && currentVerticalGap === 0.5) return;
        if (!isAdd && currentVerticalGap === 3) return;
        adjustVerticalGap(currentVerticalGap + (isAdd ? -0.5 : 0.5));
    }

    return (
        <div className='configurator-panel-tab-content'>
            <Box sx={{ width: 200 }}>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <RemoveIcon onClick={() => handleManualHeightChange(false)}/>
                    <Slider
                        aria-labelledby="height-input-slider"
                        aria-label="Height"
                        value={currentHeightInInches}
                        onChange={handleChangeHeight}
                        track={false}
                        min={12}
                        max={12*(8 - (2 * standardOverhang))}
                    />
                    <AddIcon onClick={() => handleManualHeightChange(true)}/>
                </Stack>
                <Typography id="height-input-slider" gutterBottom>
                    {content.HEIGHT} {currentHeightInInches}"
                </Typography>
            </Box>
            <Box sx={{ width: 200 }}>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <RemoveIcon onClick={() => handleManualDensityChange(false)}/>
                    <Slider
                        aria-labelledby="vertical-density-input-slider"
                        aria-label="Density"
                        value={density}
                        onChange={handleChangeDensity}
                        track
                        min={1}
                        max={6}
                    />
                    <AddIcon onClick={() => handleManualDensityChange(true)}/>
                </Stack>
                <Typography id="vertical-density-input-slider" gutterBottom>
                    {content.DENSITY} {density}"
                </Typography>
            </Box>
        </div>
    );
}