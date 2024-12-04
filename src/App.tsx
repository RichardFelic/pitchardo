import { useState } from 'react';
import { ChatContainer } from './components/ChatContainer';
import { SocialLinks } from './components/SocialLinks';
import { BotCharacter } from './components/BotCharacter';
import { VoiceControls } from './components/VoiceControls';

function App() {
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm p-8 text-center border-b border-blue-100">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
          Pitchardo AI
        </h1>
        <p className="mt-3 text-gray-600 text-lg">
          Tu asistente personal para destacar en tus presentaciones.
        </p>
      </header>

      <main className="flex-1 container mx-auto max-w-4xl p-4 flex items-center">
        <div className="w-full h-[calc(100vh-12rem)] bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl flex flex-col overflow-hidden border border-blue-100">
          <ChatContainer onBotSpeaking={setIsBotSpeaking} />
          <SocialLinks />
        </div>
      </main>

      <BotCharacter isSpeaking={isBotSpeaking} />
      <VoiceControls />
    </div>
  );
}

export default App;