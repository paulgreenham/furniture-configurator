import React, {useMemo} from 'react';
import "../style.scss";
import {GradientTexture, useFBX} from "@react-three/drei";
import * as THREE from "three";

export const Floor = props => {
    const {position} = props;
    return (
        <mesh position={position} rotation-x={-Math.PI / 2} receiveShadow>
            <circleGeometry attach="geometry" args={[50]}/>
            <meshStandardMaterial/>
        </mesh>
    )
}

export const HumanModel = props => {
    const fbx = useFBX("/simple_woman_3d.fbx");
    const BasicMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color("#E3E0DB")});
    const model = useMemo(() => fbx.clone(true), []);
    model.children.forEach((mesh, i) => {mesh.material = BasicMaterial});
    const {position} = props;
    return <primitive object={model} scale={0.087} position={position} rotation={[0, -Math.PI / 6, 0]}/>;
}
