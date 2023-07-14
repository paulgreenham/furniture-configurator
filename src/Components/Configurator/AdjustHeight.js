import React, {useContext, useState, useEffect} from 'react';
import {language} from '../../content/language';
import {GeneralContext} from "../../contexts/GeneralContext";
import {ConfiguratorContext} from "../../contexts/ConfiguratorContext";
import {Utility} from "../../Utility";
import {Box, Slider, Stack, Typography, ToggleButtonGroup, ToggleButton} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {isMobile} from "react-device-detect";

export const AdjustHeight = () => {
    const {appLang} = useContext(GeneralContext);
    const {
        currentHeight,
        adjustHeight,
        allowedHeight,
        currentVerticalGap,
        adjustVerticalGap,
    } = useContext(ConfiguratorContext);

    const [display, setDisplay] = useState("height");
    const [mobileIsRotated, setMobileIsRotated] = useState(window.screen.orientation.type.includes('landscape'));

    const currentHeightInInches = currentHeight * 12;
    const density= 7 - currentVerticalGap * 2;
    const content = language[appLang];
    const useSelector = isMobile && !mobileIsRotated;

    useEffect(() => {
        window.addEventListener('orientationchange', setRotation, false);

        return () => window.removeEventListener('orientationchange', setRotation)
    });

    const setRotation = e => {
        setMobileIsRotated(!!e.target.screen.orientation.type.includes('landscape'));
    }

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
            {useSelector
                ? <ToggleButtonGroup
                    className='toggle-button-group'
                    value={display}
                    exclusive
                    orientation="vertical"
                    onChange={(e, newDisplay) => setDisplay(newDisplay)}
                    aria-label="show width or density"
                >
                    <ToggleButton value="height" aria-label="show height">
                        {content.HEIGHT}
                    </ToggleButton>
                    <ToggleButton value="density" aria-label="show density">
                        {content.DENSITY}
                    </ToggleButton>
                </ToggleButtonGroup>
                : null
            }
            {(useSelector && display === "height") || !useSelector
                ? <Box className='slider-container'>
                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <RemoveIcon onClick={() => handleManualHeightChange(false)}/>
                        <Slider
                            aria-labelledby="height-input-slider"
                            aria-label={content.HEIGHT}
                            value={currentHeightInInches}
                            onChange={handleChangeHeight}
                            track={false}
                            min={allowedHeight.min * 12}
                            max={allowedHeight.max * 12}
                        />
                        <AddIcon onClick={() => handleManualHeightChange(true)}/>
                    </Stack>
                    <Typography align='center' id="height-input-slider" gutterBottom>
                        {content.HEIGHT} {currentHeightInInches}"
                    </Typography>
                </Box>
                : null
            }
            {(useSelector && display === "density") || !useSelector
                ? <Box className='slider-container'>
                    <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                        <RemoveIcon onClick={() => handleManualDensityChange(false)}/>
                        <Slider
                            aria-labelledby="vertical-density-input-slider"
                            aria-label={content.DENSITY}
                            value={density}
                            onChange={handleChangeDensity}
                            track={false}
                            min={1}
                            max={6}
                        />
                        <AddIcon onClick={() => handleManualDensityChange(true)}/>
                    </Stack>
                    <Typography align='center' id="vertical-density-input-slider" gutterBottom>
                        {content.DENSITY}: {currentVerticalGap * 12}" {content.MAX_GAP}
                    </Typography>
                </Box>
                : null
            }
        </div>
    );
}