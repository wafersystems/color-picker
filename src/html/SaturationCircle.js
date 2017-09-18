import React from 'react';
import './color.css';
import Saturation from '../component/Saturation';

export default class extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {color: {r: 0, g: 255, b: 0}}
	}
	componentWillMount() {
		document.title = 'Meeting Room';
		this.setState({color: JSON.parse(sessionStorage.getItem('color')) || this.state.color});
	}

	render() {
		const {color} = this.state;
		return (
			<div className={'color-circle'}>
				<div className={'color-circle-btn'}>
					<div className={'btn-item'}>
						<span>Color Temperature</span>
					</div>
					<div className={'btn-item'}>
						<span>Brightness</span>
					</div>
				</div>
				<div className={'color-circle-component'}>
					<span className={'saturation'}>{'4000K'}</span>
					<Saturation color={color} onChange={v => console.log(v)}/>
				</div>
			</div>
		);
	}

}