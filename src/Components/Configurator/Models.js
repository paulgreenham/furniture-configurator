import React, {useMemo} from 'react';
import "../style.scss";
import {GradientTexture, useFBX} from "@react-three/drei";
import * as THREE from "three";

export const Floor = props => {
    const {position} = props;
    return (
        <mesh position={position} rotation-x={-Math.PI / 2} receiveShadow>
            <circleGeometry attach="geometry" args={[100]}/>
            <meshStandardMaterial/>
        </mesh>
    )
}

export const Wall = props => {
    const {position, rotation} = props;
    return (
        <mesh position={position} rotation={rotation}>
            <circleGeometry attach="geometry" args={[100]}/>
            <meshStandardMaterial/>
        </mesh>
    )
}

export const HumanModel = props => {
    const fbx = useFBX("/fbx-models/simple_woman_3d.fbx");
    const BasicMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color("#F3F3F3")});
    const model = useMemo(() => fbx.clone(true), []);
    model.children.forEach((mesh, i) => {mesh.material = BasicMaterial});
    const {position} = props;
    return <primitive object={model} scale={0.087} position={position} rotation={[0, -Math.PI / 6, 0]}/>;
}

export const BooksModelOne = props => {
    const fbx = useFBX("/fbx-models/book_set1.fbx");
    const {position} = props;
    return <primitive object={fbx} scale={1.75} position={position} rotation={[-Math.PI / 2, 0, 0]}/>;
}

export const BooksModelTwo = props => {
    const fbx = useFBX("/fbx-models/book_set2.fbx");
    const {position} = props;
    return <primitive object={fbx} scale={0.0025} position={position} rotation={[0, 0, 0]}/>;
}

export const BooksModelThree = props => {
    const fbx = useFBX("/fbx-models/book_set3.fbx");
    const [x, y, z] = props.position;
    return <primitive object={fbx} scale={0.045} position={[x + 0.1, y - 0.271, z - 0.2]} rotation={[0.0375, 3 * Math.PI / 4, 0]}/>;
}

export const BooksModelFour = props => {
    const fbx = useFBX("/fbx-models/book_set4.fbx");
    const [x, y, z] = props.position;
    return <primitive object={fbx} scale={0.015} position={[x, y + 0.055, z]} rotation={[0, 0, 0]}/>;
}

export const BooksModelFive = props => {
    const fbx = useFBX("/fbx-models/book_set5.fbx");
    const [x, y, z] = props.position;
    return <primitive object={fbx} scale={0.055} position={[x + 0.3, y + 0.31, z]} rotation={[0, 0, Math.PI / 2]}/>;
}

export const PotPlantModelOne = props => {
    const fbx = useFBX("/fbx-models/pot_plant1.fbx");
    const BasicMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color("darkgreen")});
    const model = useMemo(() => fbx.clone(true), []);
    model.children.forEach((mesh, i) => {mesh.material = BasicMaterial});
    const {position} = props;
    return <primitive object={model} scale={0.075} position={position} rotation={[-Math.PI / 2, 0, 0]}/>;
}

export const PotPlantModelTwo = props => {
    const fbx = useFBX("/fbx-models/pot_plant2.fbx");
    const {position} = props;
    return <primitive object={fbx} scale={0.05} position={position} rotation={[0, 0, 0]}/>;
}

export const PotPlantModelThree = props => {
    const fbx = useFBX("/fbx-models/pot_plant3.fbx");
    const BasicMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color("green")});
    const model = useMemo(() => fbx.clone(true), []);
    model.children.forEach((mesh, i) => {mesh.material = BasicMaterial});
    const {position} = props;
    return <primitive object={model} scale={0.01} position={position} rotation={[0, 0, 0]}/>;
}
