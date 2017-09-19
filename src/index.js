import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/ColorRing';
import registerServiceWorker from './registerServiceWorker';
import {
	BrowserRouter,
	Route
} from 'react-router-dom';
import ColorIndex from './html/ColorIndex';
import TemperatureIndex from './html/TemperatureIndex';

const app = <BrowserRouter>
	<div>
		<Route exact path="/" component={ColorIndex}/>
		<Route path="/color" component={ColorIndex}/>
		<Route path="/temperature" component={TemperatureIndex}/>
		<Route path="/test" component={() => <App onChange={v => console.log(v)} radius={250} square={380} scale={0.8} changeBackground/>}/>
	</div>
</BrowserRouter>;

//<App onChange={v => console.log(v)} radius={250} square={380} scale={0.8} changeBackground/>

ReactDOM.render((app), document.getElementById('root'));
registerServiceWorker();
