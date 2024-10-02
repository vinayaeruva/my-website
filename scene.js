import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Lensflare, LensflareElement } from "three/addons/objects/Lensflare.js";

const widthChecker = (below, above) => {
  return window.innerWidth < 1000 ? below : above;
};

// Constants
const MAX_ROTATION = Math.PI / 10;
const ROTATION_SPEED = 1;

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(0.9);
document.body.appendChild(renderer.domElement);

// Lights
const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 5.5);
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 5.0);

directionalLight1.position.set(1, 0, 0);
directionalLight2.position.set(-1, -1, 0);

scene.add(ambientLight, directionalLight1, directionalLight2);

// Lensflare
const light = new THREE.PointLight(0xffffff, 1, 1);
light.position.set(0, widthChecker(0.02, 0.2), 0);
scene.add(light);

const textureLoader = new THREE.TextureLoader();
const textureFlare0 = textureLoader.load(
  "./public/lens-texture/lensflare4k.webp"
);
const modelAoMap = textureLoader.load("./public/textures/AO.png");

const lensflare = new Lensflare();
lensflare.addElement(new LensflareElement(textureFlare0, window.innerWidth, 1));
light.add(lensflare);

// Model loading
const loader = new GLTFLoader();
let rayoModel;

loader.load(
  "/public/rayo.glb",
  (gltf) => {
    gltf.scene.traverse((child) => {
      if (child.isMesh && child.material.isMeshStandardMaterial) {
        child.material.aoMap = modelAoMap;
        if (child.material.aoMap) {
          child.material.aoMapIntensity = 0.0;
        }

        child.material.emissive = new THREE.Color(0xffffff);
        child.material.emissiveIntensity = child.material.emissiveMap
          ? 1.0
          : 2.5;

        child.material.transparent = true;
        child.material.opacity = 0.85;
      }
    });

    rayoModel = gltf.scene;
    rayoModel.scale.set(
      widthChecker(0.5, 1),
      widthChecker(0.5, 1),
      widthChecker(0.5, 1)
    );
    rayoModel.position.set(3, 1, 0);
    scene.add(rayoModel);
  },
  undefined,
  (error) => console.error("Error when loading model:", error)
);

// Camera setup
camera.position.z = 2;

// Mouse movement
const mouse = new THREE.Vector2();
const targetRotation = new THREE.Vector2();
const currentRotation = new THREE.Vector2();

function onDocumentMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  targetRotation.x = mouse.x * MAX_ROTATION;
  targetRotation.y = mouse.y * MAX_ROTATION;
}

document.addEventListener("mousemove", onDocumentMouseMove);

// Animation
const clock = new THREE.Clock();

let positionTarget = new THREE.Vector3(0, widthChecker(-0.1, -0.3), 0);
let rotationTarget = Math.PI * 2; // 360 derece dönecek
let hasRotated = false; // Bir kez döndü mü kontrolü

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  if (rayoModel) {
    // If the model has not rotated once and reached the target, rotate
    if (!hasRotated && rayoModel.rotation.y < rotationTarget) {
      rayoModel.position.lerp(positionTarget, 0.01); // Hedefe doğru ilerleme
      rayoModel.rotation.y += 0.02;

      //Did it reach the target angle?
      if (rayoModel.rotation.y >= rotationTarget) {
        hasRotated = true; //Save once rotated
      }
    }

    if (hasRotated) {
      currentRotation.x +=
        (targetRotation.x - currentRotation.x) * ROTATION_SPEED * delta;
      currentRotation.y +=
        (targetRotation.y - currentRotation.y) * ROTATION_SPEED * delta;

      currentRotation.x = THREE.MathUtils.clamp(
        currentRotation.x,
        -MAX_ROTATION,
        MAX_ROTATION
      );
      currentRotation.y = THREE.MathUtils.clamp(
        currentRotation.y,
        -MAX_ROTATION,
        MAX_ROTATION
      );

      rayoModel.rotation.set(
        -currentRotation.y,
        currentRotation.x,
        rayoModel.rotation.z
      );
    }
  }

  renderer.render(scene, camera);
}
animate();

const updateLensflareScale = () => {
  const lensflareElement = lensflare;
  lensflareElement.scale.set(window.innerWidth, window.innerHeight);
};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  updateLensflareScale();
}

updateLensflareScale();

window.addEventListener("resize", onWindowResize);

import { displayCompanyInfo } from './main.js';

// Call the function to display the text when the page loads
window.onload = function() {
    displayCompanyInfo();
};




