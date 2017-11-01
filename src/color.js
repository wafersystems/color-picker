import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import ColorIndex from './html/ColorIndex';
import 'es6-shim';

require('es6-promise').polyfill();

ReactDOM.render(<ColorIndex />, document.getElementById('app'));
