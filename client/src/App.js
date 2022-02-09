import React from 'react';
import Navbar from './NavBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Videos from './pages/videos';
import Curricilum from './pages/curricilum';
import SignUpForm from './components/SignUpForm'
import SignInForm from './components/SignInForm'



function App() {
return (
	
	<Router>
	<Navbar />
	<Switch>
		<Route path='/' exact component={Home} />
		<Route path='/about' component={About} />
		<Route path='/events' component={Videos} />
		<Route path='/annual' component={Curricilum} />
	</Switch>
	</Router>
		
	
);
}

export default App;

