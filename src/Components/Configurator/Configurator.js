import React, {useContext} from 'react';
import "../style.scss"
import {Canvas} from "@react-three/fiber";
import {useTexture, OrbitControls} from "@react-three/drei";
import {ConfiguratorContext} from "../../contexts/ConfiguratorContext";
import birchSurface from '../../assets/textures/birch_surface.jpg';
import plywoodEdge from '../../assets/textures/plywood_edge.jpg';

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

const addSideSection = (position, width, height, depth, radius, shelfSideMap, shelfEdgeMap, isFront) =>
    <mesh visible position={position}>
        <boxGeometry attach="geometry" args={[width - (radius * 2), height, radius]}/>
        <meshStandardMaterial map={shelfSideMap} attach="material-0"/>
        <meshStandardMaterial map={shelfSideMap} attach="material-1"/>
        <meshStandardMaterial map={shelfSideMap} attach="material-2"/>
        <meshStandardMaterial map={shelfSideMap} attach="material-3"/>
        <meshStandardMaterial map={!!isFront ? shelfEdgeMap : shelfSideMap} attach="material-4"/>
        <meshStandardMaterial map={!!isFront ? shelfSideMap : shelfEdgeMap} attach="material-5"/>
    </mesh>

const addCornerSection = (position, rotateY, width, height, depth, radius, shelfSideMap, shelfEdgeMap) =>
    <mesh visible position={position} rotation={[0, rotateY, 0]}>
        <cylinderGeometry attach="geometry" args={[radius, radius, height, 24, 1, false, 0, Math.PI / 2]}/>
        <meshStandardMaterial map={shelfEdgeMap} attach="material-0"/>
        <meshStandardMaterial map={shelfSideMap} attach="material-1"/>
        <meshStandardMaterial map={shelfSideMap} attach="material-2"/>
    </mesh>

const ShelfSection = props => {
    const {standardOverhang} = useContext(ConfiguratorContext);

    const shelfSideMap = useTexture(birchSurface);
    const shelfEdgeMap = useTexture(plywoodEdge);

    const {dimensions, position, radius, isVertical = false, overHang = standardOverhang} = props;

    const width = dimensions[0] + overHang * 2;
    const height = dimensions[1];
    const depth = dimensions[2] - (isVertical ? overHang : 0);

    position[2] = position[2] - (isVertical ? overHang / 2 : 0);

    return (
        <group
            position={position}
            rotation={[0, 0, isVertical ? Math.PI / 2 : 0]}
        >
            {addMainSection(width, height, depth, radius, shelfSideMap, shelfEdgeMap)}
            {addSideSection([0, 0, depth / 2 - radius / 2], width, height, depth, radius, shelfSideMap, shelfEdgeMap, true)}
            {addSideSection([0, 0, -depth / 2 + radius / 2], width, height, depth, radius, shelfSideMap, shelfEdgeMap)}
            {addCornerSection([-width / 2 + radius, 0, -depth / 2 + radius], -Math.PI, width, height, depth, radius, shelfSideMap, shelfEdgeMap)}
            {addCornerSection([width / 2 - radius, 0, -depth / 2 + radius], Math.PI / 2, width, height, depth, radius, shelfSideMap, shelfEdgeMap)}
            {addCornerSection([-width / 2 + radius, 0, depth / 2 - radius], -Math.PI / 2, width, height, depth, radius, shelfSideMap, shelfEdgeMap)}
            {addCornerSection([width / 2 - radius, 0, depth / 2 - radius], 0, width, height, depth, radius, shelfSideMap, shelfEdgeMap)}
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
            frameloop='demand'
            className='configurator'
            style={{background: addRemoveActive ? "#F5F5F5" : "inherit"}}
            shadows='true'
            camera={{position: [3, 3, 5], rotation: [-Math.PI / 8, -Math.PI / 8, 0]}}
        >
            <pointLight position={[10, 10, 10]}/>
            <pointLight position={[-10, -10, -10]}/>
            <ambientLight intensity={0.5}/>
            {currentShelfArr.map((shelf, index) => {
                const {position, dimensions, isVertical} = shelf;
                return (
                    <ShelfSection
                        key={index}
                        position={[position.x || 0, position.y || 0, position.z || 0]}
                        dimensions={dimensions}
                        radius={edgeRadius}
                        isVertical={isVertical}
                    />
                )
            })}
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