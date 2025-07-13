
import "./MainResponsiveLayout.scss";
import { useEffect, useState } from "react";
import QuestionUI from './../components/QuestionUI';

const MainResponsiveLayout = () => {
  const [isLogReading, setIsLogReading] = useState(false);
  const [showUSA, setUSA] = useState(true);
  const [showNSE, setShowNSE] = useState(false);

  return (
    <div className="application-level">
      <div className="main-container">
        <QuestionUI/>
      </div>
    </div>
  );
};

export default MainResponsiveLayout;