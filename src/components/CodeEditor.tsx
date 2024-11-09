import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Download, Upload, Play, FileCode2 } from 'lucide-react';

interface Language {
  id: string;
  name: string;
  extension: string;
}

const SUPPORTED_LANGUAGES: Language[] = [
  { id: 'javascript', name: 'JavaScript', extension: '.js' },
  { id: 'typescript', name: 'TypeScript', extension: '.ts' },
  { id: 'c', name: 'C', extension: '.c' },
  { id: 'cpp', name: 'C++', extension: '.cpp' },
  { id: 'go', name: 'Go', extension: '.go' },
  { id: 'rust', name: 'Rust', extension: '.rs' },
  { id: 'html', name: 'HTML', extension: '.html' },
  { id: 'css', name: 'CSS', extension: '.css' },
  { id: 'json', name: 'JSON', extension: '.json' },
  { id: 'python', name: 'Python', extension: '.py' },
  { id: 'sql', name: 'SQL', extension: '.sql' },
  { id: 'markdown', name: 'Markdown', extension: '.md' },
];

const DEFAULT_CODE_SAMPLES = {
  javascript: `// SYSTEM READY
// INITIALIZING CODE EDITOR v1.0
// COPYRIGHT (C) 1970

function main() {
  console.log("SYSTEM INITIALIZED");
  
  // YOUR CODE HERE
  const message = "HELLO, WORLD";
  console.log(message);
  
  return 0;
}

main();`,
  typescript: `// TypeScript Code Sample
interface SystemMessage {
  text: string;
  timestamp: number;
}

function logMessage(msg: SystemMessage): void {
  console.log(\`[\${new Date(msg.timestamp).toISOString()}] \${msg.text}\`);
}

const message: SystemMessage = {
  text: "SYSTEM INITIALIZED",
  timestamp: Date.now()
};

logMessage(message);`,
  c: `/* C Programming Language
 * SYSTEM INTERFACE v1.0
 * COPYRIGHT (C) 1970
 */

#include <stdio.h>

#define MAX_BUFFER 1024
#define SYSTEM_VERSION "1.0"

int main(void) {
    printf("SYSTEM READY\\n");
    printf("VERSION %s\\n", SYSTEM_VERSION);
    
    // Your code here
    char message[] = "HELLO, WORLD";
    printf("%s\\n", message);
    
    return 0;
}`,
  cpp: `/* C++ Programming Language
 * ADVANCED SYSTEM INTERFACE v1.0
 * COPYRIGHT (C) 1970
 */

#include <iostream>
#include <string>
#include <vector>

class SystemInterface {
private:
    std::string version;
    bool initialized;

public:
    SystemInterface() : version("1.0"), initialized(false) {}

    void initialize() {
        std::cout << "SYSTEM READY" << std::endl;
        std::cout << "VERSION " << version << std::endl;
        initialized = true;
    }

    void displayMessage(const std::string& msg) {
        if (!initialized) {
            std::cerr << "ERROR: SYSTEM NOT INITIALIZED" << std::endl;
            return;
        }
        std::cout << msg << std::endl;
    }
};

int main() {
    SystemInterface sys;
    sys.initialize();
    sys.displayMessage("HELLO, WORLD");
    return 0;
}`,
  go: `// Go Programming Language
// SYSTEM INTERFACE v1.0
// COPYRIGHT (C) 1970

package main

import (
    "fmt"
    "time"
)

type SystemStatus struct {
    Version   string
    StartTime time.Time
}

func (s *SystemStatus) Initialize() {
    fmt.Println("SYSTEM READY")
    fmt.Printf("VERSION %s\\n", s.Version)
    fmt.Printf("STARTUP TIME: %v\\n", s.StartTime.Format(time.RFC3339))
}

func main() {
    sys := &SystemStatus{
        Version:   "1.0",
        StartTime: time.Now(),
    }
    
    sys.Initialize()
    fmt.Println("HELLO, WORLD")
}`,
  rust: `// Rust Programming Language
// SYSTEM INTERFACE v1.0
// COPYRIGHT (C) 1970

#[derive(Debug)]
struct SystemStatus {
    version: String,
    initialized: bool,
}

impl SystemStatus {
    fn new() -> Self {
        SystemStatus {
            version: String::from("1.0"),
            initialized: false,
        }
    }

    fn initialize(&mut self) {
        println!("SYSTEM READY");
        println!("VERSION {}", self.version);
        self.initialized = true;
    }

    fn display_message(&self, msg: &str) -> Result<(), &'static str> {
        if !self.initialized {
            return Err("ERROR: SYSTEM NOT INITIALIZED");
        }
        println!("{}", msg);
        Ok(())
    }
}

fn main() {
    let mut system = SystemStatus::new();
    system.initialize();
    
    match system.display_message("HELLO, WORLD") {
        Ok(_) => println!("MESSAGE DISPLAYED SUCCESSFULLY"),
        Err(e) => eprintln!("{}", e),
    }
}`
};

