import React, {Component} from 'react';
import {hslToRgb, colorPicker, rgbToHsl} from './common';
import PropTypes from 'prop-types';

const Saturation = class extends Component {
	constructor() {
		super(...arguments);
		this.state = {color: {r: 255, g: 0, b: 0}, radius: 150, stroke: 80};//radius min 150
	}

	render() {
		const {color, radius, stroke} = this.state;

		let hsl = rgbToHsl({...color});
		const color0 = colorPicker(hslToRgb({...hsl, s: 1}));
		const color1 = colorPicker(hslToRgb({...hsl, s: 0.5}));
		const color2 = colorPicker(hslToRgb({...hsl, s: 0}));
		return(
			<svg width={radius * 2 * 1.3} height={radius * 1.3 * 2}>
				<defs>
					<linearGradient id="left">
						<stop offset="5%" stopColor={color0} />
						<stop offset="95%" stopColor={color1} />
					</linearGradient>
					<linearGradient id="right">
						<stop offset="5%" stopColor={color2} />
						<stop offset="95%" stopColor={color1} />
					</linearGradient>
				</defs>
				<circle cx={radius * 1.3} cy={radius * 1.3} r={radius} strokeWidth={stroke} stroke={'url(#left)'} fill="none" transform={`matrix(0,-1,1,0,0, ${radius * 2 * 1.3})`} strokeDasharray={`0 ${radius * 3.15} ${radius * 3.15}`}/>
				<circle cx={radius * 1.3} cy={radius * 1.3} r={radius} strokeWidth={stroke} stroke={'url(#right)'} fill="none" transform={`matrix(0,-1,1,0,0, ${radius * 2 * 1.3})`} strokeDasharray={`${radius * 3.15} ${radius * 3.15}`} />
			</svg>
		);
	}
};

Saturation.propTypes = {
	color: PropTypes.object,
	radius: PropTypes.number,
	stroke: PropTypes.number
};

export default Saturation;