import React from 'react';
import SectionedGallery from './../components/SectionedGallery';
import TextFileViewer from './../components/TextFileViewer';
const Dashboard = ({ }) => {

    return (<div>
        <p> Welcome, This Dashboard page</p>
        <SectionedGallery/>
        <TextFileViewer/>
    </div>)
}

export default Dashboard;