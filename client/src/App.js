import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route } from "react-router-dom";
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

      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <PrivateRoute exact path="/videos" component={Videos} />
      <PrivateRoute exact path="/curricilum" component={Curricilum} />
      <Route exact path="/login" component={LogInForm} />
      <Route exact path="/signup" component={SignUpForm} />
      <PrivateRoute exact path="/profile" component={Profile} />
    </Router>
  );
}

export default App;
