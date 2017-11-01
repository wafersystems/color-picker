import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import TemperatureIndex from './html/TemperatureIndex';
import 'es6-shim';

require('es6-promise').polyfill();

ReactDOM.render(<TemperatureIndex />, document.getElementById('app'));
