
import "./MainResponsiveLayout.scss";
import { useEffect, useState } from "react";
import QuestionForm from './../components/QuestionForm';
import CopyRenameImages from './../components/RenameImages';
const MainResponsiveLayout = () => {
  const [isLogReading, setIsLogReading] = useState(false);
  const [showUSA, setUSA] = useState(true);
  const [showNSE, setShowNSE] = useState(false);

  return (
    <div className="application-level">
      <div className="main-container">
        <QuestionForm />
        <CopyRenameImages/>
      </div>
    </div>
  );
};

export default MainResponsiveLayout;