import React, { useEffect, useRef, useState } from "react";

const VoiceToText = (): JSX.Element => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let finalText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalText += event.results[i][0].transcript + " ";
        }
      }

      if (finalText) {
        setText((prev) => prev + finalText);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = (): void => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = (): void => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const clearText = (): void => {
    setText("");
  };

  return (
    <div style={{ padding: "16px", maxWidth: "600px" , backgroundColor:"green"}}>
      <h3>🎤 Voice to Text</h3>

      <div style={{ marginBottom: "12px" }}>
        <button onClick={startListening} disabled={isListening}>
          Start
        </button>
        <button onClick={stopListening} disabled={!isListening}>
          Stop
        </button>
        <button onClick={clearText}>
          Clear
        </button>
      </div>

      <textarea
        value={text}
        readOnly
        rows={8}
        style={{ width: "100%" }}
        placeholder="Your speech will appear here..."
      />
    </div>
  );
};

export default VoiceToText;
