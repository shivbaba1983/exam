
import "./MainResponsiveLayout.scss";
import { useEffect, useState } from "react";
import QuestionForm from './../components/QuestionForm';
const MainResponsiveLayout = () => {
  const [isLogReading, setIsLogReading] = useState(false);
  const [showUSA, setUSA] = useState(true);
  const [showNSE, setShowNSE] = useState(false);

  return (
    <div className="application-level">
      <div className="main-container">
        <QuestionForm />
      </div>
    </div>
  );
};

export default MainResponsiveLayout;