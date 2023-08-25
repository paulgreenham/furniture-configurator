import React, {useContext} from "react";
import {ConfiguratorContext} from "../../contexts/ConfiguratorContext";
import {useTexture} from "@react-three/drei";
import birchSurface from "../../assets/textures/birch_surface.jpg";
import plywoodEdge from "../../assets/textures/plywood_edge.jpg";

const addMainSection = (width, height, depth, radius, shelfSideMap, shelfEdgeMap, color) =>
    !!color
        ? <mesh visible position={[0, 0, 0]} castShadow>
            <boxGeometry attach="geometry" args={[width, height, depth - (radius * 2)]}/>
            <meshStandardMaterial map={shelfEdgeMap} attach="material-0"/>
            <meshStandardMaterial map={shelfEdgeMap} attach="material-1"/>
            <meshStandardMaterial map={shelfSideMap} attach="material-2" color={color}/>
            <meshStandardMaterial map={shelfSideMap} attach="material-3" color={color}/>
            <meshStandardMaterial map={shelfEdgeMap} attach="material-4"/>
            <meshStandardMaterial map={shelfEdgeMap} attach="material-5"/>
        </mesh>
        : <mesh visible position={[0, 0, 0]} castShadow>
            <boxGeometry attach="geometry" args={[width, height, depth - (radius * 2)]}/>
            <meshStandardMaterial map={shelfEdgeMap} attach="material-0"/>
            <meshStandardMaterial map={shelfEdgeMap} attach="material-1"/>
            <meshStandardMaterial map={shelfSideMap} attach="material-2"/>
            <meshStandardMaterial map={shelfSideMap} attach="material-3"/>
            <meshStandardMaterial map={shelfEdgeMap} attach="material-4"/>
            <meshStandardMaterial map={shelfEdgeMap} attach="material-5"/>
        </mesh>

const addSideSection = (position, width, height, depth, radius, shelfSideMap, shelfEdgeMap, isFront, color) =>
    !!color
        ? <mesh visible position={position} castShadow>
            <boxGeometry attach="geometry" args={[width - (radius * 2), height, radius]}/>
            <meshStandardMaterial map={shelfSideMap} attach="material-0" color={color}/>
            <meshStandardMaterial map={shelfSideMap} attach="material-1" color={color}/>
            <meshStandardMaterial map={shelfSideMap} attach="material-2" color={color}/>
            <meshStandardMaterial map={shelfSideMap} attach="material-3" color={color}/>
            <meshStandardMaterial map={!!isFront ? shelfEdgeMap : shelfSideMap} attach="material-4"
                                  color={!!isFront ? "" : color}/>
            <meshStandardMaterial map={!!isFront ? shelfSideMap : shelfEdgeMap} attach="material-5"
                                  color={!!isFront ? color : ""}/>
        </mesh>
        : <mesh visible position={position} castShadow>
            <boxGeometry attach="geometry" args={[width - (radius * 2), height, radius]}/>
            <meshStandardMaterial map={shelfSideMap} attach="material-0"/>
            <meshStandardMaterial map={shelfSideMap} attach="material-1"/>
            <meshStandardMaterial map={shelfSideMap} attach="material-2"/>
            <meshStandardMaterial map={shelfSideMap} attach="material-3"/>
            <meshStandardMaterial map={!!isFront ? shelfEdgeMap : shelfSideMap} attach="material-4"/>
            <meshStandardMaterial map={!!isFront ? shelfSideMap : shelfEdgeMap} attach="material-5"/>
        </mesh>

const addCornerSection = (position, rotateY, width, height, depth, radius, shelfSideMap, shelfEdgeMap, color) =>
    !!color
        ? <mesh visible position={position} rotation={[0, rotateY, 0]} castShadow>
            <cylinderGeometry attach="geometry" args={[radius, radius, height, 24, 1, false, 0, Math.PI / 2]}/>
            <meshStandardMaterial map={shelfEdgeMap} attach="material-0"/>
            <meshStandardMaterial map={shelfSideMap} attach="material-1" color={color}/>
            <meshStandardMaterial map={shelfSideMap} attach="material-2" color={color}/>
        </mesh>
        : <mesh visible position={position} rotation={[0, rotateY, 0]} castShadow>
            <cylinderGeometry attach="geometry" args={[radius, radius, height, 24, 1, false, 0, Math.PI / 2]}/>
            <meshStandardMaterial map={shelfEdgeMap} attach="material-0"/>
            <meshStandardMaterial map={shelfSideMap} attach="material-1"/>
            <meshStandardMaterial map={shelfSideMap} attach="material-2"/>
        </mesh>

const ShelfSection = props => {
    const {standardOverhang} = useContext(ConfiguratorContext);

    const shelfSideMap = useTexture(birchSurface);
    const shelfEdgeMap = useTexture(plywoodEdge);

    const {dimensions, position, radius, color, isVertical = false, overHang = standardOverhang} = props;

    const width = dimensions[0] + overHang * 2;
    const height = dimensions[1];
    const depth = dimensions[2] - (isVertical ? overHang : 0);

    position[2] = position[2] - (isVertical ? overHang / 2 : 0);

    return (
        <group
            position={position}
            rotation={[0, 0, isVertical ? Math.PI / 2 : 0]}
        >
            {addMainSection(width, height, depth, radius, shelfSideMap, shelfEdgeMap, color)}
            {addSideSection([0, 0, depth / 2 - radius / 2], width, height, depth, radius, shelfSideMap, shelfEdgeMap, true, color)}
            {addSideSection([0, 0, -depth / 2 + radius / 2], width, height, depth, radius, shelfSideMap, shelfEdgeMap, false, color)}
            {addCornerSection([-width / 2 + radius, 0, -depth / 2 + radius], -Math.PI, width, height, depth, radius, shelfSideMap, shelfEdgeMap, color)}
            {addCornerSection([width / 2 - radius, 0, -depth / 2 + radius], Math.PI / 2, width, height, depth, radius, shelfSideMap, shelfEdgeMap, color)}
            {addCornerSection([-width / 2 + radius, 0, depth / 2 - radius], -Math.PI / 2, width, height, depth, radius, shelfSideMap, shelfEdgeMap, color)}
            {addCornerSection([width / 2 - radius, 0, depth / 2 - radius], 0, width, height, depth, radius, shelfSideMap, shelfEdgeMap, color)}
        </group>
    )
}

export default ShelfSection;