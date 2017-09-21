import React from 'react';
import '../color.css';
import Temperature from '../../component/Temperature';

export default class extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {color: {r: 255, g: 0, b: 0}, saturation: 4300}
	}

	render() {
		const {saturation} = this.state;
		const {onChange, onSwitch, onFetch, _switch} = this.props;
		return (
				<div className={'color-circle-component'}>
					<span className={'saturation'}>{saturation}K</span>
					<Temperature  square={220} radius={160} scale={0.5} offset={12} onChange={v => {
						if(v >= 0 && v < 180) {
							v = 180 - v;
						}else {
							v = 540 - v;
						}
						this.setState({saturation: Math.round(v/360 * 3800) + 2700}, () => onChange && onChange(v))}
					} onSwitch={v => onSwitch && onSwitch(v)} onFetch={onFetch} _switch={_switch}/>
				</div>
		);
	}

}
