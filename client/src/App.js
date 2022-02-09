import React from 'react';
import Navbar from './components/NavBar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Videos from './components/Pages/Videos';
import Curricilum from './components/Pages/Curricilum';



function App() {
return (
	
	<Router>
	<Navbar />
	<Switch>
		<Route path='/' exact component={Home} />
		<Route path='/about' component={About} />
		<Route path='/videos' component={Videos} />
		<Route path='/curricilum' component={Curricilum} />
	</Switch>
	</Router>
		
	
);
}

export default App;

