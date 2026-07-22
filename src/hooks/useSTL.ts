import { useState, useCallback } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { ModelStats, calculateArea, calculateVolume } from '../utils/stlUtils';

const DB_NAME = 'stl-pro-files';
const STORE_NAME = 'files';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE_NAME);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function saveFileToIDB(name: string, data: ArrayBuffer) {
  const db = await openDB();
  db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).put(data, name);
}

async function getFileFromIDB(name: string): Promise<ArrayBuffer | null> {
  const db = await openDB();
  return new Promise((resolve) => {
    const req = db.transaction(STORE_NAME).objectStore(STORE_NAME).get(name);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () => resolve(null);
  });
}

async function deleteFileFromIDB(name: string) {
  const db = await openDB();
  db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME).delete(name);
}

export const useSTL = () => {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [stats, setStats] = useState<ModelStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseSTL = useCallback(async (name: string, arrayBuffer: ArrayBuffer) => {
    const loader = new STLLoader();
    const geom = loader.parse(arrayBuffer);

    geom.computeBoundingBox();
    geom.computeVertexNormals();

    const bbox = geom.boundingBox!;
    const dimensions = new THREE.Vector3();
    bbox.getSize(dimensions);

    const newStats: ModelStats = {
      name,
      size: arrayBuffer.byteLength,
      triangles: geom.attributes.position.count / 3,
      vertices: geom.attributes.position.count,
      dimensions: { x: dimensions.x, y: dimensions.y, z: dimensions.z },
      volume: calculateVolume(geom),
      area: calculateArea(geom),
      lastOpened: Date.now(),
    };

    setGeometry(geom);
    setStats(newStats);
    saveToRecent(newStats);
  }, []);

  const loadSTL = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      await saveFileToIDB(file.name, arrayBuffer);
      await parseSTL(file.name, arrayBuffer);
    } catch (err) {
      console.error('Error parsing STL:', err);
      setError('Failed to parse STL file. It might be corrupted or in an unsupported format.');
    } finally {
      setLoading(false);
    }
  }, [parseSTL]);

  const loadRecent = useCallback(async (name: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getFileFromIDB(name);
      if (!data) {
        setError('File not found in storage. It may have been cleared.');
        setLoading(false);
        return;
      }
      await parseSTL(name, data);
    } catch (err) {
      console.error('Error loading recent file:', err);
      setError('Failed to load file from storage.');
    } finally {
      setLoading(false);
    }
  }, [parseSTL]);

  const saveToRecent = (stats: ModelStats) => {
    const recent = JSON.parse(localStorage.getItem('recent_files') || '[]');
    const filtered = recent.filter((r: ModelStats) => r.name !== stats.name);
    const updated = [stats, ...filtered].slice(0, 10);
    localStorage.setItem('recent_files', JSON.stringify(updated));
  };

  const clearModel = useCallback(() => {
    setGeometry(null);
    setStats(null);
  }, []);

  const removeRecent = useCallback(async (name: string) => {
    await deleteFileFromIDB(name);
    const recent = JSON.parse(localStorage.getItem('recent_files') || '[]');
    const updated = recent.filter((r: ModelStats) => r.name !== name);
    localStorage.setItem('recent_files', JSON.stringify(updated));
    setStats((prev) => (prev?.name === name ? null : prev));
    setGeometry((prev) => {
      if (stats?.name === name) return null;
      return prev;
    });
  }, [stats]);

  const clearAllRecent = useCallback(async () => {
    const recent = JSON.parse(localStorage.getItem('recent_files') || '[]') as ModelStats[];
    for (const r of recent) {
      await deleteFileFromIDB(r.name);
    }
    localStorage.removeItem('recent_files');
    setGeometry(null);
    setStats(null);
  }, []);

  return { geometry, stats, loading, error, loadSTL, loadRecent, removeRecent, clearAllRecent, clearModel };
};
