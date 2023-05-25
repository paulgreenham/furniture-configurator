import React, {createContext, useEffect, useState} from 'react';

const edgeRadius = 0.03;
const openingShelf = [
    {dimensions: [5, 0.04, 1], position: {}, isVertical: false},
    {dimensions: [5, 0.04, 1], position: {y: 1.92}, isVertical: false},
    {dimensions: [4, 0.04, 1], position: {x: -2.42}, isVertical: true},
    {dimensions: [4, 0.04, 1], position: {x: 2.42}, isVertical: true},
];

export const ConfiguratorContext = createContext(null);

export const ConfiguratorProvider = props => {
    const [currentShelfArr, setCurrentShelfArr] = useState([]);

    useEffect(() => setCurrentShelfArr(openingShelf), []);

    return (
        <ConfiguratorContext.Provider value={{
            edgeRadius,
            currentShelfArr,
        }}>
            {props.children}
        </ConfiguratorContext.Provider>
    )
}
