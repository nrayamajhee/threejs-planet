import tooloud from 'tooloud';
import * as THREE from 'three';

require('three-instanced-mesh')(THREE);

const Colors = {
    white: 0xffffff,
    green: 0x55ff22,
    blue: 0x0000aa,
};


function generateClouds(vertices) {
    const cloud = generateSphere(1, 2, 1, 2, {
        color: Colors.white,
        opacity: 0.8,
        reflectivity: 1.0,
        roughness: 0.1,
    });

    let clouds = new THREE.InstancedMesh(
        cloud.geometry,
        cloud.material,
        vertices.length / 3,
        false,
        false,
        true,
    );

    var _v3 = new THREE.Vector3();
    var _q = new THREE.Quaternion();
    const alt = 1.05;

    for (let i = 0; i < vertices.length; i += 3) {
        clouds.setPositionAt(i / 3, _v3.set(vertices[i] * alt, vertices[i + 1] * alt, vertices[i + 2] * alt));
        clouds.setQuaternionAt(i / 3, _q);
        clouds.setScaleAt(i, _v3.set(1, 1, 1));
    }
    return clouds;
}

function generateSphere(radius, subdivision, strength, octaves, mat) {
    let geometry = new THREE.IcosahedronBufferGeometry(1, subdivision);
    let vertices = geometry.getAttribute('position').array;
    for (let i = 0; i < vertices.length; i += 3) {
        const n = genNoise(vertices[i], vertices[i + 1], vertices[i + 2], octaves) * strength;
        const d = radius + n;
        vertices[i] *= d;
        vertices[i + 1] *= d;
        vertices[i + 2] *= d;
    }
    let material = new THREE.MeshPhysicalMaterial({
        color: mat.color,
        roughness: mat.roughness,
        reflectivity: mat.reflectivity,
        opacity: mat.opacity,
        flatShading: true
    });
    material.transparent = true;

    return new THREE.Mesh(geometry, material);
}

class Planet {
    constructor() {
        this.group = new THREE.Group();
        this.lithosphere = generateSphere(100, 4, 20, 8, {
            color: Colors.green,
            opacity: 1.0,
            reflectivity: 0.2,
            roughness: 0.5,
        });
        this.hydrosphere = generateSphere(100, 6, 10, 16, {
            color: Colors.blue,
            opacity: 0.8,
            reflectivity: 1.0,
            roughness: 0.1,
        });
        this.clouds = generateClouds(this.lithosphere.geometry.getAttribute('position').array);
        this.group.add(this.clouds);
        this.group.add(this.lithosphere);
        this.group.add(this.hydrosphere);
    }
    update() {
        this.group.rotation.y += 0.01;
    }
}

function genNoise(x, y, z, octaves) {
    const simplex = tooloud.Simplex.create(Math.random());
    return tooloud.Fractal.noise(x, y, z, octaves, simplex.noise);
}

export { Planet as default };