import React, {useContext} from 'react';
import "../style.scss";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {ConfiguratorContext} from "../../contexts/ConfiguratorContext";
import {isMobile} from "react-device-detect";
import {
    HumanModel,
    Floor,
    Wall,
    BooksModelOne,
    BooksModelFive,
    BooksModelTwo,
    BooksModelThree,
    BooksModelFour, PotPlantModelOne, PotPlantModelTwo, PotPlantModelThree
} from "./Models";
import ShelfSection from "./ShelfSection";

export const Configurator = () => {
    const {
        edgeRadius,
        standardOverhang,
        boardThickness,
        currentShelfArr,
        currentWidth,
        currentHeight,
        addRemoveActive,
        selectedColor,
        floorY,
        rightX,
        backZ,
        randomSeed,
    } = useContext(ConfiguratorContext);

    const getItem = (positionArr, itemCount) => {
        const itemIndex = Math.ceil(itemCount + randomSeed * 1.5) % 8;
        switch (itemIndex) {
            case 1:
                return <BooksModelOne position={positionArr}/>
            case 2:
                return <BooksModelTwo position={positionArr}/>
            case 3:
                return <BooksModelThree position={positionArr}/>
            case 4:
                return <BooksModelFour position={positionArr}/>
            case 5:
                return <BooksModelFive position={positionArr}/>
            case 6:
                return <PotPlantModelOne position={positionArr}/>
            case 7:
                return <PotPlantModelTwo position={positionArr}/>
            case 8:
                return <PotPlantModelThree position={positionArr}/>
            default:
                return <BooksModelTwo position={positionArr}/>
        }
    }

    const populateItems = () => {
        const sortedHorizontalShelves = currentShelfArr.filter(shelf => !shelf.isVertical).sort((a, b) => a.position.y > b.position.y);
        const sortedVerticalShelves = currentShelfArr.filter(shelf => shelf.isVertical).sort((a, b) => a.position.x > b.position.x);
        const currentSpaceWidth = currentWidth / (sortedVerticalShelves.length - 1);
        const currentSpaceHeight = currentHeight / (sortedHorizontalShelves.length - 1);
        if (currentSpaceWidth < 1.2 || currentSpaceHeight < 1.2) {
            return []
        };

        const itemList = [];


        const verticalSpaces = sortedVerticalShelves.length - 1;
        const horizontalSpaces = sortedHorizontalShelves.length - 1;
        const totalSpaces = verticalSpaces * horizontalSpaces;
        const totalItems = Math.floor(totalSpaces / 3) + 1;

        let itemCount = 0;
        sortedHorizontalShelves.forEach((horizontalShelf, index) => {
            if (itemCount < totalItems) {
                const isOddShelf = index % 2 === 1;
                const count = index + randomSeed;
                const spaceDislocation = (count % verticalSpaces) || 1;
                console.log(count, spaceDislocation, verticalSpaces)
                const spacePosition = isOddShelf ? verticalSpaces - spaceDislocation : spaceDislocation;
                const itemX = sortedVerticalShelves[spacePosition].position.x - (currentSpaceWidth / 2) - (boardThickness / 2);
                const itemY = horizontalShelf.position.y + boardThickness / 2;
                itemList.push(getItem([itemX, itemY, 0], itemCount));
                itemCount ++;
            }
        });

        return itemList;
    }

    return (
        <Canvas
            frameloop='demand'
            className={`configurator${isMobile ? " is-mobile" : ""}`}
            style={{background: addRemoveActive ? "#F5F5F5" : "inherit"}}
            shadows='true'
            camera={{position: [3, 2, 5], rotation: [-Math.PI / 8, -Math.PI / 8, 0]}}
        >
            <directionalLight intensity={0.5} position={[5, 10, 5]} castShadow={true}/>
            <ambientLight intensity={0.8}/>
            {currentShelfArr.map((shelf, index) => {
                const {position, dimensions, isVertical} = shelf;
                return (
                    <ShelfSection
                        key={index}
                        position={[position.x || 0, position.y || 0, position.z || 0]}
                        dimensions={dimensions}
                        radius={edgeRadius}
                        isVertical={isVertical}
                        color={selectedColor}
                    />
                )
            })}
            <Floor position={[0, floorY, 0]}/>
            <Wall position={[0, 0, backZ - 1]}/>
            <HumanModel position={[rightX + 1.2, floorY, 0]}/>
            {populateItems()}
            <OrbitControls
                dampingFactor={0.1}
                maxAzimuthAngle={Math.PI / 2}
                minAzimuthAngle={-Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={-Math.PI * 5 / 8}
            />
        </Canvas>
    )
}