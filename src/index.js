import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter,
	Route
} from 'react-router-dom';
import ColorIndex from './html/ColorIndex';
import TemperatureIndex from './html/TemperatureIndex';

const app = <BrowserRouter>
	<div>
		<Route exact path="/" component={ColorIndex}/>
		<Route path="/color/:area" component={ColorIndex}/>
		<Route path="/temperature/:area" component={TemperatureIndex}/>
	</div>
</BrowserRouter>;


ReactDOM.render((app), document.getElementById('app'));
