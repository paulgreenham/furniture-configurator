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
        addRemoveActive,
        selectedColor,
        floorY,
        rightX,
        backZ,
    } = useContext(ConfiguratorContext);

    return (
        <Canvas
            frameloop='demand'
            className={`configurator${isMobile ? " is-mobile" : ""}`}
            style={{background: addRemoveActive ? "#F5F5F5" : "inherit"}}
            shadows='true'
            camera={{position: [3, 2, 5], rotation: [-Math.PI / 8, -Math.PI / 8, 0]}}
        >
            <directionalLight position={[5, 10, 5]} castShadow={true}/>
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
            {/*<Floor position={[0, floorY, 0]}/>*/}
            {/*<Wall position={[0, 0, backZ]}/>*/}
            <HumanModel position = {[rightX + 1.2, floorY, 0]}/>
            {/*<BooksModelOne position = {[0, boardThickness / 2, 0]}/>*/}
            {/*<BooksModelTwo position = {[0, boardThickness / 2, 0]}/>*/}
            {/*<BooksModelThree position = {[0, boardThickness / 2, 0]}/>*/}
            {/*<BooksModelFour position = {[0, boardThickness / 2, 0]}/>*/}
            {/*<BooksModelFive position = {[0, boardThickness / 2, 0]}/>*/}
            {/*<PotPlantModelOne position = {[0, boardThickness / 2, 0]}/>*/}
            {/*<PotPlantModelTwo position = {[0, boardThickness / 2, 0]}/>*/}
            <PotPlantModelThree position = {[0, boardThickness / 2, 0]}/>
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