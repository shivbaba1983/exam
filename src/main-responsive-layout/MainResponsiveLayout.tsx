import './MainResponsiveLayout.scss';
import QuestionMaster from '../components/QuestionUI/QuestionMaster';

import AI102 from '../data/qa.json';
import GenerativeAILeader from '../data/genai.json';
// import AWS from '../data/aws.json'; // future

interface Props {
  examName?: string;
}

const MainResponsiveLayout: React.FC<Props> = ({ examName }) => {

  const examDataMap: { [key: string]: any[] } = {
    'AI-102': AI102,
    'Generative-AI-Leader': GenerativeAILeader,
    // 'AWS': AWS
  };

  const questionsData =
    examName && examDataMap[examName]
      ? examDataMap[examName]
      : AI102; // default exam

  return (
    <div className="application-level">
      <div className="main-container">
        <QuestionMaster questionsData={questionsData} examName={examName}/>
      </div>
    </div>
  );
};

export default MainResponsiveLayout;
