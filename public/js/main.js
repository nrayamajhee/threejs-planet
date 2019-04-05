function loadSkyBox(path) {
    let textureLoader = new THREE.TextureLoader();

    textureEquirec = textureLoader.load(path);
    textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
    textureEquirec.magFilter = THREE.LinearFilter;
    textureEquirec.minFilter = THREE.LinearMipMapLinearFilter;
    textureEquirec.encoding = THREE.sRGBEncoding;

    var equirectShader = THREE.ShaderLib["equirect"];

    var equirectMaterial = new THREE.ShaderMaterial({
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

    return new THREE.Mesh(new THREE.IcosahedronBufferGeometry(100, 3), equirectMaterial);
}
function main() {
    if (WEBGL.isWebGLAvailable() === false) {
        document.body.appendChild(WEBGL.getWebGLErrorMessage());
    }

    var scene = new THREE.Scene();

    var renderer = new THREE.WebGLRenderer();
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1.0;

    document.body.appendChild(renderer.domElement);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight);

    var geometry = new THREE.IcosahedronBufferGeometry(1, 2);
    var material = new THREE.MeshPhysicalMaterial({
        color: 0x00ff00,
        roughness: 1.0,
    });

    let cubeMesh = loadSkyBox('textures/skybox/starmap.jpg');
    scene.add(cubeMesh);

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;


    let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 5);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    var animate = function () {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        controls.update();

        renderer.render(scene, camera);
    };
    animate();
}