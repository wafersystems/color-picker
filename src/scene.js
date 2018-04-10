import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import BarIndex from './html/BarIndex';
import 'es6-shim';

require('es6-promise').polyfill();

ReactDOM.render(<BarIndex />, document.getElementById('app'));
