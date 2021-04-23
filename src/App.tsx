import React from 'react';
import Headerbar from "./components/headerBar/HeaderBr";
import Home from "./pages/home/home";
import FooterComponent from "./components/footer/footer_component"
import "./app.css"
import { Route, BrowserRouter, Switch } from 'react-router-dom';

function App() {
  	return (
    	<div >
      		<Headerbar />
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home}></Route>
				</Switch>
			</BrowserRouter>
			<FooterComponent />
    	</div>
  	);
}

export default App;
