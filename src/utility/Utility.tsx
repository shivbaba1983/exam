import React from 'react';
import CopyRenameImages from '../components/RenameImages';
import ImageOCRApp from '../components/ImageOCRApp';
import FolderOCRApp from '../components/FolderOCRApp';
import FileDiffViewer from '../filedifference/FileDiffViewer';
import FileDiffViewerReducer from '../filedifference/FileDiffViewerReducer';

import VoiceToText from './VoiceToText';
import VoiceRecorderSaveLocal from './VoiceRecorderSaveLocal';
import VoiceRecorderWithTranscription from './VoiceRecorderWithTranscription';
import TextToSpeech from './TextToSpeech';

import './Utility.scss';

const Utility = () => {
  return (
    <div className="facility-page">
      <h1 className="page-title">Utility Dashboard</h1>

      <div className="dashboard-grid">
        {/* LEFT COLUMN – VOICE & AUDIO */}
        <div className="dashboard-column">
          <section className="facility-section">
            <h2 className="section-title">Speech Recognition (Voice → Text)</h2>
            <VoiceToText />
          </section>

          <section className="facility-section">
            <h2 className="section-title">Speech Synthesis (Text → Voice)</h2>
            <TextToSpeech />
          </section>

          <section className="facility-section">
            <h2 className="section-title">Audio Recorder (Save Locally)</h2>
            <VoiceRecorderSaveLocal />
          </section>

          <section className="facility-section">
            <h2 className="section-title">Audio Recorder with Live Transcription</h2>
            <VoiceRecorderWithTranscription />
          </section>
        </div>

        {/* RIGHT COLUMN – FILES & OCR */}
        <div className="dashboard-column">
          <section className="facility-section">
            <h2 className="section-title">Image OCR (Extract Text from Images)</h2>
            <ImageOCRApp />
          </section>

          <section className="facility-section">
            <h2 className="section-title">Folder OCR (Bulk Image Processing)</h2>
            <FolderOCRApp />
          </section>

          <section className="facility-section">
            <h2 className="section-title">File Difference Viewer</h2>
            <FileDiffViewer />
          </section>

          <section className="facility-section">
            <h2 className="section-title">File Difference Viewer (Reducer-based)</h2>
            <FileDiffViewerReducer />
          </section>

          <section className="facility-section">
            <h2 className="section-title">Bulk Copy & Rename Images</h2>
            <CopyRenameImages />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Utility;
