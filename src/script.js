import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
const addVector3Editor = (parent, property, min, max, step) => {
  parent.add(property, "x").min(min).max(max).step(step);
  parent.add(property, "y").min(min).max(max).step(step);
  parent.add(property, "z").min(min).max(max).step(step);
};
const addPositionRotationGui = (
  parent,
  object,
  min = -10,
  max = 10,
  step = 0.1
) => {
  let positionGui = parent.addFolder("Position");
  addVector3Editor(positionGui, object.position, min, max, step);
  let rotationGui = parent.addFolder("Rotation");
  addVector3Editor(rotationGui, object.rotation, min, max, step);
};
const canvas = document.querySelector("canvas.webgl");
// Scene
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
let rgbeLoader = new RGBELoader();
rgbeLoader.load("/envMaps/autumn_field_1k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;

  //scene.background = environmentMap;
  scene.environment = environmentMap;

  scene.environmentIntensity = 1.31;
});

const gui = new GUI();
gui.close();
gui
  .add(scene, "environmentIntensity")
  .min(0)
  .max(5)
  .step(0.01)
  .name("Environment Intensity");
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.colorSpace = THREE.SRGBColorSpace;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};
window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

let ambientLight = new THREE.AmbientLight("white", 10);
scene.add(ambientLight);
let directionalLight = new THREE.DirectionalLight("white", 10);
directionalLight.position.set(10, 4, 8);
directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 18;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.scale.set(10, 10, 10);
const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
//scene.add(directionalLightCameraHelper);
scene.add(directionalLight);
let lighFolder = gui.addFolder("Directional Light");
addPositionRotationGui(lighFolder, directionalLight, -10, 10, 0.01);
//Models
let modelLoader = new GLTFLoader();
modelLoader.load("/models/Ground.glb", (gltf) => {
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add(gltf.scene);
});
modelLoader.load("/models/MainHouse.glb", (gltf) => {
  let house = gui.addFolder("House");
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  addPositionRotationGui(house, gltf.scene, -5, 5, 0.01);
  scene.add(gltf.scene);
});
modelLoader.load("/models/SecondaryHouse.glb", (gltf) => {
  let house = gui.addFolder("SecondaryHouse");
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  addPositionRotationGui(house, gltf.scene, -5, 5, 0.01);
  scene.add(gltf.scene);
});
modelLoader.load("/models/OakTree.glb", (gltf) => {
  let editorGui = gui.addFolder("OakTree 1");
  gltf.scene.position.set(2.3, 0, 1.2);
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  addPositionRotationGui(editorGui, gltf.scene, -5, 5, 0.01);
  scene.add(gltf.scene);
});
modelLoader.load("/models/OakTree2.glb", (gltf) => {
  let editorGui = gui.addFolder("OakTree 2");
  gltf.scene.position.set(0.81, 0, 0.18);
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  addPositionRotationGui(editorGui, gltf.scene, -5, 5, 0.01);
  scene.add(gltf.scene);
});
modelLoader.load("/models/OakTree2.glb", (gltf) => {
  let editorGui = gui.addFolder("OakTree 3");
  gltf.scene.position.set(1.4, 0, 5);
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  addPositionRotationGui(editorGui, gltf.scene, -5, 5, 0.01);
  scene.add(gltf.scene);
});
modelLoader.load("/models/OakTree2.glb", (gltf) => {
  let editorGui = gui.addFolder("OakTree 2");
  gltf.scene.position.set(0.8, 0, 4.5);
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  addPositionRotationGui(editorGui, gltf.scene, -5, 5, 0.01);
  scene.add(gltf.scene);
});
modelLoader.load("/models/OakTree2.glb", (gltf) => {
  let editorGui = gui.addFolder("OakTree 2");
  gltf.scene.position.set(0.8, 0, 5.6);
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  addPositionRotationGui(editorGui, gltf.scene, -5, 5, 0.01);
  scene.add(gltf.scene);
});
modelLoader.load("/models/PineTree1.glb", (gltf) => {
  let editorGui = gui.addFolder("PineTree 1");
  gltf.scene.position.set(2.6, 0, 0.68);
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  addPositionRotationGui(editorGui, gltf.scene, -5, 5, 0.01);
  scene.add(gltf.scene);
});
modelLoader.load("/models/PineTree2.glb", (gltf) => {
  let editorGui = gui.addFolder("Pinetree 2");
  gltf.scene.position.set(2.8, 0, -1.9);
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  addPositionRotationGui(editorGui, gltf.scene, -5, 5, 0.01);
  scene.add(gltf.scene);
});

let crops = new THREE.Group();
modelLoader.load("/models/Crops.glb", (gltf) => {
  let editorGui = gui.addFolder("Crops");
  gltf.scene.position.set(1, 0, 0.55);
  gltf.scene.scale.setScalar(0.25);
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  addPositionRotationGui(editorGui, gltf.scene, -5, 5, 0.01);
  crops.add(gltf.scene);
});
modelLoader.load("/models/Crops.glb", (gltf) => {
  let editorGui = gui.addFolder("Crops 2");
  gltf.scene.position.set(1, 0, 0.75);
  gltf.scene.scale.setScalar(0.25);
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  addPositionRotationGui(editorGui, gltf.scene, -5, 5, 0.01);
  crops.add(gltf.scene);
});
modelLoader.load("/models/Crops.glb", (gltf) => {
  let editorGui = gui.addFolder("Crops 3");
  gltf.scene.position.set(1, 0, 1);
  gltf.scene.scale.setScalar(0.25);
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  addPositionRotationGui(editorGui, gltf.scene, -5, 5, 0.01);
  crops.add(gltf.scene);
});
modelLoader.load("/models/Crops.glb", (gltf) => {
  let editorGui = gui.addFolder("Crops 4");
  gltf.scene.position.set(1, 0, 1.25);
  gltf.scene.scale.setScalar(0.25);
  gltf.scene.traverse(function (child) {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  addPositionRotationGui(editorGui, gltf.scene, -5, 5, 0.01);
  crops.add(gltf.scene);
});
scene.add(crops);
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 10;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI / 3;
controls.minPolarAngle = Math.PI / 3;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//Objects

//shadows

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
/**
 * Animate
 */
const timer = new Timer();
updateAllMaterials();
const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
