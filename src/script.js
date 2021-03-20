import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

//Loading
const textureloader = new THREE.TextureLoader();

const normaltexture = textureloader.load("./textures/NormalMap.png");

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Name h1
const name = document.getElementById("name")

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normaltexture;
material.color = new THREE.Color(0xff000000);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Light 1

const pointLight = new THREE.PointLight(0xffffff, 2);
scene.add(pointLight);
pointLight.position.set(0, 0.22, 4);

//Light 2

const pointLight2 = new THREE.PointLight(0xff0000ff, 2);
pointLight2.position.set(-1, 0.7, 0.3);
pointLight2.intensity = 6;
scene.add(pointLight2);

// const light2 = gui.addFolder("Light 2");

// light2.add(pointLight2.position, "y").min(-3).max(3).step(0.01);
// light2.add(pointLight2.position, "x").min(-3).max(3).step(0.01);
// light2.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
// light2.add(pointLight2, "intensity").min(0).max(10).step(0.01);

//Light 3

const pointLight3 = new THREE.PointLight(0xff0000, 2);
pointLight3.position.set(0.73, -0.59, 0.07);
pointLight3.intensity = 10;
scene.add(pointLight3);

// const light3 = gui.addFolder("Light 3");

// light3.add(pointLight3.position, "y").min(-3).max(3).step(0.01);
// light3.add(pointLight3.position, "x").min(-3).max(3).step(0.01);
// light3.add(pointLight3.position, "z").min(-3).max(3).step(0.01);
// light3.add(pointLight3, "intensity").min(0).max(10).step(0.01);

// const light3Color = {
//   color: 0xffffff,
// };

// light3.addColor(light3Color, "color").onChange(() => {
//   pointLight3.color.set(light3Color.color);
// });

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
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
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate

let mousex = 0;
let mousey = 0;

let targetx = 0;
let targety = 0;

const windowY = window.innerHeight / 2;
const windowX = window.innerWidth / 2;

const onDocumentMouseMove = (event) => {
  mousex = event.clientX - windowX;
  mousey = event.clientY - windowY;
};

document.addEventListener("mousemove", onDocumentMouseMove);

const updateSphere = (event) => {
  sphere.position.y = window.scrollY * 0.0001
  sphere.position.z  =window.scrollY * 0.0005
};

const updateName = (event) => {
  name.style.fontSize = `${(-window.scrollY + 700) * .01}rem`
}

window.addEventListener("scroll", updateSphere);
window.addEventListener("scroll", updateName);

const clock = new THREE.Clock();

const tick = () => {
  targetx = mousex * 0.001;
  targety = mousey * 0.001;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  sphere.rotation.y += 0.5 * (targetx - sphere.rotation.y);
  sphere.rotation.x += 0.05 * (targety - sphere.rotation.x);
  sphere.position.z += -0.05 * (targety - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
