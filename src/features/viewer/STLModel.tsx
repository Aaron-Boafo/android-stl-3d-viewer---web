import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Edges } from '@react-three/drei';

interface STLModelProps {
  geometry: THREE.BufferGeometry;
  wireframe?: boolean;
  showEdges?: boolean;
  color?: string;
  opacity?: number;
  transparent?: boolean;
}

export const STLModel: React.FC<STLModelProps> = ({
  geometry,
  wireframe = false,
  showEdges = false,
  color = '#86efac',
  opacity = 1,
  transparent = false,
}) => {
  const material = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: new THREE.Color(color),
      wireframe: wireframe,
      transparent: transparent || opacity < 1,
      opacity: opacity,
      side: THREE.DoubleSide,
      flatShading: true,
    });
  }, [color, wireframe, transparent, opacity]);

  return (
    <group>
      <mesh geometry={geometry} material={material}>
        {showEdges && !wireframe && (
          <Edges
            threshold={15}
            color={new THREE.Color(color).multiplyScalar(0.5)}
          />
        )}
      </mesh>
    </group>
  );
};
