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

import Home from "./components/Pages/Home";
import Profile from "./components/Pages/Profile Page/Profile";
import ChangePassword from "./components/Pages/Profile Page/ChangePassword";
import Quiz from "./components/Pages/Quiz Page/Quiz";
import Programs from "./components/Pages/Programs/Programs";
import Forum from "./components/Pages/Forum";
import Meetings from "./components/Pages/Meeting Page/Meetings";
import MeetingsAbout from "./components/Pages/Meeting Page/MeetingsAbout";
import MeetingsAdvisorsList from "./components/Pages/Meeting Page/MeetingsAdvisorsList";
import Statistics from "./components/Pages/Statistics";
import QuizContainer from "./components/Pages/Quiz Page/QuizContainer";
import VideosList from "./components/Pages/Videos Page/VideosList";

function App() {
  return (
    <Router>
      <Navbar />
      <AuthVerify />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/quiz" component={Quiz} />
        <PrivateRoute exact path="/quiz/started" component={QuizContainer} />
        <PrivateRoute exact path="/programs/:section" component={Programs} />
        <Redirect exact from="/programs" to="/programs/overview" />
        <PrivateRoute exact path="/videos/:specialty" component={VideosList} />
        <Redirect exact from="/videos" to="/videos/se" />
        <PrivateRoute exact path="/meetings" component={Meetings} />
        <PrivateRoute
          exact
          path="/meetings/advisors"
          component={MeetingsAdvisorsList}
        />
        <PrivateRoute exact path="/meetings/about" component={MeetingsAbout} />
        <PrivateRoute exact path="/forum" component={Forum} />
        <AdminRoute exact path="/statistics" component={Statistics} />
        <Route exact path="/login" component={LogInForm} />
        <Route exact path="/signup" component={SignUpForm} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute
          exact
          path="/profile/password"
          component={ChangePassword}
        />
      </Switch>
    </Router>
  );
}

export default App;
