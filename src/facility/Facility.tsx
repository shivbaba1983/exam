import React from 'react';
//import ImageSlider from './../components/ImageSlider'
//import QuestionUI from './../components/QuestionUI';
import CopyRenameImages from './../components/RenameImages';
import ImageOCRApp from './../components/ImageOCRApp';
import FolderOCRApp from './../components/FolderOCRApp';
import QuestionForm from './../components/QuestionForm';
import  FileDiffViewer  from './../filedifference/FileDiffViewer';
const Facility = ({ }) => {

    return (<div>
        <p> This facility page</p>

        <h1 className="title">Gallery</h1>
        {/* <ImageSlider /> */}
        {/* <QuestionUI/> */}
        <CopyRenameImages/>
        <ImageOCRApp/>
        <FolderOCRApp/>
           <FileDiffViewer/>
          <QuestionForm />
       
    </div>)
}

export default Facility;