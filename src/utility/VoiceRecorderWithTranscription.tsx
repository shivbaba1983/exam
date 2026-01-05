import React, { useRef, useState } from "react";

const VoiceRecorderWithTranscription = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>("");

  const startRecording = async (): Promise<void> => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (event: BlobEvent) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(chunksRef.current, {
        type: mediaRecorder.mimeType || "audio/webm"
      });

      saveAudioToDevice(audioBlob);
      await sendForTranscription(audioBlob);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = (): void => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const saveAudioToDevice = (blob: Blob): void => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `voice-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sendForTranscription = async (blob: Blob): Promise<void> => {
    setTranscript("Transcribing...");

    const formData = new FormData();
    formData.append("file", blob, "speech.webm");

    const response = await fetch("/api/transcribe", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setTranscript(data.text);
  };

  return (
    <div style={{ padding: "16px", maxWidth: "600px",  backgroundColor:"yellow"}}>
      <h3>🎙️ Record, Save & Transcribe</h3>

      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>

      <button
        onClick={stopRecording}
        disabled={!recording}
        style={{ marginLeft: "8px" }}
      >
        Stop
      </button>

      <div style={{ marginTop: "16px" }}>
        <strong>Transcript:</strong>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default VoiceRecorderWithTranscription;
