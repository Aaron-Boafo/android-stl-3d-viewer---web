import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  OrthographicCamera,
  Grid,
  GizmoHelper,
  GizmoViewport,
  Bounds,
  Stage
} from '@react-three/drei';
import * as THREE from 'three';
import { STLModel } from './STLModel';

interface ViewerProps {
  geometry: THREE.BufferGeometry | null;
  settings: {
    wireframe: boolean;
    showEdges: boolean;
    showGrid: boolean;
    showAxes: boolean;
    orthographic: boolean;
    backgroundColor: string;
    modelColor: string;
    intensity: number;
  };
}

export const Viewer: React.FC<ViewerProps> = ({ geometry, settings }) => {
  const controlsRef = useRef<any>(null);

  return (
    <div className="w-full h-full relative" style={{ backgroundColor: settings.backgroundColor }}>
      <Canvas shadows gl={{ antialias: true, preserveDrawingBuffer: true }}>
        {settings.orthographic ? (
          <OrthographicCamera makeDefault position={[100, 100, 100]} zoom={50} />
        ) : (
          <PerspectiveCamera makeDefault position={[100, 100, 100]} fov={50} />
        )}

        <color attach="background" args={[settings.backgroundColor]} />
        <ambientLight intensity={settings.intensity / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={settings.intensity} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={settings.intensity / 2} />

        <Suspense fallback={null}>
          <Stage environment="city" intensity={settings.intensity}>
            <Bounds fit clip observe margin={1.2}>
              {geometry && (
                <STLModel 
                  geometry={geometry} 
                  wireframe={settings.wireframe}
                  showEdges={settings.showEdges}
                  color={settings.modelColor}
                />
              )}
            </Bounds>
          </Stage>
        </Suspense>

        <OrbitControls 
          ref={controlsRef}
          makeDefault 
          enableDamping 
          dampingFactor={0.05} 
          minDistance={1} 
          maxDistance={1000}
        />

        {settings.showGrid && (
          <Grid
            infiniteGrid
            fadeDistance={50}
            fadeStrength={5}
            cellSize={1}
            sectionSize={5}
            sectionColor="#444"
            cellColor="#222"
          />
        )}

        {settings.showAxes && (
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport axisColors={['#ef4444', '#22c55e', '#3b82f6']} labelColor="white" />
          </GizmoHelper>
        )}
      </Canvas>
    </div>
  );
};
