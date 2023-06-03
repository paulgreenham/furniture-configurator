import React, {createContext, useEffect, useState} from 'react';

//raw values are in FEET (US imperial)
const edgeRadius = 0.03;
const boardThickness = (21 / 32) / 12;
const standardOverhang = 1.5 / 12;
const allowedWidth = {min: 1, max: 8 - (2 * standardOverhang)};
const allowedHeight = {min: 2, max: 8 - (2 * standardOverhang)};
const allowedDepth = {min: 1, max: 3};

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
            } else {
                const positionChange = (widthChange / 2) * (Math.sign(updatedShelf.position.x || 1));
                updatedShelf.position.x += positionChange;
            }
            updatedShelfArr.push(updatedShelf);
        });

        setCurrentWidth(newWidth);
        autoAddRemoveShelves(updatedShelfArr, newWidth, currentHeight, currentHorizontalGap, currentVerticalGap);
    }

    const adjustHorizontalGap = newHorizontalGap => {
        setCurrentHorizontalGap(newHorizontalGap);
        autoAddRemoveShelves(currentShelfArr, currentWidth, currentHeight, newHorizontalGap, currentVerticalGap);
    }

    const separateShelves = shelfArr => {
        const verticalOuterShelves = [];
        const verticalInnerShelves = [];
        const horizontalOuterShelves = [];
        const horizontalInnerShelves = [];

        shelfArr.forEach(shelf => {
            if (shelf.isVertical) {
                if (shelf.isOuterBoard) {
                    verticalOuterShelves.push(shelf);
                } else verticalInnerShelves.push(shelf);
            } else {
                if (shelf.isOuterBoard) {
                    horizontalOuterShelves.push(shelf);
                } else horizontalInnerShelves.push(shelf);
            }
        });

        return {
            verticalOuterShelves,
            verticalInnerShelves,
            horizontalOuterShelves,
            horizontalInnerShelves
        }
    }

    const autoAddRemoveShelves = (shelfArr, width, height, horizontalGap, verticalGap) => {
        const requiredInnerVerticals = Math.ceil(width / horizontalGap) - 1;
        const requiredInnerHorizontals = Math.ceil(height / verticalGap) - 1;
        const {
            verticalOuterShelves,
            verticalInnerShelves,
            horizontalOuterShelves,
            horizontalInnerShelves
        } = separateShelves(shelfArr);
        const updatedVerticalArr = [...verticalOuterShelves];
        const updatedHorizontalArr = [...horizontalOuterShelves];

        if (requiredInnerVerticals !== verticalInnerShelves.length) {
            for (let i = 0; i < requiredInnerVerticals; i++) {
                updatedVerticalArr.push({
                    dimensions: [height, boardThickness, currentDepth],
                    position: {x: ((requiredInnerVerticals + 1) / width * i) - (width / 2)},
                    isVertical: true
                });
            }
        }

        if (requiredInnerHorizontals !== horizontalInnerShelves.length) {
            for (let i = 0; i < requiredInnerHorizontals; i++) {
                updatedHorizontalArr.push({
                    dimensions: [width, boardThickness, currentDepth],
                    position: {y: ((requiredInnerHorizontals + 1) / height * i) - (height / 2)},
                    isVertical: false
                });
            }
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
            addRemoveActive,
            setAddRemoveActive,
            adjustWidth,
            adjustHorizontalGap,
        }}>
            {props.children}
        </ConfiguratorContext.Provider>
    )
}
