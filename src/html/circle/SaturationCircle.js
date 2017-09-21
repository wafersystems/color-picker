import React from 'react';
import '../color.css';
import Saturation from '../../component/Saturation';

export default class extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {color: {r: 255, g: 0, b: 0}, htmlColor: '#FF0000'}
	}

	render() {
		const {onChange, color, onSwitch, onFetch, _switch} = this.props;
		return (
				<div className={'color-circle-component'}>
					<div style={{backgroundColor: color.htmlColor || this.state.htmlColor}} className={'color-bg'}/>
					<Saturation color={color.rgb || this.state.color} diameter={320} scale={0.5} offset={18} radius={85} stroke={50} onChange={v => {
						this.setState({htmlColor: v.htmlColor}, () => onChange && onChange(v))}
					} onSwitch={v => onSwitch && onSwitch(v)} onFetch={onFetch} _switch={_switch}/>
				</div>
		);
	}

}
