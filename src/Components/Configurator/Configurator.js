import React, {/*useContext,*/ useState, useEffect, useRef} from 'react';
import "../style.scss"
// import {GeneralContext} from "../../contexts/GeneralContext";
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const addShelfSection = (scene, dimensions, materialObj, position) => {
    const geometry = new THREE.BoxGeometry(...dimensions);  //[w, h, d]
    const material = new THREE.MeshPhongMaterial(materialObj);
    const shelfSection = new THREE.Mesh(geometry, material);

    scene.add(shelfSection);
    const {x, y, z} = position;
    if (!!x) {
        shelfSection.position.x = x;
    }
    if (!!y) {
        shelfSection.position.y = y;
    }
    if (!!z) {
        shelfSection.position.z = z;
    }

    return shelfSection;
}

const addLighting = (scene, color, intensity, position) => {
    const light = new THREE.DirectionalLight(color, intensity);
    const {x, y, z} = position;
    light.position.set(x, y, z);
    scene.add(light);
}

export const Configurator = () => {
    // const {content} = useContext(GeneralContext);
    const [shelfArr, setShelfArr] = useState([]);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setClearColor( 0x000000, 0);
    renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);
    const configuratorRef = useRef(null);

    camera.position.z = 5;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    addLighting(scene, 0xFFFFFF, 1, {x: -3, y: 2, z: 4});
    addLighting(scene, 0xFFFFFF, 1, {x: 3, y: 2, z: -4});

    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    const loadShelf = () => {
        const updatedShelfArr = [
            addShelfSection(scene, [5, 0.1, 1], {color: 0x753107}, {}),
            addShelfSection(scene, [5, 0.1, 1], {color: 0x753107}, {y: 1.95}),
            addShelfSection(scene, [0.1, 4, 1], {color: 0x753107}, {x: -2.5}),
            addShelfSection(scene, [0.1, 4, 1], {color: 0x753107}, {x: 2.5}),
        ];
        setShelfArr(updatedShelfArr);
    }

    useEffect(() => {
        if (WebGL.isWebGLAvailable()) {
            configuratorRef.current.appendChild(renderer.domElement);
            loadShelf();
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
