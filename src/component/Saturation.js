import React, {Component} from 'react';
import {hslToRgb, colorPicker, rgbToHsl, getPointer} from './common';
import PropTypes from 'prop-types';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import Arrow from './Arrow';

const Saturation = class extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			color: {r: 255, g: 0, b: 0}, radius: 100, diameter: 400, stroke: 70, x: 180, y: 0, isMove: false,
			rotate: 0,
			adjustAngle: 6,
			arrow: Arrow,
			scale: 1,
			_switch: false
		};//radius min 150
	}

	componentWillMount() {
		const {color, diameter, stroke, scale, adjustAngle, radius, offset} = this.props;
		const {state} = this;
		this.setState({
			x: (diameter || state.diameter ) / 2 - offset,
			color: color || state.color,
			stroke: stroke || state.stroke,
			diameter: diameter || state.diameter,
			radius: radius || state.radius,
			scale: scale || state.scale,
			adjustAngle: adjustAngle || state.adjustAngle
		});
	}

	render() {
		let {color, diameter, stroke, isMove, arrow, rotate, adjustAngle, scale, x, y, radius, _switch} = this.state;
		const {onSwitch} = this.props;
		color = this.props.color || color;
		let hsl = rgbToHsl({...color});
		const color0 = colorPicker(hslToRgb({...hsl, s: 1}));
		const color1 = colorPicker(hslToRgb({...hsl, s: 0.5}));
		const color2 = colorPicker(hslToRgb({...hsl, s: 0}));
		return (
			<ReactSVGPanZoom width={diameter} height={diameter}
			                 toolbarPosition="none" tool={'none'} detectPinchGesture={false} detectAutoPan={false}
			                 miniaturePosition="none"
			                 detectWheel={false}
			                 onTouchEnd={() => this.setState({isMove: false})}
			                 onTouchMove={e => {
				                 if (isMove) {
					                 let {cx, cy, a} = getPointer(diameter / 2, e.changedPoints[0].x, e.changedPoints[0].y, rotate);
					                 this.setState({
						                 rotate: (a + adjustAngle) % 360,
						                 x: diameter / 2 - cx,
						                 y: diameter / 2 - cy
					                 }, () => {
						                 if (this.props.onChange) {
							                 if(a >= 0 && a < 180) {
								                 a = 180 - a;
							                 }else {
								                 a = 540 - a;
							                 }
							                 const rgb = hslToRgb({...hsl, s: a / 3.6});
							                 this.props.onChange({
								                 htmlColor: colorPicker(rgb),
								                 rgb,
								                 hsl: {...hsl, s: a / 3.6}
							                 });
						                 }
					                 });
				                 }
			                 }}
			                 onMouseMove={e => {
				                 if (isMove) {
					                 let {cx, cy, a} = getPointer(diameter / 2, e.x, e.y, rotate);
					                 this.setState({
						                 rotate: (a + adjustAngle) % 360,
						                 x: diameter / 2 - cx,
						                 y: diameter / 2 - cy
					                 }, () => {
						                 if (this.props.onChange) {
							                 if(a >= 0 && a < 180) {
								                 a = 180 - a;
							                 }else {
								                 a = 540 - a;
							                 }
							                 const rgb = hslToRgb({...hsl, s: a / 3.6});
							                 this.props.onChange({
								                 htmlColor: colorPicker(rgb),
								                 rgb,
								                 hsl: {...hsl, s: a / 3.6}
							                 });
						                 }
					                 });
				                 }
			                 }}
			>
				<svg width={diameter + 50} height={diameter + 50}>
					<circle cx={diameter / 2} cy={diameter / 2} r={diameter / 2 - 4} fillOpacity={0} stroke={'#c9c9c9'}
					        strokeWidth={1} strokeOpacity={1}/>
					<defs>
						<linearGradient id="left">
							<stop offset="8%" stopColor={color0}/>
							<stop offset="92%" stopColor={color1}/>
						</linearGradient>
						<linearGradient id="right">
							<stop offset="8%" stopColor={color2}/>
							<stop offset="92%" stopColor={color1}/>
						</linearGradient>
					</defs>
					<circle cx={diameter / 2} cy={diameter / 2} r={radius} strokeWidth={stroke} stroke={'url(#left)'} fill="none"
					        transform={`matrix(0,-1,1,0,0, ${diameter})`}
					        strokeDasharray={`0 ${radius * 3.14} ${radius * 3.14}`}/>
					<circle cx={diameter / 2} cy={diameter / 2} r={radius} strokeWidth={stroke} stroke={'url(#right)'} fill="none"
					        transform={`matrix(0,-1,1,0,0, ${diameter})`}
					        strokeDasharray={`${radius * 3.15} ${radius * 3.15}`}/>
					<image xlinkHref={require(_switch ? './but_on.png': './but_off.png')} width={110} height={110} x={diameter / 2 - 55}
					       y={(diameter) / 2 - 55} onClick={() => this.setState({_switch: !_switch}, () => onSwitch && onSwitch(!_switch))}/>
					<g fill={'#6C6D83'} transform={`translate(${x}, ${y}) rotate(${rotate} 0 0) scale(${scale})`}
					   onTouchStart={() => {
						   this.setState({isMove: true})
					   }}
					   onMouseDown={() => this.setState({isMove: true})}>
						{arrow}
					</g>
				</svg>
			</ReactSVGPanZoom>
		);
	}
};

Saturation.propTypes = {
	color: PropTypes.object,
	diameter: PropTypes.number,
	stroke: PropTypes.number
};

export default Saturation;