import React from 'react';
import CopyRenameImages from './../components/RenameImages';
import ImageOCRApp from './../components/ImageOCRApp';
import FolderOCRApp from './../components/FolderOCRApp';
import FileDiffViewer from './../filedifference/FileDiffViewer';
import './Facility.scss'; // Add this for styling

const Facility = () => {
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
      </section>
      
      <section className="facility-section">
        <h2 className="section-title">Copy & Rename Images</h2>
        <CopyRenameImages />
      </section>
    </div>
  );
};

export default Facility;
