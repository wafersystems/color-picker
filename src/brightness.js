import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import BrightnessIndex from './html/BrightnessIndex';
import 'es6-shim';

require('es6-promise').polyfill();

ReactDOM.render(<BrightnessIndex />, document.getElementById('app'));
