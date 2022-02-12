import React from "react";
import Navbar from "./components/NavBar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import About from "./components/Pages/About";
import Videos from "./components/Pages/Videos";
import Curricilum from "./components/Pages/Curricilum";
import LogInForm from "./components/Forms/LogInForm";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Profile from "./components/Pages/Profile";
const Example = () => {
  return <h2>login was successful, redirected to a target page</h2>;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/videos" component={Videos} />
        <Route path="/curricilum" component={Curricilum} />
        <Route path="/login" component={LogInForm} />
        <PrivateRoute path="/Profile" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;
