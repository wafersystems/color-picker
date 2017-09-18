import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/ColorRing';
import registerServiceWorker from './registerServiceWorker';
import {
	BrowserRouter,
	Route
} from 'react-router-dom';
import ColorCircle from './html/ColorCircle';
import SaturationCircle from './html/SaturationCircle';

const app = <BrowserRouter>
	<div>
		<Route exact path="/" component={ColorCircle}/>
		<Route path="/color" component={ColorCircle}/>
		<Route path="/saturation" component={SaturationCircle}/>
		<Route path="/test" component={() => <App onChange={v => console.log(v)} radius={250} square={380} scale={0.8} changeBackground/>}/>
	</div>
</BrowserRouter>;

//<App onChange={v => console.log(v)} radius={250} square={380} scale={0.8} changeBackground/>

ReactDOM.render((app), document.getElementById('root'));
registerServiceWorker();
