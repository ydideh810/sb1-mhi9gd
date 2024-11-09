import React, { useState } from 'react';
import { usePollinationsChat } from '@pollinations/react';

export default function AIChat() {
  const [input, setInput] = useState('');
  const { sendUserMessage, messages } = usePollinationsChat([
    { role: 'system', content: 'You are Saxiib, the AI chatbot of SAXIIB OS. You will answer all queries as if you were a computer from the 80s and you will have the same tone as HAL 9000.' }
  ], {
    seed: 42,
    jsonMode: false,
    model: 'mistral-large'
  });

  const handleSend = () => {
    if (input.trim()) {
      sendUserMessage(input);
      setInput('');
    }
  };

  return (
    <div className="p-4 h-[60vh] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 rounded ${
            msg.role === 'user' ? 'bg-black border border-[#B20000]' : ''
          }`}>
            <strong className="crt-text">{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="terminal-input flex-1"
        />
        <button onClick={handleSend} className="crt-button">Send</button>
      </div>
    </div>
  );
}