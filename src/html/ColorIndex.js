import React from 'react';
import './color.css';
import ColorCircle from './circle/ColorCircle';
import SaturationCircle from './circle/SaturationCircle';
import Brightness from './circle/BrightnessCircle';
import {hslToRgb, colorPicker} from '../component/common';
import {sceneChange, colorChange, getUrlParam} from './request';

export default class extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			color: {htmlColor: '#ff0000', rgb: {r: 255, g: 0, b: 0}, hsl: {h: 0, s: 0.5, l: 0.5}},
			saturation: 4300,
			brightness: 50,
			btnBg: {
				colorBg: require('./images/but_color_small.png'),
				saturationBg: require('./images/but_saturability.png'),
				brightnessBg: require('./images/but_brightness.png'),
				normalBg: require('./images/but_normal.png')
			},
			selected: 'colorBg',
			area: 1,
      channel: {r:1, g: 2, b: 3}
		}
	}

	componentWillMount() {
		document.title = 'Meeting Room';
		// console.log(this.props)
    const area = this.props.match && this.props.match.params.area || getUrlParam('area') || 1;
    const r = getUrlParam('r') || this.state.channel.r;
    const g = getUrlParam('g') || this.state.channel.g;
    const b = getUrlParam('b') || this.state.channel.b;
		this.setState({area, channel: {r, g, b}});
	}

	render() {
		const {color, btnBg, selected, area, channel} = this.state;
		return (
			<div className={'color-circle'}>
				<div className={'color-circle-btn'}>
					<div className={'btn-item'} onClick={() => this.setState({selected: 'colorBg'})}
					     style={{background: `url(${btnBg[selected === 'colorBg' ? selected : 'normalBg']}) no-repeat 50%`}}>
						<span>Color</span>
					</div>
					<div className={'btn-item'} onClick={() => this.setState({selected: 'saturationBg'})}
					     style={{background: `url(${btnBg[selected === 'saturationBg' ? selected : 'normalBg']}) no-repeat 50%`}}>
						<span>Saturability</span>
					</div>
					<div className={'btn-item'} onClick={() => this.setState({selected: 'brightnessBg'})}
					     style={{background: `url(${btnBg[selected === 'brightnessBg' ? selected : 'normalBg']}) no-repeat 50%`}}>
						<span>Brightness</span>
					</div>
				</div>
				<div style={{display: selected === 'colorBg' ? 'block' : 'none'}}>
					<ColorCircle onFetch={() => colorChange(area, {r: channel.r, g: channel.g, b: channel.b}, color.rgb)} color={color} onChange={v => this.setState({color: v})} onSwitch={v => sceneChange(area, v ? 1 : 4)}/>
				</div>
				<div style={{display: selected === 'saturationBg' ? 'block' : 'none'}}>
					<SaturationCircle onFetch={() => colorChange(area, {r: channel.r, g: channel.g, b: channel.b}, color.rgb)}  color={color} onChange={v => this.setState({color: v})} onSwitch={v => sceneChange(area, v ? 1 : 4)}/>
				</div>
				<div style={{display: selected === 'brightnessBg' ? 'block' : 'none'}}>
					<Brightness onChange={v => {
						color.hsl.l = v;
						const rgb = hslToRgb({...color.hsl});
						const htmlColor = colorPicker(rgb);
						this.setState({brightness: v, color: {htmlColor, hsl: {...color.hsl, l: v}, rgb}});
					}} onFetch={() => colorChange(area, {r: channel.r, g: channel.g, b: channel.b}, color.rgb)}  onSwitch={v => sceneChange(area, v ? 1 : 4)}/>
				</div>
			</div>
		);
	}

}
