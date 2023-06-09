import React, {useContext} from 'react';
import {language} from '../../content/language';
import {GeneralContext} from "../../contexts/GeneralContext";
import {ConfiguratorContext} from "../../contexts/ConfiguratorContext";
import {Utility} from "../../Utility";
import {Box, Slider, Stack, Typography} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export const AdjustDepth = () => {
    const {appLang} = useContext(GeneralContext);
    const {
        currentDepth,
        adjustDepth,
        allowedDepth,
        standardOverhang,
    } = useContext(ConfiguratorContext);
    const content = language[appLang];

    const currentDepthInInches = currentDepth * 12;

    const handleChangeDepth = (e, newDepth) => {
        adjustDepth(newDepth / 12);
    }

    const handleManualDepthChange = isAdd => {
        adjustDepth(Utility.getNewDimensionIncrement(currentDepthInInches, isAdd, allowedDepth));
    }

    return (
        <div className='configurator-panel-tab-content'>
            <Box sx={{ width: 200 }}>
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <RemoveIcon onClick={() => handleManualDepthChange(false)}/>
                    <Slider
                        aria-labelledby="height-input-slider"
                        aria-label="Height"
                        value={currentDepthInInches}
                        onChange={handleChangeDepth}
                        track={false}
                        min={allowedDepth.min * 12}
                        max={allowedDepth.max * 12}
                    />
                    <AddIcon onClick={() => handleManualDepthChange(true)}/>
                </Stack>
                <Typography id="height-input-slider" gutterBottom>
                    {content.DEPTH} {currentDepthInInches}"
                </Typography>
            </Box>
        </div>
    );
}