import React from "react";
import Navbar from "./components/NavBar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Videos from "./components/Pages/Videos";
import Curricilum from "./components/Pages/Curricilum";
import LogInForm from "./components/Forms/LogInForm";
import SignUpForm from "./components/Forms/SignUpForm";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Profile from "./components/Pages/Profile";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/videos" component={Videos} />
        <Route path="/curricilum" component={Curricilum} />
        <Route path="/login" component={LogInForm} />
        <Route path="/signup" component={SignUpForm} />
        <PrivateRoute path="/profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
