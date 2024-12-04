import { Bot, Mic } from 'lucide-react';

interface BotCharacterProps {
  isSpeaking: boolean;
}

export function BotCharacter({ isSpeaking }: BotCharacterProps) {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className={`relative group ${isSpeaking ? 'animate-pulse' : ''}`}>
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110">
          {isSpeaking ? (
            <Mic className="w-10 h-10 text-white animate-pulse" />
          ) : (
            <Bot className="w-10 h-10 text-white" />
          )}
        </div>
        {isSpeaking && (
          <div className="absolute -top-2 -right-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse [animation-delay:0.4s]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}