export default function CodeEditor() {
  const [language, setLanguage] = useState<string>('javascript');
  const [code, setCode] = useState<string>(DEFAULT_CODE_SAMPLES[language]);
  const [output, setOutput] = useState<string>('');

  useEffect(() => {
    setCode(DEFAULT_CODE_SAMPLES[language] || '// Start coding here...');
  }, [language]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleRun = async () => {
    if (language === 'javascript') {
      try {
        // Create a safe evaluation environment
        const safeEval = new Function('code', `
          try {
            const console = {
              log: (...args) => window._tempOutput.push(...args)
            };
            window._tempOutput = [];
            ${code};
            return window._tempOutput.join('\\n');
          } catch (error) {
            return 'ERROR: ' + error.message;
          } finally {
            delete window._tempOutput;
          }
        `);
        
        const result = safeEval(code);
        setOutput(result);
      } catch (error) {
        setOutput(`ERROR: ${error.message}`);
      }
    } else {
      setOutput(`SYSTEM ERROR: Cannot execute ${language} code in browser environment.
SUGGESTION: Export code and run in appropriate development environment.`);
    }
  };

  const handleExport = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const extension = SUPPORTED_LANGUAGES.find(lang => lang.id === language)?.extension || '.txt';
    a.href = url;
    a.download = `code${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="h-[calc(100vh-16rem)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <FileCode2 className="w-5 h-5" />
          <select
            value={language}
            onChange={handleLanguageChange}
            className="terminal-input bg-black text-[var(--terminal-red)]"
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex gap-2">
          <input
            type="file"
            id="import-code"
            className="hidden"
            onChange={handleImport}
            accept=".js,.ts,.jsx,.tsx,.py,.cpp,.c,.rs,.go"
          />
          <label
            htmlFor="import-code"
            className="terminal-button flex items-center gap-2 cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Import
          </label>
          <button
            onClick={handleExport}
            className="terminal-button flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={handleRun}
            className="terminal-button flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            Run
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-rows-2 gap-4">
        <div className="terminal-window min-h-[300px]">
          <Editor
            height="100%"
            language={language}
            value={code}
            onChange={(value) => setCode(value || '')}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontFamily: 'Courier New',
              lineNumbers: 'on',
              roundedSelection: false,
              padding: { top: 16, bottom: 16 },
              cursorStyle: 'line',
              cursorWidth: 2,
              tabSize: 2,
              wordWrap: 'on',
              renderLineHighlight: 'all',
            }}
          />
        </div>

        <div className="terminal-window overflow-auto">
          <div className="window-header">
            <span>OUTPUT CONSOLE</span>
          </div>
          <pre className="p-4 text-sm font-mono whitespace-pre-wrap">
            {output || 'Program output will appear here...'}
          </pre>
        </div>
      </div>
    </div>
  );
}