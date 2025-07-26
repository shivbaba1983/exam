
import "./MainResponsiveLayout.scss";
import QuestionMaster from '../components/QuestionUI/QuestionMaster';
const MainResponsiveLayout = () => {
  return (
    <div className="application-level">
      <div className="main-container">
        <QuestionMaster/>
      </div>
    </div>
  );
};

export default MainResponsiveLayout;