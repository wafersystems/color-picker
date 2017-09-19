import React from 'react';
import '../color.css';
import ColorRing from '../../component/ColorRing';

export default class extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			color: '#FF0000'
		}
	}

	render() {
		const {onChange, color} = this.props;
		return (
			<div className={'color-circle-component'}>
				<div style={{backgroundColor: color || this.state.color}} className={'color-bg'}/>
				<ColorRing square={260} radius={180} scale={0.5} offset={18}
				           onChange={v => this.setState({color: v.htmlColor}, () => onChange && onChange(v))}/>
			</div>
		);
	}

}