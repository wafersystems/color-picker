import React from 'react';
import './color.css';
import Temperature from './circle/TemperatureCircle';
import Brightness from './circle/BrightnessCircle';

export default class extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {brightness: 50, temperature: 4300, btnBg: {
			temperatureBg: require('./images/but_color-temperature_small.png'),
			brightnessBg: require('./images/but_brightness.png'),
			normalBg: require('./images/but_normal.png')
		},selected: 'temperatureBg'}
	}
	componentWillMount() {
		document.title = 'Meeting Room';
	}

	render() {
		const {btnBg, selected} = this.state;
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
					<Temperature onChange={v => {
						this.setState({temperature: Math.round(v/360 * 3800) + 2700})}
					}/>
				</div>
				<div style={{display: selected === 'brightnessBg' ? 'block' : 'none'}}>
					<Brightness onChange={v => this.setState({brightness: v})}/>
				</div>
			</div>
		);
	}

}