import React, {useContext, useEffect, useRef} from 'react';
import "../style.scss"
// import {GeneralContext} from "../../contexts/GeneralContext";
import * as THREE from 'three';

export const Configurator = () => {
    // const {content} = useContext(GeneralContext);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    const configuratorRef = useRef(null);
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshBasicMaterial({color: 0x753107});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.004;
        cube.rotation.y += 0.004;
        renderer.render(scene, camera);
    }

    useEffect(() => {
        configuratorRef.current.appendChild(renderer.domElement);
        animate();
    }, []);

    return (
        <div className={`configurator-container`} ref={configuratorRef}/>
    )
}
