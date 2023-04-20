import React, {useContext, useEffect, useRef} from 'react';
import "../style.scss"
// import {GeneralContext} from "../../contexts/GeneralContext";
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

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
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    useEffect(() => {
        if (WebGL.isWebGLAvailable()) {
            configuratorRef.current.appendChild(renderer.domElement);
            animate();
        } else {
            const warning = WebGL.getWebGLErrorMessage();
            configuratorRef.current.appendChild(warning);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={`configurator-container`} ref={configuratorRef}/>
    )
}
