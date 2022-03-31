let renderer, scene, totalSize;
const canvas = document.getElementById('canvas');
const emptyScene = new THREE.Scene();
const emptyCamera = new THREE.PerspectiveCamera();
const parts3D = new THREE.Object3D();

const loadJSON = (name) => {
  fetch('./res/JSON/' + name + '.tk')
  .then(response => response.json())
  .then(data => {
//??
  });
};

const loadAll = () => {
  const loader = new THREE.GLTFLoader();
  const dracoLoader = new THREE.DRACOLoader();
  dracoLoader.setDecoderPath('./js/THREE/');
  loader.setDRACOLoader(dracoLoader);

  parts.concat(Object.keys(pieces)).forEach(glbFile => {
    loader.load(`./res/GLB/${glbFile}.glb`,
      function(glb) {
	parts3D.userData[glbFile] = glb.scene.children[0];
      },
      function (xhr) {
//        console.log(glbFile, `loaded ${100*xhr.loaded/xhr.total}%`);
        if (xhr.loaded === xhr.total) { 
	totalSize += xhr.total;
        }
      },
      function (err) {
        console.log(err);
      }
    )
  });
};

loadAll();

const initExplore = (piece) => {
console.log(parts3D);
  console.log(piece, 'will be explored here.');

 //SCENE
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xfff4e2);

	scene.userData.labels = [];

	const element = document.getElementById("explore3DPage");
	scene.userData.element = element; 
	currentStep = 0;

//CAMERA
	const camera = new THREE.PerspectiveCamera(39.6, element.offsetWidth/element.offsetHeight, 0.001, 20);
	camera.position.set(-0.02, 0.1, 0.01);
	camera.lookAt(-0.02, 0, 0);
	camera.userData.lookAt = [-0.02, 0, 0];
	scene.userData.camera = camera;

//ADD PIECES TO SCENE
//CLONE PIECES??
	pieces[piece].config.forEach(elem => {
	  scene.add(parts3D.userData[elem]);
	});

//LIGHTS
//	scene.add(new THREE.HemisphereLight( 0xffffff, 0x404040, 3 ));

//PHYSICALLY CORRECT AND ALL

	const lux = 0.25*Math.PI;

	scene.add( new THREE.AmbientLight( 0xffffff, 1 ) );

	const dirLight0 = new THREE.DirectionalLight( 0xffffff, lux/2 );
	dirLight0.position.set( 0, 0.8, 0 );
	scene.add( dirLight0 );

	const dirLight = new THREE.DirectionalLight( 0xffffff, lux );
	dirLight.position.set( 0, 0.8, 1 );
	scene.add( dirLight );

	const dirLight1 = new THREE.DirectionalLight( 0xffffff, lux );
	dirLight1.position.set( 0.866, 0.8, -0.5 );
	scene.add( dirLight1 );

	const dirLight2 = new THREE.DirectionalLight( 0xffffff, lux );
	dirLight2.position.set( -0.866, 0.8, -0.5 );
	scene.add( dirLight2 );


//GROUND (GridHelper)
	const gridHelper = new THREE.GridHelper( 0.4, 20 );
//	scene.add(gridHelper);

//RENDERER FOR ALL SCENES
    renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
    renderer.setClearColor(0xf0f0f3, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = false;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.gammaFactor = 2.2;
    renderer.physicallyCorrectLights = true;
    renderer.setScissorTest(true);

    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1;
console.log(scene);

//ACTION
    animate();
    setTimeout(() => {
//      cancelAnimationFrame(animationFrame);
    }, 500);
    window.addEventListener('resize', render);
};

const updateSize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
      renderer.setSize(width, height, false);
      if (scene.userData.labelRenderer) {
	scene.userData.labelRenderer.setSize(scene.userData.element.clientWidth, scene.userData.element.clientHeight);
      }
    }
};

const animate = () => {
    render();
    animationFrame = requestAnimationFrame(animate);
};

const render = () => {
    updateSize();

    if (!renderer) {cancelAnimationFrame(animationFrame);return;};

    renderer.clear();

	// set the viewport
	const element = scene.userData.element;
	const rect = element.getBoundingClientRect();
	const width = rect.right - rect.left;
	const height = rect.bottom - rect.top;
	const left = rect.left;
	const bottom = renderer.domElement.clientHeight - rect.bottom;
	const camera = scene.userData.camera;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	renderer.setViewport( left, bottom, width, height );
	renderer.setScissor( left, bottom, width, height );

    renderer.render(scene, scene.userData.camera);

	if (scene.userData.labelRenderer) {
          if (!scene.userData.labelRenderer.width || !scene.userData.labelRenderer.height) {
	    scene.userData.labelRenderer.setSize(scene.userData.element.clientWidth, scene.userData.element.clientHeight);
          }
	  scene.userData.labelRenderer.render(scene, scene.userData.camera);
//const currentPage = document.getElementById('explore3DPage');
//    ReactDOM.render(currentElems, currentPage);
	}
};

const diseng = () => {
  window.removeEventListener('resize', render);
  cancelAnimationFrame(animationFrame);
  if (scene.userData.labelRenderer) {
    document.getElementById("labelRenderer").parentElement.removeChild(document.getElementById("labelRenderer"));
    scene = null;
  } else {
    scene = null;
  }
  renderer.render(emptyScene, emptyCamera);
  renderer.dispose();
  renderer = null;
};