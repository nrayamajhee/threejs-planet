import Skybox from './img/skybox/starmap.jpg';
import Stats from 'stats.js';
import Planet from './planet.js';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

function loadSkyBox(path) {
    let textureLoader = new THREE.TextureLoader();

    let textureEquirec = textureLoader.load(path);
    textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
    textureEquirec.magFilter = THREE.LinearFilter;
    textureEquirec.minFilter = THREE.LinearMipMapLinearFilter;
    textureEquirec.encoding = THREE.sRGBEncoding;

    let equirectShader = THREE.ShaderLib["equirect"];

    let equirectMaterial = new THREE.ShaderMaterial({
        fragmentShader: equirectShader.fragmentShader,
        vertexShader: equirectShader.vertexShader,
        uniforms: equirectShader.uniforms,
        depthWrite: false,
        side: THREE.BackSide
    });

    equirectMaterial.uniforms["tEquirect"].value = textureEquirec;
    // enable code injection for non-built-in material
    Object.defineProperty(equirectMaterial, 'map', {

        get: function () {

            return this.uniforms.tEquirect.value;

        }

    });

    return new THREE.Mesh(new THREE.IcosahedronBufferGeometry(1000, 1), equirectMaterial);
}

class Game {
    constructor() {
        if (WEBGL.isWebGLAvailable() === false) {
            document.body.appendChild(WEBGL.getWebGLErrorMessage());
        }

        this.sceneSky = new THREE.Scene();
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        this.cameraSky = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
        this.controls = new OrbitControls(this.camera);
        this.camera.position.set(0, 110, 10);
        this.controls.target.set(0, 100, 0);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.scene.add(directionalLight);

        const skybox = loadSkyBox(Skybox);
        this.sceneSky.add(skybox);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.autoClear = false;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);
        this.renderer.gammaOutput = true;

        this.resize();

        if (this.renderer.extensions.get('ANGLE_instanced_arrays') === null) {
            document.getElementById('notSupported').style.display = '';
            return;
        }

        this.planet = new Planet();
        this.scene.add(this.planet.group);

        window.addEventListener('resize', () => { this.resize() });

        this.stats = new Stats();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);
    }
    update() {
        this.stats.begin();
        this.planet.update();

        this.camera.lookAt(this.scene.position);
        this.cameraSky.rotation.copy(this.camera.rotation);

        this.controls.update();

        this.renderer.render(this.sceneSky, this.cameraSky);
        this.renderer.render(this.scene, this.camera);
        this.stats.end();
        requestAnimationFrame(() => { this.update() });
    }
    resize() {
        let aspect = window.innerWidth / window.innerHeight;
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
        this.cameraSky.aspect = aspect;
        this.cameraSky.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

window.addEventListener('load', () => {
    let game = new Game();
    game.update();
});
