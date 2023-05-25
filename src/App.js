import React, {useContext} from 'react';
import './App.scss';
// import {GeneralContext} from "./contexts/GeneralContext";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import {Home} from './Components/Home';

const App = (props) => {
    // const {loggedIn} = useContext(GeneralContext);

    const theme = createTheme({
        typography: {
            fontFamily: [
                'Open Sans', ' sans-serif'
            ].join(','),
        },
        palette: {
            primary: {
                main: "#1F1F1F"
            },
            secondary: {
                main: "#FFFFFF"
            },
            tertiary: {
                main: "#F3F3F3"
            },
            action: {
                main: "#F7BE78"
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
                    <Home history={props.history}/>
                </div>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
