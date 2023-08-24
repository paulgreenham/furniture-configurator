import React, {createContext, useEffect, useState} from 'react';

//raw values are in FEET (US imperial)
const edgeRadius = 0.03;
const boardThickness = (21 / 32) / 12;
const standardOverhang = 1.5 / 12;
const allowedWidth = {min: 1, max: 8 - (2 * standardOverhang)};
const allowedHeight = {min: 0.5, max: 8 - (2 * standardOverhang)};
const allowedDepth = {min: 6 / 12 + standardOverhang, max: 21 / 12 - standardOverhang};

const openingShelf = [
    {dimensions: [3, boardThickness, 1], position: {y: 2 - boardThickness / 2}, isVertical: false, isOuterBoard: true},
    {dimensions: [3, boardThickness, 1], position: {y: -2 + boardThickness / 2}, isVertical: false, isOuterBoard: true},
    {dimensions: [3, boardThickness, 1], position: {y: 0}, isVertical: false},
    {
        dimensions: [4, boardThickness, 1],
        position: {x: -1.5 + boardThickness / 2},
        isVertical: true,
        isOuterBoard: true
    },
    {dimensions: [4, boardThickness, 1], position: {x: 1.5 - boardThickness / 2}, isVertical: true, isOuterBoard: true},
];

export const ConfiguratorContext = createContext(null);

export const ConfiguratorProvider = props => {
    const [currentShelfArr, setCurrentShelfArr] = useState([]);
    const [currentWidth, setCurrentWidth] = useState(0);
    const [currentHeight, setCurrentHeight] = useState(0);
    const [currentDepth, setCurrentDepth] = useState(0);
    const [currentHorizontalGap, setCurrentHorizontalGap] = useState(3);
    const [currentVerticalGap, setCurrentVerticalGap] = useState(3);
    //add current width/height density (initially calculate from loaded shelf)
    const [addRemoveActive, setAddRemoveActive] = useState(false);
    const [selectedColor, setSelectedColor] = useState("");  //"raw";

    const floorY = - 1 * (currentHeight / 2 + standardOverhang);
    const rightX = (currentWidth / 2 + standardOverhang);

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
        const widthChange = newWidth - currentWidth;

        const updatedShelfArr = [];

        currentShelfArr.forEach(currentShelf => {
            const updatedShelf = {...currentShelf};
            if (!currentShelf.isVertical) {
                updatedShelf.dimensions[0] += widthChange;
            }
            updatedShelfArr.push(updatedShelf);
        });

        setCurrentWidth(newWidth);
        autoSetShelves(updatedShelfArr, newWidth, currentHeight, currentDepth, currentHorizontalGap, currentVerticalGap);
    }

    const adjustHeight = newHeight => {
        const heightChange = newHeight - currentHeight;

        const updatedShelfArr = [];

        currentShelfArr.forEach(currentShelf => {
            const updatedShelf = {...currentShelf};
            if (!!currentShelf.isVertical) {
                updatedShelf.dimensions[0] += heightChange;
            }
            updatedShelfArr.push(updatedShelf);
        });

        setCurrentHeight(newHeight);
        autoSetShelves(updatedShelfArr, currentWidth, newHeight, currentDepth, currentHorizontalGap, currentVerticalGap);
    }

    const adjustDepth = newDepth => {
        const depthChange = newDepth - currentDepth;

        const updatedShelfArr = [];

        currentShelfArr.forEach(currentShelf => {
            const updatedShelf = {...currentShelf};
                updatedShelf.dimensions[2] += depthChange;
            updatedShelfArr.push(updatedShelf);
        });

        setCurrentDepth(newDepth);
        autoSetShelves(updatedShelfArr, currentWidth, currentHeight, newDepth, currentHorizontalGap, currentVerticalGap);
    }

    const adjustHorizontalGap = newHorizontalGap => {
        setCurrentHorizontalGap(newHorizontalGap);
        autoSetShelves(currentShelfArr, currentWidth, currentHeight, currentDepth, newHorizontalGap, currentVerticalGap);
    }

    const adjustVerticalGap = newVerticalGap => {
        setCurrentVerticalGap(newVerticalGap);
        autoSetShelves(currentShelfArr, currentWidth, currentHeight, currentDepth, currentHorizontalGap, newVerticalGap);
    }

    const autoSetShelves = (shelfArr, width, height, depth, horizontalGap, verticalGap) => {
        const requiredVerticals = Math.ceil(width / horizontalGap) + 1;
        const requiredHorizontals = Math.ceil(height / verticalGap) + 1;
        const updatedVerticalArr = [];
        const updatedHorizontalArr = [];

        for (let i = 0; i < requiredVerticals; i++) {
            updatedVerticalArr.push({
                dimensions: [height, boardThickness, depth],
                position: {x: ((width / (requiredVerticals - 1) * i) - (boardThickness / 2)) - (width / 2)},
                isVertical: true
            });
        }

        for (let i = 0; i < requiredHorizontals; i++) {
            updatedHorizontalArr.push({
                dimensions: [width, boardThickness, depth],
                position: {y: ((height / (requiredHorizontals - 1) * i) - (boardThickness / 2)) - (height / 2)},
                isVertical: false
            });
        }

        setCurrentShelfArr([...updatedVerticalArr, ...updatedHorizontalArr])
    }

    return (
        <ConfiguratorContext.Provider value={{
            edgeRadius,
            standardOverhang,
            allowedWidth,
            allowedHeight,
            allowedDepth,
            currentShelfArr,
            currentWidth,
            currentHeight,
            currentDepth,
            currentHorizontalGap,
            currentVerticalGap,
            floorY,
            rightX,
            addRemoveActive,
            selectedColor,
            setSelectedColor,
            setAddRemoveActive,
            adjustWidth,
            adjustHeight,
            adjustDepth,
            adjustHorizontalGap,
            adjustVerticalGap,
        }}>
            {props.children}
        </ConfiguratorContext.Provider>
    )
}
