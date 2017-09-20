import React from 'react';
import './color.css';
import Temperature from './circle/TemperatureCircle';
import Brightness from './circle/BrightnessCircle';
import {sceneChange, temperatureChange} from './request';

export default class extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {brightness: 50, temperature: 180, btnBg: {
			temperatureBg: require('./images/but_color-temperature_small.png'),
			brightnessBg: require('./images/but_brightness.png'),
			normalBg: require('./images/but_normal.png')
		},selected: 'temperatureBg', area: 1}
	}
	componentWillMount() {
		document.title = 'Meeting Room';
		this.setState({area: this.props.match.params.area});
	}

	render() {
		const {btnBg, selected, area, brightness, temperature} = this.state;
		return (
			<div className={'color-circle'}>
				<div className={'color-circle-btn'}>
					<div className={'btn-item'} onClick={() => this.setState({selected: 'temperatureBg'})}
					     style={{background: `url(${btnBg[selected === 'temperatureBg' ? selected : 'normalBg']}) no-repeat 50%`}}>
						<span className={'item-lang'}>Color Temperature</span>
					</div>
					<div className={'btn-item'} onClick={() => this.setState({selected: 'brightnessBg'})}
					     style={{background: `url(${btnBg[selected === 'brightnessBg' ? selected : 'normalBg']}) no-repeat 50%`}}>
						<span>Brightness</span>
					</div>
				</div>

				<div style={{display: selected === 'temperatureBg' ? 'block' : 'none'}}>
					<Temperature onFetch={() => temperatureChange(area, {c: 1, w: 2}, temperature, brightness)} onChange={v => this.setState({temperature: v})} onSwitch={v => sceneChange(area, v ? 1 : 4)}/>
				</div>
				<div style={{display: selected === 'brightnessBg' ? 'block' : 'none'}}>
					<Brightness onFetch={() => temperatureChange(area, {c: 1, w: 2}, temperature, brightness)} onChange={v => this.setState({brightness: v})} onSwitch={v => sceneChange(area, v ? 1 : 4)}/>
				</div>
			</div>
		);
	}

}