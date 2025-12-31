import React from 'react';
import SectionedGallery from './../components/SectionedGallery';
import ReactReducerLearn from './../reducer-learning/ReactReducerLearn';
import SumTwoNumber from '@/reducer-learning/SumTwoNumber';
import VoiceToText from './VoiceToText';
import VoiceRecorderSaveLocal from './VoiceRecorderSaveLocal';
import VoiceRecorderWithTranscription from './VoiceRecorderWithTranscription';
const Learn = ({ }) => {
    return (<div>
        <p> Welcome, This Learn page</p>       
        <ReactReducerLearn/>
        <SumTwoNumber/>
         <SectionedGallery />
         <VoiceToText/>
         <VoiceRecorderSaveLocal/>
         <VoiceRecorderWithTranscription/>
    </div>)
}

export default Learn;