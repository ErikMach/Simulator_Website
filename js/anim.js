const addLabels = (name, labels) => {
  const N = findScenePiece(name);
	    if (!scene.userData.labelRenderer) {
	      const labelRenderer = new THREE.CSS2DRenderer();
	      labelRenderer.domElement.id = "labelRenderer";
	      document.body.appendChild(labelRenderer.domElement);
	      scene.userData.labelRenderer = labelRenderer;
	    }

  for (let i=0; i<labels.length; i++) {
	const label = labels[i];
	if (label.class.includes("labelInfo")) {continue;};
	    const tag = document.createElement(label.tag);
	    tag.className = label.class;
	    tag.textContent = label.content;
console.log(label);
	    label.children.forEach(child => {tag.appendChild(createElem(Object.values(labels)[child]))});
	    for (let event in label.events) {
	      tag.addEventListener(event, label.events[event]);
	    }
	    const numLabel = new THREE.CSS2DObject(tag);
	    numLabel.position.fromArray(label.pos);
numLabel.name = label.content;
tag.parent3D = numLabel;
	    scene.children[N].add(numLabel);
	    scene.userData.labels.push(numLabel);
  };
console.log(scene);
};

const createElem = (config) => {
  const elem = document.createElement(config.tag);
  elem.className = config.class;
  elem.innerHTML = config.content;
  return elem;
};

const GLOW = () => {

  console.log(scene.children[0]);
var glowMesh = new THREEx.GeometricGlowMesh(scene.children[0]);
  scene.children[0].add(glowMesh.object3d);

	var insideUniforms	= glowMesh.insideMesh.material.uniforms
	insideUniforms.glowColor.value.set('hotpink')
	var outsideUniforms	= glowMesh.outsideMesh.material.uniforms
	outsideUniforms.glowColor.value.set('hotpink')

};

const tweenAnims = (pieceName, anims) => {
  const delta = 50;
  const N = findScenePiece(pieceName);
  if (anims.pos) {
    const diffVec = vecDiv(vecSub(anims.pos, scene.children[N].position.toArray()), delta);
    let count = 0;
    const tween = () => {
      const dP = vecAdd(scene.children[N].position.toArray(), diffVec);
      scene.children[N].position.fromArray(dP);
      render();
      count++;
      if (count >= delta) {
        cancelAnimationFrame(tweenFrame);
        scene.children[N].position.fromArray(anims.pos);
        render();
      } else {
        tweenFrame = requestAnimationFrame(tween);
      };
    }
    let tweenFrame = requestAnimationFrame(tween);
  };
  if (anims.rot) {
    const diffVec = vecDiv(vecSub(anims.rot, scene.children[N].rotation.toArray().slice(0,-1)), delta);
    let count = 0;
    const tween = () => {
      const dR = vecAdd(scene.children[N].rotation.toArray().slice(0,-1), diffVec);
      scene.children[N].rotation.fromArray(dR);
      render();
      count++;
      if (count >= delta) {
        cancelAnimationFrame(tweenFrame);
        scene.children[N].rotation.fromArray(anims.rot);
        render();
      } else {
        tweenFrame = requestAnimationFrame(tween);
      };
    }
    let tweenFrame = requestAnimationFrame(tween);
  };
};

const findScenePiece = (name) => {
  for (let i=0; i<scene.children.length; i++) {
    if (scene.children[i].name === name.split(/\s/g).join('_')) {
      return i;
    }
  }
};

const tweenCamera = (newPos, newLookAt) => {
  const camera = scene.userData.camera;
  const delta = 50;
  const diffVec = vecDiv(vecSub(newPos, camera.position.toArray()), delta);
  const diffVec1 = vecDiv(vecSub(newLookAt, camera.userData.lookAt), delta);
  let count = 0;
  const tween = () => {
    const dP = vecAdd(camera.position.toArray(), diffVec);
    const dL = vecAdd(camera.userData.lookAt, diffVec1);
    camera.position.fromArray(dP);
    camera.lookAt(dL[0], dL[1], dL[2]);
    camera.userData.lookAt = dL;
    render();
    count++;
    if (count >= delta) {
      cancelAnimationFrame(tweenFrame);
      camera.position.fromArray(newPos);
      camera.lookAt(newLookAt[0], newLookAt[1], newLookAt[2]);
      render();
    } else {
      tweenFrame = requestAnimationFrame(tween);
    };
  }
  let tweenFrame = requestAnimationFrame(tween);
};

const vecAdd = (vec1, vec2) => {
  if (!checkVec(vec1) || !checkVec(vec2)) {return;};
  if (vec1.length !== vec2.length) {
    console.error(`Vectors are of different dimensions; they cannot be added.`, vec1, vec2);
    return;
  } else {
    const newVec = [];
    vec1.forEach((v, i) => {
      newVec.push(v + vec2[i]);
    });
    return newVec;
  }
};
const vecSub = (vec1, vec2) => {
  if (!checkVec(vec1) || !checkVec(vec2)) {return;};
  if (vec1.length !== vec2.length) {
    console.error(`Vectors are of different dimensions; they cannot be subtracted.`, vec1, vec2);
    return;
  } else {
    const newVec = [];
    vec1.forEach((v, i) => {
      newVec.push(v - vec2[i]);
    });
    return newVec;
  }
};
const vecDiv = (vec, divisor) => {
  if (!checkVec(vec)) {return;};
  const newVec = [];
  vec.forEach(v => {
    newVec.push(v/divisor);
  });
  return newVec;
};
const checkVec = (vec) => {
  if (Array.isArray(vec)) {
    return true;
  } else {
    console.error(vec, `is not an array. It's a(n)`, typeof vec);
    return false;
  }
};