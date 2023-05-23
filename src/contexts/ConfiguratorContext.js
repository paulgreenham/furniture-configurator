import React, {createContext, /*useEffect,*/ useState} from 'react';

export const ConfiguratorContext = createContext(null);

export const ConfiguratorProvider = props => {


    return (
        <ConfiguratorContext.Provider value={{

        }}>
            {props.children}
        </ConfiguratorContext.Provider>
    )
}
