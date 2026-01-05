import React from 'react';
import CopyRenameImages from '../components/RenameImages';
import ImageOCRApp from '../components/ImageOCRApp';
import FolderOCRApp from '../components/FolderOCRApp';
import FileDiffViewer from '../filedifference/FileDiffViewer';
import FileDiffViewerReducer from '../filedifference/FileDiffViewerReducer';

import SectionedGallery from './../components/SectionedGallery';
import ReactReducerLearn from './../reducer-learning/ReactReducerLearn';
import SumTwoNumber from '@/reducer-learning/SumTwoNumber';
import VoiceToText from './VoiceToText';
import VoiceRecorderSaveLocal from './VoiceRecorderSaveLocal';
import VoiceRecorderWithTranscription from './VoiceRecorderWithTranscription';
import TextToSpeech from './TextToSpeech';

import './Utility.scss';

const Utility = () => {
  return (
    <div className="facility-page">
      <h1 className="page-title">Facility Page</h1>

        <VoiceToText />
        <TextToSpeech />

        <VoiceRecorderSaveLocal />
        <VoiceRecorderWithTranscription />
      <section className="facility-section">
        <h2 className="section-title">Image OCR</h2>
        <ImageOCRApp />
      </section>

      <section className="facility-section">
        <h2 className="section-title">Folder OCR</h2>
        <FolderOCRApp />
      </section>

      <section className="facility-section">
        <h2 className="section-title">File Difference Viewer</h2>
        <FileDiffViewer />
        <h2 className="section-title">File Difference Viewer using React Reducer</h2>
        <FileDiffViewerReducer />
      </section>

      <section className="facility-section">
        <h2 className="section-title">Copy & Rename Images</h2>
        <CopyRenameImages />
      </section>

      {/* ✅ Newly added components */}
      {/* <section className="facility-section">
        <h2 className="section-title">Reducer & Utilities</h2>

        <ReactReducerLearn />
        <SumTwoNumber />
        <SectionedGallery />


      </section> */}
    </div>
  );
};

export default Utility;
