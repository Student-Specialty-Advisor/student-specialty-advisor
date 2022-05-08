import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import PrivateRoute from "./components/Auth/PrivateRoute";
import AdminRoute from "./components/Auth/AdminRoute";
import AuthVerify from "./components/Auth/AuthVerify";

import Navbar from "./components/Navbar/Navbar";
import LogInForm from "./components/Forms/LogInForm";
import SignUpForm from "./components/Forms/SignUpForm";

import Home from "./components/Pages/Home Page/Home";
import Profile from "./components/Pages/Profile Page/Profile";
import ChangePassword from "./components/Pages/Profile Page/ChangePassword";
import Quiz from "./components/Pages/Quiz Page/Quiz";
import Programs from "./components/Pages/Programs/Programs";
import Forum from "./components/Pages/Forum Page/Forum";
import MeetingsAbout from "./components/Pages/Meeting Page/MeetingsAbout";
import MeetingsAdvisorsList from "./components/Pages/Meeting Page/MeetingsAdvisorsList";
import MeetingsRequest from "./components/Pages/Meeting Page/Meetings Schedule/MeetingsRequest";
import MeetingsRequestMobile from "./components/Pages/Meeting Page/Meetings Schedule/MeetingsRequestMobile";
import QuizContainer from "./components/Pages/Quiz Page/QuizContainer";
import VideosList from "./components/Pages/Videos Page/VideosList";
import Dashboard from "./components/Pages/Dashboard Page/Dashboard";
import ChatBotFloating from "./components/Chat Bot/ChatBotFloating";
import ChatBotStatic from "./components/Chat Bot/ChatBotStatic";
import NoMatch from "./components/Pages/NoMatch";
import MeetingBottomNavbar from "./components/Pages/Meeting Page/MeetingBottomNavbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import VerifyAccount from "./components/VerifyAccount";
import Thread from "./components/Pages/Forum Page/Thread";

function App() {
  const isMobile = useMediaQuery("(max-width:1080px)", { noSsr: true });
  return (
    <Router>
      <Navbar />
      <AuthVerify />
      {!isMobile && <ChatBotFloating />}
      <PrivateRoute
        path={[
          "/meetings/about",
          "/meetings/advisors",
          "/meetings/schedule/mobile",
        ]}
        component={MeetingBottomNavbar}
      />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/verify/:id" component={VerifyAccount} />
        <AdminRoute exact path="/dashboard/:parameter" component={Dashboard} />
        <Redirect exact from="/dashboard" to="/dashboard/statistics" />
        <PrivateRoute exact path="/quiz" component={Quiz} />
        <PrivateRoute exact path="/quiz/started" component={QuizContainer} />
        <PrivateRoute
          exact
          path="/programs/:specialty/:section/"
          component={Programs}
        />
        <Redirect exact from="/programs/se" to="/programs/se/overview" />
        <Redirect exact from="/programs/cse" to="/programs/cse/overview" />
        <Redirect exact from="/programs/re" to="/programs/re/overview" />
        <Redirect exact from="/programs/*" to="/programs/se/overview" />
        <PrivateRoute exact path="/videos/:specialty" component={VideosList} />
        <Redirect exact from="/videos" to="/videos/se" />
        <PrivateRoute
          exact
          path="/meetings/schedule"
          component={MeetingsRequest}
        />
        <PrivateRoute
          exact
          path="/meetings/schedule/mobile"
          component={MeetingsRequestMobile}
        />
        <PrivateRoute
          exact
          path="/meetings/advisors"
          component={MeetingsAdvisorsList}
        />
        <PrivateRoute exact path="/meetings/about" component={MeetingsAbout} />
        <Redirect exact from="/meetings" to="/meetings/about" />
        <PrivateRoute exact path="/forum" component={Forum} />
        <PrivateRoute exact path="/forum/threads/:thread" component={Thread} />
        <Redirect exact from="/forum/threads" to="/forum" />
        <Route exact path="/assistance" component={ChatBotStatic} />
        <Route exact path="/login" component={LogInForm} />
        <Route exact path="/signup" component={SignUpForm} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute
          exact
          path="/profile/password"
          component={ChangePassword}
        />
        <Route exact path="*" component={NoMatch} />
      </Switch>
    </Router>
  );
}

export default App;
