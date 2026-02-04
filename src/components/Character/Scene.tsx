import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [character, setChar] = useState<THREE.Object3D | null>(null);
  useEffect(() => {
    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          failIfMajorPerformanceCaveat: false,
          preserveDrawingBuffer: false,
        });
      } catch (error) {
        console.error("Failed to create WebGL context:", error);
        return;
      }

      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;

      // Handle context loss
      const handleContextLost = (event: Event) => {
        event.preventDefault();
        console.warn("WebGL context lost");
      };

      const handleContextRestored = () => {
        console.log("WebGL context restored");
      };

      renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      loadCharacter().then((gltf) => {
        if (gltf) {
          const animations = setAnimations(gltf);
          hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          let character = gltf.scene;
          setChar(character);
          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          if (headBone) {
            const goggles = new THREE.Group();
            const frameMat = new THREE.MeshStandardMaterial({ color: "#111111", roughness: 0.5, metalness: 0.8 });
            const lensMat = new THREE.MeshPhysicalMaterial({
              color: "#4dff40",
              emissive: "#4dff40",
              emissiveIntensity: 0.2,
              roughness: 0,
              metalness: 0,
              transmission: 0.5,
              thickness: 0.5,
              transparent: true,
              opacity: 0.8
            });

            const leftEye = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.01, 32), frameMat);
            leftEye.rotation.x = Math.PI / 2;
            leftEye.position.set(-0.035, 0, 0);

            const leftLens = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.012, 32), lensMat);
            leftLens.rotation.x = Math.PI / 2;
            leftLens.position.set(-0.035, 0, 0.001);

            const rightEye = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.01, 32), frameMat);
            rightEye.rotation.x = Math.PI / 2;
            rightEye.position.set(0.035, 0, 0);

            const rightLens = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.012, 32), lensMat);
            rightLens.rotation.x = Math.PI / 2;
            rightLens.position.set(0.035, 0, 0.001);

            const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.005, 0.01), frameMat);

            goggles.add(leftEye, rightEye, leftLens, rightLens, bridge);

            // Approximate position for standard ReadyPlayerMe/Mixamo head
            goggles.position.set(0, 0.06, 0.08);
            goggles.scale.set(1.5, 1.5, 1.5);
            headBone.add(goggles);
          }
          screenLight = character.getObjectByName("screenlight") || null;
          progress.loaded().then(() => {
            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
          window.addEventListener("resize", () =>
            handleResize(renderer, camera, canvasDiv, character)
          );
        }
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", (event) => {
        onMouseMove(event);
      });
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      const animate = () => {
        requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        clearTimeout(debounce);

        // Remove context event listeners
        if (renderer?.domElement) {
          renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
          renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
        }

        scene.clear();
        renderer?.dispose();
        window.removeEventListener("resize", () =>
          handleResize(renderer, camera, canvasDiv, character!)
        );
        if (canvasDiv.current && renderer?.domElement) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        if (landingDiv) {
          document.removeEventListener("mousemove", onMouseMove);
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
