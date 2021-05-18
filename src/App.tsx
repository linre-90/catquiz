import React, {Suspense} from 'react';
import Headerbar from "./components/headerBar/HeaderBr";
import Home from "./pages/home/home";
import DifficultySelection from "./pages/selectdifficulty/selectDifficulty";
import Quiz from "./pages/quiz/quiz";
import FooterComponent from "./components/footer/footer_component"
import "./app.css"
import { Route, BrowserRouter, Switch } from 'react-router-dom';

/**
 * Contains: routing, "sticky" components[header, footer]. No state.
 * @returns React component
 */
function App() {
  	return (
    	<div >
			<Suspense fallback="loading">
      		<Headerbar />
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home}></Route>
					<Route exact path="/difficulty" component={DifficultySelection}></Route>
					<Route exact path="/game/:level" children={<Quiz />}></Route>
				</Switch>
			</BrowserRouter>
			<FooterComponent />
			</Suspense>
    	</div>
  	);
}

export default App;
