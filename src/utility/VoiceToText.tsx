
import React, { useEffect, useRef, useState } from "react";
import "./VoiceToText.scss";

const VoiceToText = (): JSX.Element => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Ready to start");

  const recognitionRef = useRef<any>(null);
  const shouldListenRef = useRef(false);
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const retryCountRef = useRef(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser.");
      setStatus("Not supported");
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
          finalText += event.results[i][0].transcript.trim() + " ";
        }
      }

      if (finalText) {
        setText((previous) =>
          previous
            ? previous + " " + finalText.trim()
            : finalText.trim()
        );

        // Successful recognition resets the retry delay.
        retryCountRef.current = 0;
        setError("");
        setStatus("Listening...");
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);

      if (!shouldListenRef.current) return;

      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        shouldListenRef.current = false;
        setIsListening(false);
        setStatus("Permission denied");
        setError(
          "Speech recognition access was denied. Check browser permissions and restart."
        );
        return;
      }

      if (event.error === "audio-capture") {
        shouldListenRef.current = false;
        setIsListening(false);
        setStatus("Microphone unavailable");
        setError("Check your microphone connection and Windows settings.");
        return;
      }

      if (event.error === "network") {
        setError(
          "Speech service connection interrupted. Automatically reconnecting..."
        );
        setStatus("Reconnecting...");
      } else if (event.error === "no-speech") {
        setStatus("Waiting for speech...");
      } else if (event.error !== "aborted") {
        setError(
          `Recognition error: ${event.error}. Attempting to reconnect...`
        );
      }

      // onend will handle restarting after recoverable errors.
    };

    recognition.onend = () => {
      if (!mountedRef.current || !shouldListenRef.current) {
        return;
      }

      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
      }

      retryCountRef.current += 1;

      // Retry quickly at first, then back off to 10 seconds.
      const delay = Math.min(
        1000 * Math.pow(2, retryCountRef.current - 1),
        10000
      );

      setStatus("Reconnecting...");

      restartTimerRef.current = setTimeout(() => {
        if (
          !mountedRef.current ||
          !shouldListenRef.current
        ) {
          return;
        }

        try {
          recognition.start();
          setIsListening(true);
        } catch (err) {
          // If start fails, schedule another attempt.
          console.warn("Recognition restart failed:", err);

          if (shouldListenRef.current) {
            recognition.onend?.();
          }
        }
      }, delay);
    };

    recognitionRef.current = recognition;

    return () => {
      mountedRef.current = false;
      shouldListenRef.current = false;

      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
      }

      recognition.onend = null;
      recognition.onresult = null;
      recognition.onerror = null;

      try {
        recognition.abort();
      } catch {
        // Ignore cleanup errors.
      }

      recognitionRef.current = null;
    };
  }, []);

  const startListening = () => {
    if (!recognitionRef.current || shouldListenRef.current) {
      return;
    }

    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }

    shouldListenRef.current = true;
    retryCountRef.current = 0;

    setError("");
    setStatus("Starting...");
    setIsListening(true);

    try {
      recognitionRef.current.start();
      setStatus("Listening...");
    } catch (err) {
      shouldListenRef.current = false;
      setIsListening(false);
      setStatus("Unable to start");
      setError("Could not start recognition. Please try again.");
      console.error(err);
    }
  };

  const stopListening = () => {
    shouldListenRef.current = false;

    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }

    try {
      recognitionRef.current?.stop();
    } catch (err) {
      console.warn("Stop error:", err);
    }

    setIsListening(false);
    setStatus("Stopped");
    setError("");
  };

  const clearText = () => {
    setText("");
  };

  return (
    <div className="voice-to-text">
      <h3>🎤 Voice to Text</h3>

      <div className="voice-status">
        <span
          className={`status-dot ${isListening ? "active" : ""}`}
        />
        <span>{status}</span>
      </div>

      {error && (
        <div className="voice-error" role="alert">
          {error}
        </div>
      )}

      <div className="voice-buttons">
        <button
          className="start-button"
          onClick={startListening}
          disabled={isListening}
        >
          🎙️ Start
        </button>

        <button
          className="stop-button"
          onClick={stopListening}
          disabled={!isListening}
        >
          ⏹ Stop
        </button>

        <button className="clear-button" onClick={clearText}>
          🗑 Clear
        </button>
      </div>

      <textarea
        className="voice-textarea"
        value={text}
        readOnly
        rows={10}
        placeholder="Your speech will appear here..."
        aria-label="Recognized speech"
      />

      <div className="voice-footer">
        {text.trim() ? text.trim().split(/\s+/).length : 0} words
      </div>
    </div>
  );
};

export default VoiceToText;
