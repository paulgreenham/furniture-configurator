import React, {createContext, /*useEffect,*/ useState} from 'react';
// import {auth} from "../Firebase";
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import {languages} from '../enums';
import {language} from "../content/language";
import {Modal} from "@mui/material";
// import {Utility} from '../Utility';

// const SESSION_MAX_TIME = 10 * 60 * 1000;
// const ONE_DAY = 1000 * 60 * 60 * 24;

export const routes = {
    CONFIGURATOR: 'configurator',
    ROOT: '/',
    NOT_FOUND: '404'
};

export const GeneralContext = createContext(null);

export const GeneralProvider = props => {
    // const [userDetails, setUserDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [contentLoading, setContentLoading] = useState(false);
    // const [loggedIn, setLoggedIn] = useState(false);
    const [appLang, setAppLang] = useState(languages.ENGLISH);
    const [sideMenuOpen, setSideMenuOpen] = useState(true);
    const content = language[appLang];


    // useEffect(() => {
    //     return auth.onAuthStateChanged((user) => {
    //         setAutoLogout(user);
    //
    //         setUserDetails(user || {});
    //         console.log(`User state changed. User: ${user?.email}`);
    //         setLoggedIn(!!user);
    //         setLoading(false);
    //     })
    // }, []);

    // function setAutoLogout(user) {
    //     let userSessionTimeout = null;
    //     if (!user && userSessionTimeout) {
    //         clearTimeout(userSessionTimeout);
    //         userSessionTimeout = null;
    //     } else {
    //         if (!!user) {
    //             user.getIdTokenResult().then((idTokenResult) => {
    //                 const authTime = idTokenResult.claims.auth_time * 1000;
    //                 const expirationInMilliseconds = SESSION_MAX_TIME - (Date.now() - authTime);
    //                 userSessionTimeout = setTimeout(() => auth.signOut(), expirationInMilliseconds);
    //             })
    //         }
    //     }
    // }

    // const signInWithEmailAndPassword = (username, password) => {
    //     return auth.signInWithEmailAndPassword(username, password).then().catch(err => alert(err.message));
    // };

    // const signOut = () => auth.signOut();

    const switchLanguage = language => {
        setAppLang(language);
    };

    const toggleSideMenu = () => setSideMenuOpen(!sideMenuOpen);

    //sample func call
    // const getSomething = async () => {
    //     const result = await Utility.httpCall('getSomething');
    //     //do stuff with the result
    // }

    const renderLoader = (openLoader) =>
        <Modal open={openLoader}>
            <div className="spinner">
                <ClimbingBoxLoader
                    loading
                    size={100}
                    color="#FF5733"
                />
            </div>
        </Modal>

    if (loading) {
        return renderLoader(loading);
    }

    return (
        <GeneralContext.Provider value={{
            // signInWithEmailAndPassword,
            // signOut,
            switchLanguage,
            toggleSideMenu,
            setContentLoading,
            // userDetails,
            // loggedIn,
            content,
            appLang,
            sideMenuOpen,
            contentLoading,
        }}>
            {contentLoading
                ? renderLoader(contentLoading)
                : null
            }
            {props.children}
        </GeneralContext.Provider>
    )
}
