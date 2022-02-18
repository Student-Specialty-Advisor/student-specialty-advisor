import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Pages/Home";
import Videos from "./components/Pages/Videos";
import LogInForm from "./components/Forms/LogInForm";
import SignUpForm from "./components/Forms/SignUpForm";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Profile from "./components/Pages/Profile/Profile";
import ChangePassword from "./components/Pages/Profile/ChangePassword";
import Quiz from "./components/Pages/Quiz";
import Programs from "./components/Pages/Programs";
import Forum from "./components/Pages/Forum";
import Meeting from "./components/Pages/Meeting";
import AuthVerify from "./components/Auth/AuthVerify";

function App() {
  return (
    <Router>
      <Navbar />
      <AuthVerify />
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/quiz" component={Quiz} />
        <PrivateRoute exact path="/programs" component={Programs} />
        <PrivateRoute exact path="/videos" component={Videos} />
        <PrivateRoute exact path="/meeting" component={Meeting} />
        <PrivateRoute exact path="/forum" component={Forum} />
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
