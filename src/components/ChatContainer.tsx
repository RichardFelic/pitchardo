import { useEffect, useRef, useState, useCallback } from 'react';
import { ChatMessage } from './ChatMessage';
import { NavigationControls } from './NavigationControls';
import { chatScript } from '../data/chatScript';
import { Keyboard } from 'lucide-react';

interface ChatContainerProps {
  onBotSpeaking: (speaking: boolean) => void;
}

export function ChatContainer({ onBotSpeaking }: ChatContainerProps) {
  const [messages, setMessages] = useState<typeof chatScript>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      const { scrollHeight, clientHeight } = containerRef.current;
      containerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex < chatScript.length && !isTyping) {
      if (isListening) {
        setIsListening(false);
        setIsTyping(true);
        onBotSpeaking(false);
        
        setTimeout(() => {
          setMessages(prev => [...prev, chatScript[currentIndex]]);
          setIsTyping(false);
          setCurrentIndex(prev => prev + 1);
          
          if (currentIndex + 1 < chatScript.length && chatScript[currentIndex + 1].type === 'user') {
            setIsListening(true);
            onBotSpeaking(true);
          }
        }, 1000);
      } else {
        if (chatScript[currentIndex].type === 'user') {
          setIsListening(true);
          onBotSpeaking(true);
        } else {
          setIsTyping(true);
          setTimeout(() => {
            setMessages(prev => [...prev, chatScript[currentIndex]]);
            setIsTyping(false);
            setCurrentIndex(prev => prev + 1);
          }, 1000);
        }
      }
    }
  }, [currentIndex, isTyping, isListening, onBotSpeaking]);

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0 && !isTyping) {
      setIsListening(false);
      onBotSpeaking(false);
      setCurrentIndex(prev => prev - 1);
      setMessages(prev => prev.slice(0, -1));
    }
  }, [currentIndex, isTyping, onBotSpeaking]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      } else if (event.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrevious]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  return (
    <>
      <div 
        ref={containerRef} 
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent hover:scrollbar-thumb-blue-300"
      >
        <div className="hidden md:flex items-center justify-center gap-2 py-2 text-xs text-gray-400">
          <Keyboard className="w-3 h-3" />
          <span> Use las flechas ← → del teclado para navegar</span>
        </div>

        <div className="flex flex-col space-y-4">
          {messages.map((message, index) => (
            <ChatMessage 
              key={index} 
              message={message}
              isCurrent={index === messages.length - 1}
              onSpeakingChange={message.type === 'bot' ? onBotSpeaking : undefined}
            />
          ))}
          {isTyping && (
            <ChatMessage 
              message={{ type: 'bot', content: '' }}
              isTyping 
              onSpeakingChange={onBotSpeaking}
            />
          )}
          {isListening && (
            <ChatMessage 
              message={{ type: 'bot', content: 'Escuchando...' }}
              isListening
              onSpeakingChange={onBotSpeaking}
            />
          )}
        </div>
      </div>
      <div className="md:hidden">
        <NavigationControls
          onPrevious={handlePrevious}
          onNext={handleNext}
          canGoPrevious={currentIndex > 0 && !isTyping}
          canGoNext={currentIndex < chatScript.length && !isTyping}
        />
      </div>
      {/* <div className="hidden md:block fixed bottom-4 right-4 text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
        Use las flechas ← → del teclado para navegar
      </div> */}
    </>
  );
}