import { useCallback, useEffect, useState, useRef } from 'react';

interface SpeechSettings {
  rate: number;
  pitch: number;
  voiceURI?: string;
}

// Pre-load settings from localStorage
const loadSettings = (): SpeechSettings => {
  try {
    const saved = localStorage.getItem('speech-settings');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading speech settings:', error);
  }
  return {
    rate: 1.2,
    pitch: 1,
  };
};

export function useSpeechSynthesis() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [settings, setSettings] = useState<SpeechSettings>(loadSettings());
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Initialize voices immediately
  useEffect(() => {
    const synth = window.speechSynthesis;
    
    const initVoices = () => {
      const availableVoices = synth.getVoices();
      const spanishVoices = availableVoices.filter(
        voice => voice.lang.startsWith('es') || voice.name.includes('Spanish')
      );
      
      const voicesList = spanishVoices.length ? spanishVoices : availableVoices;
      setVoices(voicesList);

      // Pre-select voice and store it
      if (settings.voiceURI) {
        selectedVoiceRef.current = voicesList.find(v => v.voiceURI === settings.voiceURI) || null;
      } else if (spanishVoices.length) {
        selectedVoiceRef.current = spanishVoices[0];
        const newSettings = { ...settings, voiceURI: spanishVoices[0].voiceURI };
        setSettings(newSettings);
        localStorage.setItem('speech-settings', JSON.stringify(newSettings));
      }
    };

    initVoices();
    synth.onvoiceschanged = initVoices;

    // Pre-create utterance
    utteranceRef.current = new SpeechSynthesisUtterance();
    utteranceRef.current.rate = settings.rate;
    utteranceRef.current.pitch = settings.pitch;
    utteranceRef.current.onstart = () => setSpeaking(true);
    utteranceRef.current.onend = () => setSpeaking(false);
    utteranceRef.current.onerror = () => setSpeaking(false);

    return () => {
      synth.onvoiceschanged = null;
      if (utteranceRef.current) {
        utteranceRef.current.onstart = null;
        utteranceRef.current.onend = null;
        utteranceRef.current.onerror = null;
      }
    };
  }, [settings]);

  const setVoice = useCallback((voiceURI: string) => {
    const voice = voices.find(v => v.voiceURI === voiceURI);
    if (voice) {
      selectedVoiceRef.current = voice;
      const newSettings = { ...settings, voiceURI };
      setSettings(newSettings);
      localStorage.setItem('speech-settings', JSON.stringify(newSettings));
      
      if (utteranceRef.current) {
        utteranceRef.current.voice = voice;
      }
    }
  }, [voices, settings]);

  const setRate = useCallback((rate: number) => {
    const newSettings = { ...settings, rate };
    setSettings(newSettings);
    localStorage.setItem('speech-settings', JSON.stringify(newSettings));
    
    if (utteranceRef.current) {
      utteranceRef.current.rate = rate;
    }
  }, [settings]);

  const setPitch = useCallback((pitch: number) => {
    const newSettings = { ...settings, pitch };
    setSettings(newSettings);
    localStorage.setItem('speech-settings', JSON.stringify(newSettings));
    
    if (utteranceRef.current) {
      utteranceRef.current.pitch = pitch;
    }
  }, [settings]);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis || !utteranceRef.current) return;

    window.speechSynthesis.cancel();
    
    utteranceRef.current.text = text;
    utteranceRef.current.voice = selectedVoiceRef.current;
    
    // Chunk the text for better performance with longer messages
    const chunks = text.match(/[^.!?]+[.!?]+/g) || [text];
    
    const speakChunk = (index = 0) => {
      if (index >= chunks.length) return;
      
      if (utteranceRef.current) {
        utteranceRef.current.text = chunks[index].trim();
        utteranceRef.current.onend = () => {
          if (index < chunks.length - 1) {
            speakChunk(index + 1);
          } else {
            setSpeaking(false);
          }
        };
        window.speechSynthesis.speak(utteranceRef.current);
      }
    };

    speakChunk();
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  return { 
    speak, 
    stop, 
    speaking, 
    voices,
    settings,
    setVoice,
    setRate,
    setPitch
  };
}