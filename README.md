# Project Overview

This project uses GSAP and Three.js to create engaging and dynamic animations for a landing page. The project includes custom text animations, easing effects, and interactive 3D model with lensflare effect.

## Technologies and Libraries

- **GSAP (GreenSock Animation Platform):** Used for animating HTML elements and text with smooth transitions and custom easing.
- **Three.js:** Used for rendering and animating 3D models, lighting effects, and creating a lensflare effect.

# Main Animation Sequence (main.js)

This file contains the main animation sequence for the website, utilizing GSAP (GreenSock Animation Platform) for smooth and complex animations.

## Features

### GSAP Setup

- Uses GSAP's SplitText and CustomEase plugins for advanced text animations and custom easing.
- Creates a custom ease for smoother animations.

```javascript
gsap.registerPlugin(SplitText, CustomEase);

const tl = gsap.timeline({
  defaults: {
    ease: CustomEase.create("custom", "0.77, 0, 0.175, 1"),
    duration: 1,
  },
});
```

#### Text Splitting

- Splits three headline elements into individual characters for granular animation control.

```javascript
const splitOne = new SplitText(".headline-1", { type: "chars" });
const splitTwo = new SplitText(".headline-2", { type: "chars" });
const splitThree = new SplitText(".headline-3", { type: "chars" });
```

#### Animation Sequence

The animation timeline includes the following sequence:

1.  **Loader Screen Animation**

    - Animates the loader screen out of view.

2.  **Header Animation**

    - Slides the header into view from the top.

3.  **Headline Text Animation**

    - Animates each character of the three headlines into view with a staggered effect.

4.  **Button Animation**

    - Fades in and scales the "Explore Catalog" button.

5.  **Arrow Circle Animation**

    - Animates the arrow circle into view with a diagonal movement.

6.  **Paragraph Animation**

    - Slides the landing paragraph into view from the left.

7.  **Separator Animation**

    - Scales the separator line horizontally into view.

8.  **Label Line Animation**

    - Scales the label line horizontally into view.

9.  **Certifications Animation**

    - Fades in and slides the certification elements from the left.

10. **Scroll Indicator Animation** - Fades in and slides up the scroll-down indicator text and image.

```javascript
tl.fromTo(
  ".loader-screen",
  { clipPath: "inset(0 0 0% 0)" },
  { clipPath: "inset(0 0 100% 0)", delay: 1 }
)
  .from(".header", { y: "-100%" }, "-=0.25")
  .from(
    [splitOne.chars, splitTwo.chars, splitThree.chars],
    {
      duration: 0.5,
      y: 150,
      opacity: 0,
      stagger: 0.03,
    },
    "-=0.20"
  )
  // ... (additional animations)
  .from(
    ".scroll-down-indicator img",
    {
      y: 20,
      opacity: 0,
    },
    "<"
  );
```

#### Technical Details

- Uses GSAP's timeline for sequencing animations.
- Employs various GSAP methods like `fromTo`, `from`, and `to` for different animation effects.
- Utilizes GSAP's position parameters (like `"-=0.25"` and `"<"`) for precise timing control.
- Implements staggered animations for text and multiple elements.

This animation sequence creates a dynamic and engaging entry experience for the website, with elements smoothly animating into view in a choreographed manner.

# 3D Scene with Three.js

This project creates an interactive 3D scene using Three.js, featuring a custom 3D model with dynamic lighting and camera effects.

## Features

### Scene Setup

- Utilizes Three.js for 3D rendering
- Implements a responsive design that adapts to different screen sizes
- Uses a perspective camera with a 75° field of view

```javascript
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
```

#### Lighting

- Ambient light for overall scene illumination
- Two directional lights for dynamic shading
- Point light with lens flare effect for added realism

```javascript
const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 5.5);
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 5.0);

directionalLight1.position.set(1, 0, 0);
directionalLight2.position.set(-1, -1, 0);

scene.add(ambientLight, directionalLight1, directionalLight2);
```

#### 3D Model

- Loads a custom GLB model ("rayo.glb")
- Applies custom material properties:

  - Ambient Occlusion (AO) mapping
  - Emissive materials for glow effects
  - Transparency for a unique visual style

  ```javascript
  loader.load(
    "/public/rayo.glb",
    (gltf) => {
      gltf.scene.traverse((child) => {
        if (child.isMesh && child.material.isMeshStandardMaterial) {
          child.material.aoMap = modelAoMap;
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
  ```

#### Interactivity

- Responds to mouse movements, rotating the 3D model
- Implements smooth rotation with easing functions
- Initial animation that rotates the model 360 degrees on load

```javascript
function onDocumentMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  targetRotation.x = mouse.x * MAX_ROTATION;
  targetRotation.y = mouse.y * MAX_ROTATION;
}

document.addEventListener("mousemove", onDocumentMouseMove);
```

#### Special Effects

- Lens flare effect using a custom texture
- Dynamic scaling of lens flare based on window size

```javascript
const light = new THREE.PointLight(0xffffff, 1, 1);
light.position.set(0, widthChecker(0.02, 0.2), 0);
scene.add(light);

const textureLoader = new THREE.TextureLoader();
const textureFlare0 = textureLoader.load(
  "./public/lens-texture/lensflare4k.webp"
);

const lensflare = new Lensflare();
lensflare.addElement(new LensflareElement(textureFlare0, window.innerWidth, 1));
light.add(lensflare);
```

#### Performance Optimization

- Sets a specific pixel ratio for rendering
- Implements efficient animation loop using requestAnimationFrame

#### Responsiveness

- Adapts model scale and positioning based on screen width
- Resizes camera and renderer on window resize events

```javascript
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  updateLensflareScale();
}

window.addEventListener("resize", onWindowResize);
```

#### Technical Details

- Uses GLTFLoader for loading 3D models
- Implements custom shaders and material properties
- Utilizes Three.js math utilities for smooth animations
- Employs Vector2 and Vector3 for precise positioning and rotation calculations

#### Animations

- The project includes a main animation sequence:

  - Initial 360-degree rotation of the 3D model
  - Continuous subtle rotation based on mouse movement
  - Smooth transitions between rotation states

```javascript
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  if (rayoModel) {
    if (!hasRotated && rayoModel.rotation.y < rotationTarget) {
      rayoModel.position.lerp(positionTarget, 0.01);
      rayoModel.rotation.y += 0.02;

      if (rayoModel.rotation.y >= rotationTarget) {
        hasRotated = true;
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
```

#### Responsive Design

- The code includes a `widthChecker` function to adjust various parameters based on screen size, ensuring a consistent experience across devices.

```javascript
const widthChecker = (below, above) => {
  return window.innerWidth < 1000 ? below : above;
};
```
