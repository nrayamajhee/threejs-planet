function loadSkyBox(path) {
    let textureLoader = new THREE.TextureLoader();

    textureEquirec = textureLoader.load(path);
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

    return new THREE.Mesh(new THREE.IcosahedronBufferGeometry(100, 2), equirectMaterial);
}

function generatePlanet(radius, subdivision) {
    noise.seed(Math.random());
    let geometry = new THREE.IcosahedronBufferGeometry(radius, subdivision);
    // let vertices = geometry.attributes.position.array;
    // for(let i = 0; i < vertices.length - 3; i+=3) {
    //     // const d = radius + noise.simplex3(vertices[i], vertices[i + 1], vertices[i + 2]);
    //     const d = radius;
    //     console.log(d);
    //     vertices[i] = vertices[i] * d;
    //     vertices[i+1] = vertices[i] * d;
    //     vertices[i+2] = vertices[i] * d;
    // }
    // geometry.attributes.position.array = vertices;
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x00ff00,
        roughness: 1.0,
    });

    return new THREE.Mesh(geometry, material);
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
        this.camera.position.set(0, 0, 5);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.scene.add(directionalLight);

        const skybox = loadSkyBox('textures/skybox/starmap.jpg');
        this.sceneSky.add(skybox);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.autoClear = false;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.renderer.gammaOutput = true;

        this.controls = new THREE.OrbitControls(this.camera);

        this.planet = generatePlanet(1, 3);
        this.scene.add(this.planet);

        window.addEventListener('resize', () => { this.resize() });
    }
    update() {
        requestAnimationFrame(() => { this.update() });
        this.planet.rotation.x += 0.01;
        this.planet.rotation.y += 0.01;

        this.camera.lookAt(this.scene.position);
        this.cameraSky.rotation.copy(this.camera.rotation);

        this.renderer.render(this.sceneSky, this.cameraSky);
        this.renderer.render(this.scene, this.camera);
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