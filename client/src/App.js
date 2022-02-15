import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Videos from "./components/Pages/Videos";
import Curricilum from "./components/Pages/Curricilum";
import LogInForm from "./components/Forms/LogInForm";
import SignUpForm from "./components/Forms/SignUpForm";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Profile from "./components/Pages/Profile/Profile";
import ChangePassword from "./components/Pages/Profile/ChangePassword";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <PrivateRoute exact path="/videos" component={Videos} />
        <PrivateRoute exact path="/curricilum" component={Curricilum} />
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
