import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo } from "react";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

const words = [
  [
    { text: "Explore", color: 0xffffff },
    { text: "o", color: 0xffffff },
    { text: "mundo", color: 0xffffff },
  ],
  [
    { text: "com", color: 0xffffff },
    { text: "Trippy", color: 0x2196f3 },
  ],
];

export default function FontText() {
  const font = useLoader(FontLoader, "/FreeSans_Bold.json"); // must be served from public/
  const textMeshes = useMemo(() => {
    const lineHeight = 1;
    const fullGroup = new THREE.Group();

    words.forEach((line, lineIndex) => {
      let offsetX = 0;
      const lineGroup = new THREE.Group();

      line.forEach(({ text, color }) => {
        const geometry = new TextGeometry(text, {
          font,
          size: 0.6,
          //   height: 0,
          curveSegments: 12,
          bevelEnabled: false,
        });
        geometry.computeBoundingBox();
        const width = geometry.boundingBox!.max.x - geometry.boundingBox!.min.x;

        const material = new THREE.MeshBasicMaterial({
          color,
          clippingPlanes: [],
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.z = 0.001;
        mesh.position.x = offsetX;
        mesh.position.z = -3;
        mesh.position.y = 1;
        lineGroup.add(mesh);

        offsetX += width + 0.2;
      });

      lineGroup.position.x = -offsetX / 2;
      lineGroup.position.y = -lineIndex * lineHeight + 0.5;
      fullGroup.add(lineGroup);
    });

    const totalHeight = (words.length - 1) * lineHeight;
    fullGroup.position.y = totalHeight / 2 + 2.8;

    return fullGroup;
  }, [font]);

  return <primitive object={textMeshes} />;
}
