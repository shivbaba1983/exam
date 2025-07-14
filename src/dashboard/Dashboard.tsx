import React from 'react';
import SectionedGallery from './../components/SectionedGallery';
import TextFileViewer from './../components/TextFileViewer';
import QuestionUI from './../components/QuestionUI/QuestionUI';
import TestQuestionUI from './../components/QuestionUI/TestQuestionUI';

const Dashboard = ({ }) => {

    return (<div>
        <p> Welcome, This Dashboard page</p>
             <QuestionUI/>
             {/* <TestQuestionUI/>  */}
       {/* <SectionedGallery/> */}
        {/* <TextFileViewer/> */}
   
    </div>)
}

export default Dashboard;