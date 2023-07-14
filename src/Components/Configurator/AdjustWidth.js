import React, {useContext, useState, useEffect} from 'react';
import {language} from '../../content/language';
import {GeneralContext} from "../../contexts/GeneralContext";
import {ConfiguratorContext} from "../../contexts/ConfiguratorContext";
import {Box, Stack, Slider, Typography, ToggleButtonGroup, ToggleButton} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {Utility} from "../../Utility";
import {isMobile} from "react-device-detect";

export const AdjustWidth = () => {
    const {appLang} = useContext(GeneralContext);
    const {
        currentWidth,
        adjustWidth,
        allowedWidth,
        currentHorizontalGap,
        adjustHorizontalGap,
    } = useContext(ConfiguratorContext);

    const [display, setDisplay] = useState("width");
    const [mobileIsRotated, setMobileIsRotated] = useState(window.screen.orientation.type.includes('landscape'));

    const currentWidthInInches = currentWidth * 12;
    const density = 7 - currentHorizontalGap * 2;
    const content = language[appLang];
    const useSelector = isMobile && !mobileIsRotated;

    useEffect(() => {
        window.addEventListener('orientationchange', setRotation, false);

        return () => window.removeEventListener('orientationchange', setRotation)
    });

    const setRotation = e => {
        setMobileIsRotated(!!e.target.screen.orientation.type.includes('landscape'));
    }

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
            {useSelector
                ? <ToggleButtonGroup
                    className='toggle-button-group'
                    value={display}
                    exclusive
                    orientation="vertical"
                    onChange={(e, newDisplay) => setDisplay(newDisplay)}
                    aria-label="show width or density"
                >
                    <ToggleButton value="width" aria-label="show width">
                        {content.WIDTH}
                    </ToggleButton>
                    <ToggleButton value="density" aria-label="show density">
                        {content.DENSITY}
                    </ToggleButton>
                </ToggleButtonGroup>
                : null
            }
            {(useSelector && display === "width") || !useSelector
                ? <Box className='slider-container'>
                    <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center">
                        <RemoveIcon onClick={() => handleManualWidthChange(false)}/>
                        <Slider
                            aria-labelledby="width-input-slider"
                            aria-label={content.WIDTH}
                            value={currentWidthInInches}
                            onChange={handleChangeWidth}
                            track={false}
                            min={allowedWidth.min * 12}
                            max={allowedWidth.max * 12}
                        />
                        <AddIcon onClick={() => handleManualWidthChange(true)}/>
                    </Stack>
                    <Typography align='center' id="width-input-slider" gutterBottom>
                        {content.WIDTH} {currentWidthInInches}"
                    </Typography>
                </Box>
                : null
            }
            {(useSelector && display === "density") || !useSelector
                ? <Box className='slider-container'>
                    <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center">
                        <RemoveIcon onClick={() => handleManualDensityChange(false)}/>
                        <Slider
                            aria-labelledby="horizontal-density-input-slider"
                            aria-label={content.DENSITY}
                            value={density}
                            onChange={handleChangeDensity}
                            track={false}
                            min={1}
                            max={6}
                        />
                        <AddIcon onClick={() => handleManualDensityChange(true)}/>
                    </Stack>
                    <Typography align='center' id="horizontal-density-input-slider" gutterBottom>
                        {content.DENSITY}: {currentHorizontalGap * 12}" {content.MAX_GAP}
                    </Typography>
                </Box>
                : null
            }
        </div>
    );
}