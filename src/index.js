import React from 'react';
import ReactDOM from 'react-dom';
import App from './ColorRing';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App onChange={v => console.log(v)} radius={250} square={380} scale={0.8} changeBackground/>, document.getElementById('root'));
registerServiceWorker();
