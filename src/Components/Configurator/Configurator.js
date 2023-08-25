import React, {useContext} from 'react';
import "../style.scss";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {ConfiguratorContext} from "../../contexts/ConfiguratorContext";
import {isMobile} from "react-device-detect";
import {HumanModel, Floor} from "./Models";
import ShelfSection from "./ShelfSection";

export const Configurator = () => {
    const {
        edgeRadius,
        currentShelfArr,
        addRemoveActive,
        selectedColor,
        floorY,
        rightX,
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
            <Floor position={[0, floorY, 0]}/>
            <HumanModel position = {[rightX + 1.2, floorY, 0]}/>
            <OrbitControls
                dampingFactor={0.1}
                maxAzimuthAngle={Math.PI * 1.1 / 2}
                minAzimuthAngle={-Math.PI * 1.1 / 2}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={-Math.PI * 5 / 8}
            />
        </Canvas>
    )
}