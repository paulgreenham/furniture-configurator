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

const ShelfMesh = props => {
    const shelfSideMap = useTexture(birchSurface);
    const shelfEdgeMap = useTexture(plywoodEdge);

    const {position, rotation, dimensions} = props;

    return (
        <mesh
            visible
            position={position}
            rotation={rotation}
        >
            <boxGeometry attach="geometry" args={dimensions}/>
            <meshStandardMaterial map={shelfEdgeMap} attach="material-0"/>
            <meshStandardMaterial map={shelfEdgeMap} attach="material-1"/>
            <meshStandardMaterial map={shelfSideMap} attach="material-2"/>
            <meshStandardMaterial map={shelfSideMap} attach="material-3"/>
            <meshStandardMaterial map={shelfEdgeMap} attach="material-4"/>
            <meshStandardMaterial map={shelfEdgeMap} attach="material-5"/>
        </mesh>
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
            <ShelfMesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} dimensions={[3, 0.04, 1]}/>
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