import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { NASDAQ_TOKEN, IS_AWS_API } from './../constant/ExamConstant';
const VoiceToTextWithAI = (): JSX.Element => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [aiResponse, setAIResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);

  // Speech recognition setup
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
    setAIResponse(null);
  };

  // Call AI review API
  const reviewEssayWithAI = async (): Promise<void> => {
    if (!text.trim()) return;

    setLoading(true);
    setAIResponse(null);

    try {
      let res
      if (IS_AWS_API)
        res = await axios.get(`${NASDAQ_TOKEN}/api/review-essay/${text}`);
      else
        res = await axios.get(`http://localhost:3000/api/review-essay/${text}`);

      setAIResponse(res?.data);
    } catch (err: any) {
      console.error("AI review error:", err);

    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ padding: "16px", maxWidth: "700px", backgroundColor: "#f0f8ff" }}>
      <h3>🎤 Voice to Text + AI Essay Review</h3>

      {/* Voice controls */}
      <div style={{ marginBottom: "12px" }}>
        <button onClick={startListening} disabled={isListening}>
          Start
        </button>
        <button onClick={stopListening} disabled={!isListening}>
          Stop
        </button>
        <button onClick={clearText}>Clear</button>
      </div>

      {/* Speech text */}
      <textarea
        value={text}
        readOnly
        rows={8}
        style={{ width: "100%", marginBottom: "12px" }}
        placeholder="Your speech will appear here..."
      />

      {/* AI review button */}
      <button
        onClick={reviewEssayWithAI}
        disabled={loading || !text.trim()}
        style={{ marginBottom: "16px" }}
      >
        {loading ? "Reviewing..." : "Review Essay with AI"}
      </button>

      {/* AI Response */}
      {aiResponse && (
        <div style={{ border: "1px solid #ccc", padding: "12px", borderRadius: "8px" }}>
          <h4>Corrected Essay</h4>
          <textarea
            value={aiResponse.correctedEssay}
            readOnly
            rows={6}
            style={{ width: "100%", marginBottom: "12px" }}
          />

          <h4>Rating</h4>
          <p>{aiResponse.rating} / 10</p>

          {aiResponse.issues && aiResponse.issues.length > 0 && (
            <>
              <h4>Issues</h4>
              <ul>
                {aiResponse.issues.map((i: string, idx: number) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </>
          )}

          {aiResponse.suggestions && aiResponse.suggestions.length > 0 && (
            <>
              <h4>Suggestions</h4>
              <ul>
                {aiResponse.suggestions.map((s: string, idx: number) => (
                  <li key={idx}>{s}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceToTextWithAI;
