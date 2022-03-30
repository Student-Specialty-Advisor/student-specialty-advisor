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
import Meeting from "./components/Pages/Meeting Page/Meeting";
import About from "./components/Pages/Meeting Page/About";
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
<<<<<<< HEAD
        <PrivateRoute exact path="/programs" component={Programs} />
        <PrivateRoute
          exact
          path="/programs/:specialty"
          component={ProgramsDetails}
        />
        <PrivateRoute exact path="/videos" component={Videos} />
        <PrivateRoute exact path="/videos/:specialty" component={VideosList} />
        <PrivateRoute exact path="/meetings" component={Meeting} />
        <PrivateRoute exact path="/meetings/about" component={About} />
=======
        <PrivateRoute exact path="/programs/:section" component={Programs} />
        <Redirect exact from="/programs" to="/programs/overview" />
        <PrivateRoute exact path="/videos/:specialty" component={VideosList} />
        <Redirect exact from="/videos" to="/videos/se" />
        <PrivateRoute exact path="/meeting" component={Meeting} />
>>>>>>> 4be13666b7940322a6a12db9d7a50e8557a2e028
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
