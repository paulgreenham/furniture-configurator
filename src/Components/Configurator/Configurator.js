import React, {useEffect, useRef, useState} from 'react';
import "../style.scss"
// import {GeneralContext} from "../../contexts/GeneralContext";
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import birchSurface from '../../assets/textures/birch_surface.jpg';
import plywoodEdge from '../../assets/textures/plywood_edge.jpg';

const edgeRadius = 0.03;

const addShelfSection = (scene, dimensions, position, radius, isVertical = false) => {
    const textureLoader = new THREE.TextureLoader();
    const shelfSide = textureLoader.load(birchSurface);
    const shelfEdge = textureLoader.load(plywoodEdge);

    const width = dimensions[0];
    const height = dimensions[1];
    const depth = dimensions[2];

    const mainGeometry = new THREE.BoxGeometry(width, height, depth - (radius * 2));
    const sideGeometry = new THREE.BoxGeometry(width - (radius * 2), height, radius);
    const cornerGeometry = new THREE.CylinderGeometry(radius, radius, height, 24, 1, false, 0, Math.PI / 2);

    const sideMaterial = new THREE.MeshStandardMaterial({map: shelfSide});
    const edgeMaterial = new THREE.MeshStandardMaterial({map: shelfEdge});

    const cornerLB = new THREE.Mesh(cornerGeometry, [edgeMaterial, sideMaterial, sideMaterial]);
    cornerLB.position.set(-width / 2 + radius, 0, -depth / 2 + radius);
    cornerLB.rotateY(-Math.PI);
    const cornerRB = new THREE.Mesh(cornerGeometry, [edgeMaterial, sideMaterial, sideMaterial]);
    cornerRB.position.set(width / 2 - radius, 0, -depth / 2 + radius);
    cornerRB.rotateY(Math.PI / 2);
    const cornerLF = new THREE.Mesh(cornerGeometry, [edgeMaterial, sideMaterial, sideMaterial]);
    cornerLF.position.set(-width / 2 + radius, 0, depth / 2 - radius);
    cornerLF.rotateY( -Math.PI / 2);
    const cornerRF = new THREE.Mesh(cornerGeometry, [edgeMaterial, sideMaterial, sideMaterial]);
    cornerRF.position.set(width / 2 - radius, 0, depth / 2 - radius);

    const sideSectionBack = new THREE.Mesh(sideGeometry, [edgeMaterial, edgeMaterial, sideMaterial, sideMaterial, edgeMaterial, edgeMaterial]);
    sideSectionBack.position.set(0, 0, -depth / 2 + radius / 2);
    const sideSectionFront = new THREE.Mesh(sideGeometry, [edgeMaterial, edgeMaterial, sideMaterial, sideMaterial, edgeMaterial, edgeMaterial]);
    sideSectionFront.position.set(0, 0, depth / 2 - radius / 2);

    const mainSection = new THREE.Mesh(mainGeometry, [edgeMaterial, edgeMaterial, sideMaterial, sideMaterial, edgeMaterial, edgeMaterial]);

    const shelfSection = new THREE.Group();
    shelfSection.add(mainSection);
    shelfSection.add(sideSectionFront);
    shelfSection.add(sideSectionBack);
    shelfSection.add(cornerLB);
    shelfSection.add(cornerRB);
    shelfSection.add(cornerLF);
    shelfSection.add(cornerRF);

    if (isVertical) {
        shelfSection.rotateZ(Math.PI / 2);
    }

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
    const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
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
            addShelfSection(scene, [5, 0.04, 1], {}, edgeRadius),
            addShelfSection(scene, [5, 0.04, 1], {y: 1.92}, edgeRadius),
            addShelfSection(scene, [4, 0.04, 1], {x: -2.42}, edgeRadius, true),
            addShelfSection(scene, [4, 0.04, 1], {x: 2.42}, edgeRadius, true),
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
