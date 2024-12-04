import { useState, useEffect } from 'react';
import { Settings, X, Volume2 } from 'lucide-react';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

export function VoiceControls() {
  const { voices, settings, setVoice, setRate, speak } = useSpeechSynthesis();
  const [isOpen, setIsOpen] = useState(false);

  // Test voice when changed
  const handleVoiceChange = (voiceURI: string) => {
    setVoice(voiceURI);
    const voice = voices.find(v => v.voiceURI === voiceURI);
    if (voice) {
      speak('¡Hola! Esta es una prueba de voz.');
    }
  };

  // Close modal with Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button 
        onClick={() => setIsOpen(true)}
        className="w-12 h-12 bg-white/90 backdrop-blur rounded-xl shadow-lg flex items-center justify-center hover:bg-white transition-colors group"
        aria-label="Configuración de voz"
      >
        <Settings className="w-6 h-6 text-gray-600 group-hover:text-blue-500 transition-colors" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed bottom-20 right-4 bg-white rounded-2xl shadow-xl p-6 min-w-[320px] max-w-[90vw] animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Configuración de voz</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Cerrar configuración"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="voice" className="block text-sm font-medium text-gray-700 mb-2">
                  Seleccionar voz
                </label>
                <div className="relative">
                  <select
                    id="voice"
                    value={settings.voiceURI}
                    onChange={(e) => handleVoiceChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors appearance-none pr-10"
                  >
                    {voices.map((voice) => (
                      <option key={voice.voiceURI} value={voice.voiceURI}>
                        {voice.name}
                      </option>
                    ))}
                  </select>
                  <Volume2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div>
                <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-2">
                  Velocidad de la voz
                </label>
                <input
                  id="rate"
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>Lento</span>
                  <span className="font-medium text-blue-600">{settings.rate}x</span>
                  <span>Rápido</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500">
                  Presiona <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded">ESC</kbd> para cerrar
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}