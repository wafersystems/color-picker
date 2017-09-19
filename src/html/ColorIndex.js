import React from 'react';
import './color.css';
import ColorCircle from './circle/ColorCircle';
import SaturationCircle from './circle/SaturationCircle';

export default class extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			color: {},
			saturation: 4300,
			btnBg: {
				colorBg: require('./images/btn_color.png'),
				saturationBg: require('./images/btn_saturation.png'),
				brightnessBg: require('./images/btn_brightness.png'),
				normalBg: require('./images/btn_normal.png')
			},
			selected: 'colorBg'
		}
	}

	componentWillMount() {
		document.title = 'Meeting Room';
	}

	render() {
		const {color, btnBg, selected} = this.state;
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
					<ColorCircle color={color.htmlColor} onChange={v => this.setState({color: v})}/>
				</div>
				<div style={{display: selected === 'saturationBg' ? 'block' : 'none'}}>
					<SaturationCircle color={color.rgb} onChange={v => this.setState({saturation: v})}/>
				</div>
			</div>
		);
	}

}