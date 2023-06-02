import React, {useEffect, useRef, useContext} from 'react';
import "../style.scss"
import {Canvas, extend} from "@react-three/fiber";
import {useTexture, OrbitControls} from "@react-three/drei";
import {ConfiguratorContext} from "../../contexts/ConfiguratorContext";
import {isMobile} from "react-device-detect";
import birchSurface from '../../assets/textures/birch_surface.jpg';
import plywoodEdge from '../../assets/textures/plywood_edge.jpg';

const appBarHeight = 100;
const positionOffSet = isMobile ? 0 : 480;

const addMainSection = (width, height, depth, radius, shelfSideMap, shelfEdgeMap) =>
    <mesh visible position={[0, 0, 0]}>
        <boxGeometry attach="geometry" args={[width, height, depth - (radius * 2)]}/>
        <meshStandardMaterial map={shelfEdgeMap} attach="material-0"/>
        <meshStandardMaterial map={shelfEdgeMap} attach="material-1"/>
        <meshStandardMaterial map={shelfSideMap} attach="material-2"/>
        <meshStandardMaterial map={shelfSideMap} attach="material-3"/>
        <meshStandardMaterial map={shelfEdgeMap} attach="material-4"/>
        <meshStandardMaterial map={shelfEdgeMap} attach="material-5"/>
    </mesh>

const addSideSection = (position, width, height, depth, radius, shelfSideMap, shelfEdgeMap) =>
    <mesh visible position={position}>
        <boxGeometry attach="geometry" args={[width - (radius * 2), height, radius]}/>
        <meshStandardMaterial map={shelfEdgeMap} attach="material-0"/>
        <meshStandardMaterial map={shelfEdgeMap} attach="material-1"/>
        <meshStandardMaterial map={shelfSideMap} attach="material-2"/>
        <meshStandardMaterial map={shelfSideMap} attach="material-3"/>
        <meshStandardMaterial map={shelfEdgeMap} attach="material-4"/>
        <meshStandardMaterial map={shelfEdgeMap} attach="material-5"/>
    </mesh>

const addCornerSection = (position, rotateY, width, height, depth, radius, shelfSideMap, shelfEdgeMap) =>
    <mesh visible position={position} rotation={[0, rotateY, 0]}>
        <cylinderGeometry attach="geometry" args={[radius, radius, height, 24, 1, false, 0, Math.PI / 2]}/>
        <meshStandardMaterial map={shelfEdgeMap} attach="material-0"/>
        <meshStandardMaterial map={shelfSideMap} attach="material-1"/>
        <meshStandardMaterial map={shelfSideMap} attach="material-2"/>
    </mesh>

const ShelfSection = props => {
    const shelfSideMap = useTexture(birchSurface);
    const shelfEdgeMap = useTexture(plywoodEdge);

    const {dimensions, position, radius, isVertical = false} = props;

    const width = dimensions[0];
    const height = dimensions[1];
    const depth = dimensions[2];

    return (
        <group
            position={position}
            rotation={[0, 0, isVertical ? Math.PI / 2 : 0]}
        >
            {addMainSection(width, height, depth, radius, shelfSideMap, shelfEdgeMap)}
            {addSideSection([0, 0, -depth / 2 + radius / 2], width, height, depth, radius, shelfSideMap, shelfEdgeMap)}  //side section front
            {addSideSection([0, 0, depth / 2 - radius / 2], width, height, depth, radius, shelfSideMap, shelfEdgeMap)}  //side section back
            {addCornerSection([-width / 2 + radius, 0, -depth / 2 + radius], -Math.PI, width, height, depth, radius, shelfSideMap, shelfEdgeMap)}  //corner section left back
            {addCornerSection([width / 2 - radius, 0, -depth / 2 + radius], Math.PI / 2, width, height, depth, radius, shelfSideMap, shelfEdgeMap)}  //corner section right back
            {addCornerSection([-width / 2 + radius, 0, depth / 2 - radius], -Math.PI / 2, width, height, depth, radius, shelfSideMap, shelfEdgeMap)}  //corner section left front
            {addCornerSection([width / 2 - radius, 0, depth / 2 - radius], 0, width, height, depth, radius, shelfSideMap, shelfEdgeMap)}  //corner section right front
        </group>
    )
}

export const Configurator = () => {
    const {
        edgeRadius,
        currentShelfArr,
        addRemoveActive,
    } = useContext(ConfiguratorContext);

    return (
        <Canvas
            className='configurator'
            style={{background: addRemoveActive ? "#F5F5F5" : "inherit"}}
            shadows='true'
            camera={{position: [3, 3, 5]}}
        >
            <pointLight position={[10, 10, 10]}/>
            <pointLight position={[-10, -10, -10]}/>
            <ambientLight intensity={0.5}/>
            <ShelfSection position={[0, 0, 0]} dimensions={[3, 0.04, 1]} radius={edgeRadius}/>
            <OrbitControls
                dampingFactor={0.1}
                maxAzimuthAngle={Math.PI * 1.1/ 2}
                minAzimuthAngle={-Math.PI * 1.1/ 2}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={-Math.PI * 5 / 8}
            />
        </Canvas>
    )
}