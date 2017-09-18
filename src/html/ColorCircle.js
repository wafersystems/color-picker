import React from 'react';
import './color.css';
import ColorRing from '../component/ColorRing';

export default class extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {color: '#FF0000'}
	}
	componentWillMount() {
		document.title = 'Meeting Room';
	}

	render() {
		const {color} = this.state;
		return (
			<div className={'color-circle'}>
				<div className={'color-circle-btn'}>
					<div className={'btn-item'}>
						<span>Color</span>
					</div>
					<div className={'btn-item'}>
						<span>Saturability</span>
					</div>
					<div className={'btn-item'}>
						<span>Brightness</span>
					</div>
				</div>
				<div className={'color-circle-component'}>
					<div style={{backgroundColor: color}} className={'color-bg'}/>
					<ColorRing square={300} radius={200} scale={0.8} onChange={v => this.setState({color: v.htmlColor}, () => sessionStorage.setItem('color', JSON.stringify(v.rgb)))}/>
				</div>
			</div>
		);
	}

}