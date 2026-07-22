import * as THREE from 'three';

export interface ModelStats {
  name: string;
  size: number;
  triangles: number;
  vertices: number;
  dimensions: {
    x: number;
    y: number;
    z: number;
  };
  volume: number;
  area: number;
  lastOpened: number;
}

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const calculateVolume = (geometry: THREE.BufferGeometry) => {
  if (!geometry.index) {
    const position = geometry.attributes.position;
    const n = position.count;
    let volume = 0;
    const p1 = new THREE.Vector3();
    const p2 = new THREE.Vector3();
    const p3 = new THREE.Vector3();
    
    for (let i = 0; i < n; i += 3) {
      p1.fromBufferAttribute(position, i);
      p2.fromBufferAttribute(position, i + 1);
      p3.fromBufferAttribute(position, i + 2);
      volume += p1.dot(p2.cross(p3)) / 6.0;
    }
    return Math.abs(volume);
  }
  return 0; // Simplified for non-indexed geometry
};

export const calculateArea = (geometry: THREE.BufferGeometry) => {
  const position = geometry.attributes.position;
  const n = position.count;
  let area = 0;
  const p1 = new THREE.Vector3();
  const p2 = new THREE.Vector3();
  const p3 = new THREE.Vector3();
  const v1 = new THREE.Vector3();
  const v2 = new THREE.Vector3();
  
  for (let i = 0; i < n; i += 3) {
    p1.fromBufferAttribute(position, i);
    p2.fromBufferAttribute(position, i + 1);
    p3.fromBufferAttribute(position, i + 2);
    v1.subVectors(p2, p1);
    v2.subVectors(p3, p1);
    area += v1.cross(v2).length() * 0.5;
  }
  return area;
};
