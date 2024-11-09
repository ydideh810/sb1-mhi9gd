import React, { useState } from 'react';
import { usePollinationsImage } from '@pollinations/react';

export default function ImageGen() {
  const [prompt, setPrompt] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('');
  
  const imageUrl = usePollinationsImage(currentPrompt, {
    width: 512,
    height: 512,
    seed: 42,
    model: 'sdxl',
    nologo: true,
    enhance: false
  });

  const handleGenerate = () => {
    if (prompt.trim()) {
      setCurrentPrompt(prompt);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          className="terminal-input flex-1"
        />
        <button onClick={handleGenerate} className="crt-button">Generate</button>
      </div>
      <div className="flex justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt="Generated" className="max-w-full h-auto border-2 border-[#B20000]" />
        ) : (
          <p className="crt-text">Enter a prompt and click Generate...</p>
        )}
      </div>
    </div>
  );
}