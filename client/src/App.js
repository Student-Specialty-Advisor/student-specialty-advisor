import React from "react";
import Navbar from "./components/Navbar/Navbar";
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
        <Route path="/" component={Home}>
          <Route path="/about" component={About} />
          <PrivateRoute path="/videos" component={Videos} />
          <PrivateRoute path="/curricilum" component={Curricilum} />
          <Route path="/login" component={LogInForm} />
          <Route path="/signup" component={SignUpForm} />
          <PrivateRoute path="/profile" component={Profile} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
