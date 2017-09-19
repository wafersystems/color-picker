import React, {Component} from 'react';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import {hslToRgb, colorPicker, getPointer} from './common';
import PropTypes from 'prop-types';
import Arrow from './Arrow';

class ColorRing extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			radius: 180, square: 360, x: 160, y: 0, isMove: false, rotate: 0,
			color: {
				h: 0,
				s: 0.5,
				l: 0.5
			},
			image: require('./ring.png'),
			arrow: Arrow,
			scale: 1,
			_switch: false
		};
	}

	componentWillMount() {
		const {radius, offset = 20, image, arrow, scale, square} = this.props;
		const {state} = this;
		this.setState({
			radius: radius || state.radius,
			x: (radius || state.radius) - offset,
			image: image || state.image,
			arrow: arrow || state.arrow,
			scale: scale || state.scale,
			square: (square > radius * 2 ? radius : square) || state.square
		});
	}

	componentDidMount() {
		document.body.addEventListener('mouseup', () => {
			this.setState({isMove: false});
		});
	}

	componentWillReceiveProps(np) {
		if (!this.state.isMove && np.color && np.color.hsl) {
			this.setState({color: np.color.hsl});
		}
	}

	render() {
		const {radius, isMove, rotate, x, y, image, arrow, scale, color, square, _switch} = this.state;
		const {adjustAngle = 6, onSwitch} = this.props;
		const rgb = hslToRgb(color);
		return (
			<ReactSVGPanZoom width={radius * 2} height={radius * 2}
			                 toolbarPosition="none" tool={'none'} detectPinchGesture={false} detectAutoPan={false}
			                 miniaturePosition="none"
			                 detectWheel={false}
			                 fillOpacity={0}
			                 onTouchEnd={() => this.setState({isMove: false})}
			                 onTouchMove={e => {
				                 if (isMove) {
					                 const {cx, cy, a} = getPointer(radius, e.changedPoints[0].x, e.changedPoints[0].y, rotate);
					                 this.setState({
						                 rotate: (a + adjustAngle) % 360,
						                 x: radius - cx,
						                 y: radius - cy,
						                 color: {...color, h: (a % 360)}
					                 }, () => {
						                 if (this.props.onChange) {
							                 this.props.onChange({htmlColor: colorPicker(rgb), rgb, hsl: color});
						                 }
					                 });
				                 }
			                 }}
			                 onMouseMove={e => {
				                 if (isMove) {
					                 const {cx, cy, a} = getPointer(radius, e.x, e.y, rotate);
					                 this.setState({
						                 rotate: (a + adjustAngle) % 360,
						                 x: radius - cx,
						                 y: radius - cy,
						                 color: {...color, h: (a % 360)}
					                 }, () => {
						                 if (this.props.onChange) {
							                 this.props.onChange({htmlColor: colorPicker(rgb), rgb, hsl: color});
						                 }
					                 });
				                 }
			                 }}
			>
				<svg width={radius * 2} height={radius * 2}>
					<circle cx={radius} cy={radius} r={radius - 4} fillOpacity={0} stroke={'#c9c9c9'} strokeWidth={1}
					        strokeOpacity={1}/>
					<image xlinkHref={image} width={square} height={square} x={(radius * 2 - square) / 2}
					       y={(radius * 2 - square) / 2}/>
					<g width={110} height={110} x={square / 2 - 5}
					   y={(square) / 2 - 5}>
						<image xlinkHref={require(_switch ? './but_on.png': './but_off.png')} width={110} height={110} x={square / 2 - 6}
						       y={(square) / 2 - 5} onClick={() => this.setState({_switch: !_switch}, () => onSwitch && onSwitch(!_switch))}/>
						<text>
							No
						</text>
						<text>
							OFF
						</text>
					</g>
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

}

ColorRing.propTypes = {
	radius: PropTypes.number,
	offset: PropTypes.number,
	image: PropTypes.object,
	arrow: PropTypes.object,
	onChange: PropTypes.func,
	adjustAngle: PropTypes.number,
	scale: PropTypes.number
};

export default ColorRing;
