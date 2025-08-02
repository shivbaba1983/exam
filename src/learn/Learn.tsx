import React from 'react';
import SectionedGallery from './../components/SectionedGallery';
import ReactReducerLearn from './../reducer-learning/ReactReducerLearn';
import SumTwoNumber from '@/reducer-learning/SumTwoNumber';

const Learn = ({ }) => {
    return (<div>
        <p> Welcome, This Learn page</p>       
        <ReactReducerLearn/>
        <SumTwoNumber/>
         <SectionedGallery />
    </div>)
}

export default Learn;