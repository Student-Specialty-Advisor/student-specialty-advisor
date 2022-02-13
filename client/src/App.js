import React from "react";
import PrivateNavbar from "./components/PrivateNavBar/PrivateNavbar";
import PublicNavbar from "./components/PublicNavBar/PublicNavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Videos from "./components/Pages/Videos";
import Curricilum from "./components/Pages/Curricilum";
import LogInForm from "./components/Forms/LogInForm";
import SignUpForm from "./components/Forms/SignUpForm";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Profile from "./components/Pages/Profile";

const Example = () => {
  return <h2>login was successful, redirected to a target page</h2>;
};

function App() {
  return (
    <Router>
      <PublicNavbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/signin" component={LogInForm} />
        <Route path="/signup" component={SignUpForm} />
      </Switch>
    </Router>
  );
}

export default App;
