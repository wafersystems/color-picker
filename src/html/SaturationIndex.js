import React from 'react';
import './color.css';
import Saturation from '../component/Saturation';

export default class extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {color: {r: 0, g: 255, b: 0}, saturation: 4300}
	}
	componentWillMount() {
		document.title = 'Meeting Room';
		this.setState({color: JSON.parse(sessionStorage.getItem('color')) || this.state.color});
	}

	render() {
		const {color, saturation} = this.state;
		return (
			<div className={'color-circle'}>
				<div className={'color-circle-btn'}>
					<div className={'btn-item'}>
						<span className={'item-lang'}>Color Temperature</span>
					</div>
					<div className={'btn-item'}>
						<span>Brightness</span>
					</div>
				</div>
				<div className={'color-circle-component'}>
					<span className={'saturation'}>{saturation}K</span>
					<Saturation color={color} diameter={340} scale={0.5} offset={12} radius={90} onChange={v => {
						if(v >= 0 && v < 180) {
							v += 180;
						}else {
							v -= 180;
						}
						this.setState({saturation: Math.round(v/360 * 3800) + 2700})}
					}/>
				</div>
			</div>
		);
	}

}