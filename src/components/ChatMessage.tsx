import  { useEffect, useState } from 'react';
import { Bot, Volume2, VolumeX, Mic, Maximize2 } from 'lucide-react';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { type ChatMessage as ChatMessageType } from '../types/chat';
import { ImageModal } from './ImageModal';
import { images } from '../assets/images';

interface ChatMessageProps {
  message: ChatMessageType;
  isTyping?: boolean;
  isListening?: boolean;
  isCurrent?: boolean;
  onSpeakingChange?: (speaking: boolean) => void;
}

export function ChatMessage({ 
  message,
  isTyping, 
  isListening, 
  isCurrent, 
  onSpeakingChange 
}: ChatMessageProps) {
  const { speak, stop, speaking } = useSpeechSynthesis();
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (message.type === 'bot' && isCurrent && message.content && !isTyping && !isListening) {
      speak(message.content);
    }
    return () => stop();
  }, [message, isCurrent, isTyping, isListening, speak, stop]);

  useEffect(() => {
    onSpeakingChange?.(speaking);
  }, [speaking, onSpeakingChange]);

  const toggleSpeech = () => {
    if (speaking) {
      stop();
    } else {
      speak(message.content);
    }
  };

  const renderImage = (image: ChatMessageType['images'][0], index: number) => {
    if (!image.base64 && !image.src) return null;
    
    const imgSrc = image.type === 'base64' ? `data:image/jpeg;base64,${image.base64}` : image.src;
    const isQR = image.alt.toLowerCase().includes('qr');
    const isProfile = image.alt.toLowerCase().includes('richard') || image.alt.toLowerCase().includes('profile');
    
    return (
      <div 
        key={index} 
        className={`relative group ${
          isQR ? 'w-32 h-32' : 
          isProfile ? 'w-48 h-48' : 
          'w-full max-w-md h-64'
        }`}
      >
        <img
          src={imgSrc}
          alt={image.alt}
          className={`
            rounded-xl shadow-lg transition-all duration-300 cursor-pointer
            ${isQR ? 'w-32 h-32 object-cover' : 
              isProfile ? 'w-48 h-48 object-cover' : 
              'w-full h-64 object-cover'
            }
            group-hover:scale-[1.02] group-hover:shadow-xl
          `}
          onClick={() => setSelectedImage({ src: imgSrc, alt: image.alt })}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-end justify-between p-4">
          <p className="text-white text-sm font-medium truncate flex-1 mr-2">{image.alt}</p>
          <button
            onClick={() => setSelectedImage({ src: imgSrc, alt: image.alt })}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all"
          >
            <Maximize2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={`flex gap-4 ${message.type === 'bot' ? '' : 'flex-row-reverse'} animate-fadeIn`}>
        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md transition-transform hover:scale-105 ${
          message.type === 'bot' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-blue-500 to-indigo-600'
        }`}>
          {message.type === 'bot' ? (
            <Bot className="w-6 h-6 text-white" />
          ) : (
            <img 
              src={`data:image/jpeg;base64,${images.profile.richard}`} 
              alt="Richard Feliciano" 
              className="rounded-2xl w-full h-full object-cover"
            />
          )}
        </div>
        <div className={`max-w-[85%] rounded-2xl p-5 shadow-md transition-all duration-200 ${
          message.type === 'bot' 
            ? 'bg-white border border-blue-100 rounded-tl-none' 
            : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-tr-none'
        }`}>
          {isTyping ? (
            <div className="flex gap-2 py-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          ) : isListening ? (
            <div className="flex items-center gap-3 py-2">
              <Mic className="w-5 h-5 animate-pulse text-blue-500" />
              <span className="text-blue-600 font-medium">Escuchando...</span>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <p className="text-base flex-1 leading-relaxed whitespace-pre-line">{message.content}</p>
                {message.type === 'bot' && (
                  <button
                    onClick={toggleSpeech}
                    className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${speaking ? 'text-blue-500' : 'text-gray-400'}`}
                  >
                    {speaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                )}
              </div>
              {message.images && message.images.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-2 justify-center">
                  {message.images.map((image, index) => renderImage(image, index))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          src={selectedImage.src}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}