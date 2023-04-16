import React, {useContext} from 'react';
import './App.scss';
// import {GeneralContext} from "./contexts/GeneralContext";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import {Home} from './Components/Home';

const App = () => {
    // const {loggedIn} = useContext(GeneralContext);

    const theme = createTheme({
        typography: {
            fontFamily: [
                'Open Sans', ' sans-serif'
            ].join(','),
        },
        palette: {
            primary: {
                main: "#152d48"
            },
            secondary: {
                main: "#4B92FE"
            },
            action: {
                main: "#2F80ED"
            },
            error: {
                main: "#FF1F1F"
            }
        },
    });

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <div className={`App`}>
                    <Home/>
                </div>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
