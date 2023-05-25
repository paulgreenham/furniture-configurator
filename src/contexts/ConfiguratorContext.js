import React, {createContext, useEffect, useState} from 'react';

//raw values are in FEET (US imperial)
const edgeRadius = 0.03;
const boardThickness = 0.04;
const allowedWidth = {min: 1, max: 9};
const allowedHeight = {min: 2, max: 8};
const allowedDepth = {min: 1, max: 3};

const openingShelf = [
    {dimensions: [3, boardThickness, 1], position: {y: 1.92}, isVertical: false, isOuterBoard: true},
    {dimensions: [3, boardThickness, 1], position: {y: -1.42}, isVertical: false},
    {dimensions: [3, boardThickness, 1], position: {y: 0.25}, isVertical: false},
    {dimensions: [4, boardThickness, 1], position: {x: -1.42}, isVertical: true, isOuterBoard: true},
    {dimensions: [4, boardThickness, 1], position: {x: 1.42}, isVertical: true, isOuterBoard: true},
];

export const ConfiguratorContext = createContext(null);

export const ConfiguratorProvider = props => {
    const [currentShelfArr, setCurrentShelfArr] = useState([]);
    const [currentWidth, setCurrentWidth] = useState(0);
    const [currentHeight, setCurrentHeight] = useState(0);
    const [currentDepth, setCurrentDepth] = useState(0);
    //add current width/height density (initially calculate from loaded shelf)
    const [addRemoveActive, setAddRemoveActive] = useState(false);

    useEffect(() => {
        loadShelfUnit(openingShelf);
    }, []);

    const loadShelfUnit = unitArr => {
        let maxWidth = 0;
        let maxHeight = 0;
        let maxDepth = 0;

        unitArr.forEach(shelf => {
            if (!shelf.isVertical) {
                const shelfWidth = shelf.dimensions[0];
                maxWidth = shelfWidth > maxWidth ? shelfWidth : maxWidth;
            } else {
                const shelfHeight = shelf.dimensions[0];
                maxHeight = shelfHeight > maxHeight ? shelfHeight : maxHeight;
            }
            const shelfDepth = shelf.dimensions[2];
            maxDepth = shelfDepth > maxDepth ? shelfDepth : maxDepth;
        });

        setCurrentWidth(maxWidth);
        setCurrentHeight(maxHeight);
        setCurrentDepth(maxDepth);
        setCurrentShelfArr(unitArr);
    }

    const adjustWidth = newWidth => {
        // const widthChange = newWidth - currentWidth;

        // const updatedShelfArr = [...currentShelfArr];
        //
        // currentShelfArr.forEach((currentShelf, index) => {
        //     const updatedShelf = {...currentShelf};
        //     if (!currentShelf.isVertical) {
        //         updatedShelf.dimensions[0] += widthChange;
        //     } else {
        //         const positionChange = (widthChange / 2) * (Math.sign(updatedShelf.position.x || 1));
        //         updatedShelf.position.x += positionChange;
        //     }
        //     updatedShelfArr.push(updatedShelf);
        // });
        // //go through with width density to calculate needed vertical shelves to add
        // console.log(updatedShelfArr);
        // // setCurrentShelfArr(updatedShelfArr);
        setCurrentWidth(newWidth);
    }

    return (
        <ConfiguratorContext.Provider value={{
            edgeRadius,
            allowedWidth,
            allowedHeight,
            allowedDepth,
            currentShelfArr,
            currentWidth,
            currentHeight,
            currentDepth,
            addRemoveActive,
            setAddRemoveActive,
            adjustWidth,
        }}>
            {props.children}
        </ConfiguratorContext.Provider>
    )
}
