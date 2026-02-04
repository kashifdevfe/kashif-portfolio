import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                const name = mesh.name.toLowerCase();

                // Protect skin/hair/face from color changes
                const isBodyPart =
                  name.includes("head") ||
                  name.includes("body") ||
                  name.includes("hair") ||
                  name.includes("face") ||
                  name.includes("skin") ||
                  name.includes("eye") ||
                  name.includes("teeth");

                if (!isBodyPart) {
                  // Set shirt/top to black
                  if (name.includes("outfit_top") || name.includes("shirt") || name.includes("top")) {
                    (mesh.material as THREE.MeshStandardMaterial).color.set("#111111");
                    (mesh.material as THREE.MeshStandardMaterial).roughness = 0.8;
                  }
                  // Set pants/bottom to black
                  if (name.includes("outfit_bottom") || name.includes("pant") || name.includes("trouser") || name.includes("bottom")) {
                    (mesh.material as THREE.MeshStandardMaterial).color.set("#111111");
                    (mesh.material as THREE.MeshStandardMaterial).roughness = 0.8;
                  }
                  // Set shoes/footwear to black
                  if (name.includes("outfit_footwear") || name.includes("shoe")) {
                    (mesh.material as THREE.MeshStandardMaterial).color.set("#111111");
                    (mesh.material as THREE.MeshStandardMaterial).roughness = 0.8;
                  }
                }

                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
