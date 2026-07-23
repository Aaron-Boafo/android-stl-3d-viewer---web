import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { 
  FileUp, 
  History, 
  Settings as SettingsIcon, 
  Maximize, 
  Box, 
  Grid3X3, 
  Compass, 
  Camera, 
  Share2, 
  Info,
  Trash2,
  Menu,
  X,
  Layers,
  Eye,
  Zap
} from 'lucide-react';
import { useSTL } from './hooks/useSTL';
import { Viewer } from './features/viewer/Viewer';
import { ModelStats, formatBytes } from './utils/stlUtils';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Home: React.FC = () => {
  const { geometry, stats, loading, error, loadSTL, loadRecent, clearAllRecent, clearModel } = useSTL();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recentFiles, setRecentFiles] = useState<ModelStats[]>([]);
  const [showStats, setShowStats] = useState(false);
  
  const [settings, setSettings] = useState({
    wireframe: false,
    showEdges: true,
    showGrid: true,
    showAxes: true,
    orthographic: false,
    backgroundColor: '#0a0a0a',
    modelColor: '#86efac',
    intensity: 1,
  });

  useEffect(() => {
    const saved = localStorage.getItem('recent_files');
    if (saved) setRecentFiles(JSON.parse(saved));
  }, [stats]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) loadSTL(file);
  };

  const handleTakeScreenshot = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `stl-screenshot-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const handleShare = async () => {
     const canvas = document.querySelector('canvas');
     if (canvas && navigator.share) {
       canvas.toBlob(async (blob) => {
         if (blob) {
           const file = new File([blob], 'model-preview.png', { type: 'image/png' });
           try {
             await navigator.share({
               title: '3D Model Preview',
               text: `Check out this 3D model: ${stats?.name || 'STL Model'}`,
               files: [file],
             });
           } catch (err) {
             console.error('Error sharing:', err);
           }
         }
       });
     }
  };

  return (
    <div className="flex h-screen w-screen bg-[#0a0a0a] text-zinc-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-80 bg-zinc-900 border-r border-zinc-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
            <h1 className="text-xl font-bold flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-black">
                <Box size={20} />
              </div>
              STL Pro
            </h1>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-zinc-800 rounded-full">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Action Buttons */}
            <div className="space-y-2">
              <label className="flex items-center gap-3 w-full p-4 bg-green-600 hover:bg-green-700 text-black font-semibold rounded-2xl cursor-pointer transition-colors shadow-lg shadow-green-900/20">
                <FileUp size={20} />
                Open STL File
                <input type="file" accept=".stl" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>

            {/* Recent Files */}
            <div>
              <div className="flex items-center justify-between mb-3 px-2">
                <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                  <History size={14} />
                  Recent Files
                </h2>
                <button 
                  onClick={() => clearAllRecent()}
                  className="text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1"
                >
                  <Trash2 size={12} />
                  Clear
                </button>
              </div>
              <div className="space-y-1">
                {recentFiles.length > 0 ? recentFiles.map((file, i) => (
                  <button 
                    key={i}
                    className="w-full text-left p-3 rounded-xl hover:bg-zinc-800 transition-colors group flex items-center gap-3"
                    onClick={() => loadRecent(file.name)}
                  >
                    <div className="w-10 h-10 bg-zinc-800 group-hover:bg-zinc-700 rounded-lg flex items-center justify-center text-zinc-500 transition-colors">
                      <Box size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{file.name}</div>
                      <div className="text-xs text-zinc-500">{formatBytes(file.size)}</div>
                    </div>
                  </button>
                )) : (
                  <div className="text-sm text-zinc-600 px-2 italic py-4">No recent files</div>
                )}
              </div>
            </div>

            {/* Settings */}
            <div>
              <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2 flex items-center gap-2">
                <SettingsIcon size={14} />
                Display Settings
              </h2>
              <div className="space-y-2 bg-zinc-800/50 p-4 rounded-2xl border border-zinc-800">
                <Toggle 
                  label="Wireframe" 
                  checked={settings.wireframe} 
                  onChange={v => setSettings({...settings, wireframe: v})} 
                  icon={<Layers size={16} />}
                />
                <Toggle 
                  label="Show Edges" 
                  checked={settings.showEdges} 
                  onChange={v => setSettings({...settings, showEdges: v})} 
                  icon={<Eye size={16} />}
                />
                <Toggle 
                  label="Show Grid" 
                  checked={settings.showGrid} 
                  onChange={v => setSettings({...settings, showGrid: v})} 
                  icon={<Grid3X3 size={16} />}
                />
                <Toggle 
                  label="Show Axes" 
                  checked={settings.showAxes} 
                  onChange={v => setSettings({...settings, showAxes: v})} 
                  icon={<Compass size={16} />}
                />
                <Toggle 
                  label="Orthographic" 
                  checked={settings.orthographic} 
                  onChange={v => setSettings({...settings, orthographic: v})} 
                  icon={<Box size={16} />}
                />
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-zinc-800">
            <div className="bg-zinc-800/50 p-3 rounded-xl flex items-center gap-3 text-xs text-zinc-400">
              <Zap size={14} className="text-yellow-500" />
              <span>GPU Accelerated Rendering Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Top Header */}
        <div className="absolute top-0 left-0 right-0 z-40 p-4 pointer-events-none flex justify-between items-center">
          <div className="pointer-events-auto flex gap-2">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-3 bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-800 shadow-xl"
            >
              <Menu size={20} />
            </button>
            {stats && (
              <div className="hidden sm:flex flex-col bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-zinc-800 shadow-xl">
                <div className="text-sm font-bold truncate max-w-[200px]">{stats.name}</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">{stats.triangles.toLocaleString()} Triangles</div>
              </div>
            )}
          </div>

          <div className="pointer-events-auto flex gap-2">
             <IconButton icon={<Info size={20} />} onClick={() => setShowStats(!showStats)} active={showStats} />
             <IconButton icon={<Camera size={20} />} onClick={handleTakeScreenshot} />
             {typeof navigator !== 'undefined' && 'share' in navigator && (
               <IconButton icon={<Share2 size={20} />} onClick={handleShare} />
             )}
             {geometry && <IconButton icon={<Maximize size={20} />} onClick={() => {}} title="Fit View" />}
          </div>
        </div>

        {/* 3D Viewport */}
        <div className="flex-1">
          {geometry ? (
            <Viewer geometry={geometry} settings={settings} />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
              <div className="w-32 h-32 bg-zinc-900 rounded-[2.5rem] flex items-center justify-center border border-zinc-800 shadow-2xl relative">
                <Box size={64} className="text-zinc-700" />
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-black shadow-lg">
                  <FileUp size={24} />
                </div>
              </div>
              <div className="max-w-md">
                <h2 className="text-2xl font-bold mb-2">No Model Selected</h2>
                <p className="text-zinc-500">Upload an STL file to start inspecting your 3D design in high resolution.</p>
              </div>
              <label className="px-8 py-4 bg-zinc-100 hover:bg-white text-black font-bold rounded-2xl cursor-pointer transition-all active:scale-95 shadow-xl">
                Choose File
                <input type="file" accept=".stl" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
          )}
        </div>

        {/* Model Info Overlay */}
        {showStats && stats && (
          <div className="absolute bottom-6 right-6 z-40 w-80 bg-zinc-900/90 backdrop-blur-lg border border-zinc-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg">Model Information</h3>
              <button onClick={() => setShowStats(false)} className="p-1 hover:bg-zinc-800 rounded-full">
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <StatItem label="File Size" value={formatBytes(stats.size)} />
              <StatItem label="Triangles" value={stats.triangles.toLocaleString()} />
              <StatItem label="Vertices" value={stats.vertices.toLocaleString()} />
              <StatItem label="Dimensions" value={`${stats.dimensions.x.toFixed(1)}x${stats.dimensions.y.toFixed(1)}x${stats.dimensions.z.toFixed(1)} mm`} />
              <StatItem label="Volume" value={`${(stats.volume / 1000).toFixed(2)} cm³`} />
              <StatItem label="Surface Area" value={`${(stats.area / 100).toFixed(2)} cm²`} />
            </div>
          </div>
        )}

        {/* Loading / Error Overlays */}
        {loading && (
          <div className="absolute inset-0 z-[60] bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4" />
            <div className="text-xl font-bold">Parsing STL Data...</div>
            <div className="text-zinc-500 mt-2 text-sm">Optimizing mesh for performance</div>
          </div>
        )}

        {error && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-red-900/90 backdrop-blur-md border border-red-800 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
             <div className="bg-red-800 p-2 rounded-xl"><Trash2 size={20} /></div>
             <div>
               <div className="font-bold text-sm">Error Loading File</div>
               <div className="text-xs text-red-200">{error}</div>
             </div>
             <button onClick={clearModel} className="ml-4 text-xs font-bold uppercase tracking-widest hover:underline">Dismiss</button>
          </div>
        )}

        {/* Footer Links */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-4 text-xs text-zinc-600">
          <Link to="/privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
          <span>·</span>
          <Link to="/terms" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app" replace />} />
      <Route path="/app" element={<Home />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
    </Routes>
  );
};

const Toggle: React.FC<{ label: string, checked: boolean, onChange: (v: boolean) => void, icon: React.ReactNode }> = ({ label, checked, onChange, icon }) => (
  <button 
    onClick={() => onChange(!checked)}
    className={cn(
      "w-full flex items-center justify-between p-3 rounded-xl transition-all",
      checked ? "bg-zinc-700/50 text-white" : "text-zinc-400 hover:bg-zinc-700/30"
    )}
  >
    <div className="flex items-center gap-3">
      <div className={cn("p-1.5 rounded-lg", checked ? "bg-green-500/20 text-green-400" : "bg-zinc-800 text-zinc-500")}>
        {icon}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </div>
    <div className={cn(
      "w-8 h-4 rounded-full relative transition-colors",
      checked ? "bg-green-500" : "bg-zinc-600"
    )}>
      <div className={cn(
        "absolute top-0.5 w-3 h-3 bg-white rounded-full transition-transform",
        checked ? "left-4" : "left-0.5"
      )} />
    </div>
  </button>
);

const IconButton: React.FC<{ icon: React.ReactNode, onClick: () => void, active?: boolean, title?: string }> = ({ icon, onClick, active, title }) => (
  <button 
    onClick={onClick}
    title={title}
    className={cn(
      "p-3 rounded-2xl backdrop-blur-md border shadow-xl transition-all active:scale-95",
      active 
        ? "bg-green-500 border-green-400 text-black" 
        : "bg-zinc-900/80 border-zinc-800 text-white hover:bg-zinc-800"
    )}
  >
    {icon}
  </button>
);

const StatItem: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div>
    <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-0.5">{label}</div>
    <div className="text-sm font-medium text-zinc-200">{value}</div>
  </div>
);

export default App;
