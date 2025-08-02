import React from 'react';
import CopyRenameImages from '../components/RenameImages';
import ImageOCRApp from '../components/ImageOCRApp';
import FolderOCRApp from '../components/FolderOCRApp';
import FileDiffViewer from '../filedifference/FileDiffViewer';
import FileDiffViewerReducer from '../filedifference/FileDiffViewerReducer'
import './Utility.scss'; // Add this for styling

const Utility = () => {
  return (
    <div className="facility-page">
      <h1 className="page-title">Facility Page</h1>
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
        <h2 className="section-title">File Difference Viewer using Recat reducer</h2>
        <FileDiffViewerReducer />
      </section>

      <section className="facility-section">
        <h2 className="section-title">Copy & Rename Images</h2>
        <CopyRenameImages />
      </section>
    </div>
  );
};

export default Utility;
