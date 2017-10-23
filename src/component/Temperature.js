import React, {Component} from 'react';
import {ReactSVGPanZoom} from 'react-svg-pan-zoom';
import {getPointer} from './common';
import Arrow from './Arrow';

class Temperature extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			radius: 180, square: 360, x: 160, y: 0, isMove: false, rotate: 0,
			image: require('./color-temperature.png'),
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
    document.body.addEventListener('mouseup', () => this.setState({isMove: false}, () => this.props.onFetch && this.props.onFetch()));
  }

	render() {
		const {radius, isMove, rotate, x, y, image, arrow, scale, square} = this.state;
		const {adjustAngle = 5, onSwitch, onFetch, _switch} = this.props;
		return (
			<ReactSVGPanZoom width={radius * 2} height={radius * 2}
			                 toolbarPosition="none" tool={'none'} detectPinchGesture={false} detectAutoPan={false}
			                 miniaturePosition="none"
			                 detectWheel={false}
			                 onTouchEnd={() => {this.setState({isMove: false}); onFetch && onFetch()}}
			                 onTouchMove={e => {
				                 if (isMove) {
					                 let {cx, cy, a} = getPointer(radius, e.changedPoints[0].x, e.changedPoints[0].y, rotate);
					                 this.setState({
						                 rotate: (a + adjustAngle) % 360,
						                 x: radius - cx,
						                 y: radius - cy
					                 }, () => {
						                 if (this.props.onChange) {
							                 this.props.onChange((a+adjustAngle) % 360);
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
						                 y: radius - cy
					                 }, () => {
						                 if (this.props.onChange) {
							                 this.props.onChange((a+adjustAngle) % 360);
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
					<image xlinkHref={require(_switch ? './but_on.png': './but_off.png')} width={110} height={110} x={square / 2 - 6}
					       y={(square) / 2 - 5} onTouchEnd={e => {e.stopPropagation(); e.preventDefault();this.setState({_switch: !_switch}, () => onSwitch && onSwitch(!_switch))}}
                 onClick={e => {e.stopPropagation(); e.preventDefault();this.setState({_switch: !_switch}, () => onSwitch && onSwitch(!_switch))}}/>
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

export default Temperature;
