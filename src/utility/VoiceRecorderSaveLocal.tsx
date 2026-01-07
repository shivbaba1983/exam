import React, { useRef, useState } from "react";

const VoiceRecorderSaveLocal = ()=> {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState<boolean>(false);

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

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunksRef.current, {
        type: mediaRecorder.mimeType || "audio/webm"
      });

      saveAudioToDevice(audioBlob);
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
    a.download = `voice-recording-${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: "16px",  backgroundColor:"pink"}}>
      <h3>🎙️ Record & Save Audio</h3>

      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>

      <button onClick={stopRecording} disabled={!recording} style={{ marginLeft: "8px" }}>
        Stop & Save
      </button>

      <p style={{ marginTop: "12px", fontSize: "14px" }}>
        {recording ? "Recording..." : "Press Start to record audio"}
      </p>
    </div>
  );
};

export default VoiceRecorderSaveLocal;
