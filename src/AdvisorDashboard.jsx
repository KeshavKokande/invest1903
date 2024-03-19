import "./App.scss";
import { useContext, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg"; 
import BaseLayout from "./layout/BaseLayout";
import ClBaseLayout from "./layout/ClBaseLayout";
import { Dashboard } from "./screens";
import Clientlist from "./components/dashboard/client/clientlist";
import Plans from "./components/dashboard/plans/plans";

import HomePage from "./components/PreLoginHomepage/HomePage" 
import Loginpage from './components/SignIn/Loginpage';

import Registerpage from "./components/SignIn/Registerpage";
import UserDetails from "./checking/UserDetails";
import AddPlan from "./components/dashboard/plans/AddPlan";

import AdNewPlans from "./components/dashboard/plans/AdNewPlans";

import ProfilePage from "./ClientScreens/Profilepage/Profilepage";
import DashboardClient from "./ClientScreens/DashBoard/Dashboard";
import LandingPage from "./ClientScreens/LandingPage/LandingPage";
import PlansCl from "./ClientScreens/Plans/PlansCl";
import AdvClView from "./ClientScreens/AdvisersClientView/AdvClView";
import AdvClProfile from "./ClientScreens/AdvisersClientView/AdvClProfile";
import PlanView from "./ClientScreens/Plans/PlanView";
import MultiStepForm from "./ClientScreens/FirstForm/MultiStepForm";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // adding dark-mode class if the dark mode is set on to the body tag
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <Router>
        <Routes>
          <Route path ="/" element= {<HomePage />}/>
          <Route path ="/login" element= {<Loginpage />}/>
          <Route path ="/register" element= {<Registerpage/>}/>
          <Route path="/clform" element={<MultiStepForm />} />
          <Route element={<BaseLayout />}>
            <Route path="/advisor_dashboard" element={<Dashboard />} />
            <Route path="/clientlist" element={<Clientlist/>} />
            <Route path="/plan" element={<AdNewPlans/>} />
            <Route path="/details" element={<UserDetails/>}/>
            <Route path="/addplan" element={<AddPlan />} />
          </Route>

          <Route element={<ClBaseLayout />}>
            <Route path="/cldash" element={<DashboardClient />} />
            <Route path="/advisor_id/:advisor_id" element={<AdvClProfile />} />
            <Route path="/plan_id/:plan_id" element={<PlanView />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/planscl" element={<PlansCl/>} />
            <Route path="/viewadvi" element={<AdvClView/>} /> 
            <Route path="/plan" element={<Plans/>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;