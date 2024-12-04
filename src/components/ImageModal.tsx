import { useEffect } from 'react';
import { X, Download } from 'lucide-react';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export function ImageModal({ src, alt, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `${alt.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button
            onClick={handleDownload}
            className="p-1.5 rounded-lg bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm transition-all hover:scale-105"
            title="Descargar imagen"
          >
            <Download className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm transition-all hover:scale-105"
            title="Cerrar"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        
        <div className="w-full h-[60vh] flex items-center justify-center p-4">
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}