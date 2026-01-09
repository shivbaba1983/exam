import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IS_AWS_API, LOCAL_URL } from "./../constant/ExamConstant";
import "./VoiceToTextWithAI.scss";

const VoiceToTextWithAI = (): JSX.Element => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [aiResponse, setAIResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

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

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = (): void => {
    recognitionRef.current?.start();
    setIsListening(true);
  };

  const stopListening = (): void => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const clearText = (): void => {
    setText("");
    setAIResponse(null);
  };

  const reviewEssayWithAI = async (): Promise<void> => {
    if (!text.trim()) return;

    setLoading(true);
    setAIResponse(null);

    try {
      let res: any;

      if (IS_AWS_API) {
        res = await axios.post(
          "https://07tps3arid.execute-api.us-east-1.amazonaws.com/welcome/review-essay",
          { text },
          { headers: { "Content-Type": "application/json" } }
        );

        const data =
          typeof res.data.body === "string"
            ? JSON.parse(res.data.body)
            : res.data.body;

        setAIResponse(data);
      } else {
        res = await axios.post(`${LOCAL_URL}/api/review-essay`, { text });
        setAIResponse(res?.data);
      }
    } catch (err) {
      console.error("AI review error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="voice-ai-container">
      <h3>🎤 Voice to Text + AI Essay Review</h3>

      <div className="controls">
        <button onClick={startListening} disabled={isListening}>
          Start
        </button>
        <button onClick={stopListening} disabled={!isListening}>
          Stop
        </button>
        <button onClick={clearText}>Clear</button>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        placeholder="Speak or paste/type your essay here..."
      />

      <button
        className="review-btn"
        onClick={reviewEssayWithAI}
        disabled={loading || !text.trim()}
      >
        {loading ? "Reviewing..." : "Review Essay with AI"}
      </button>

      {aiResponse && (
        <div className="ai-response">
          <h4>Corrected Essay</h4>
          <textarea
            value={aiResponse.correctedEssay}
            readOnly
            rows={6}
          />

          <h4>Rating</h4>
          <p>{aiResponse.rating} / 10</p>

          {aiResponse.issues?.length > 0 && (
            <>
              <h4>Issues</h4>
              <ul>
                {aiResponse.issues.map((i: string, idx: number) => (
                  <li key={idx}>{i}</li>
                ))}
              </ul>
            </>
          )}

          {aiResponse.suggestions?.length > 0 && (
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
