
import "./MainResponsiveLayout.scss";
import { useEffect, useState } from "react";
import QuestionUIOld from './../components/QuestionUI';
import QuestionUI from './../components/QuestionUI/QuestionUI';
const MainResponsiveLayout = () => {
  const [isLogReading, setIsLogReading] = useState(false);
  const [showUSA, setUSA] = useState(true);
  const [showNSE, setShowNSE] = useState(false);

  return (
    <div className="application-level">
      <div className="main-container">
        {/* <QuestionUIOld/> */}
        <QuestionUI/>
      </div>
    </div>
  );
};

export default MainResponsiveLayout;