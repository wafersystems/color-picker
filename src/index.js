import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter,
	Route
} from 'react-router-dom';
import ColorIndex from './html/ColorIndex';
import TemperatureIndex from './html/TemperatureIndex';
import Brightness from './html/BrightnessIndex';
import BarIndex from './html/BarIndex';
import 'es6-shim';

require('es6-promise').polyfill();

const app = <BrowserRouter>
	<div>
		<Route exact path="/" component={ColorIndex}/>
		<Route path="/color/:area" component={ColorIndex}/>
		<Route path="/color/" component={ColorIndex}/>
		<Route path="/temperature/:area" component={TemperatureIndex}/>
		<Route path="/temperature/" component={TemperatureIndex}/>
		<Route path="/brightness/:area" component={Brightness}/>
		<Route path="/brightness/" component={Brightness}/>
		<Route path="/scene" component={BarIndex}/>
	</div>
</BrowserRouter>;


ReactDOM.render((app), document.getElementById('app'));
