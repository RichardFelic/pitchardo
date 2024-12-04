import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export function NavigationControls({ onPrevious, onNext, canGoPrevious, canGoNext }: NavigationControlsProps) {
  return (
    <div className="md:hidden flex justify-center gap-4 p-6 border-t border-blue-100 bg-gradient-to-b from-transparent to-blue-50/30">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-blue-600 bg-white border border-blue-200 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-blue-200 shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Anterior
      </button>
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-500 disabled:hover:to-indigo-600 shadow-sm"
      >
        Siguiente
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}