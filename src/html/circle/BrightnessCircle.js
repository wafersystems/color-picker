import React from 'react';
import '../color.css';
import Brightness from '../../component/Brightness';

export default class extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {brightness: 50}
	}

	render() {
		const {brightness} = this.state;
		const {onChange, onSwitch, onFetch} = this.props;
		return (
				<div className={'color-circle-component'}>
					<span className={'saturation'}>{brightness}%</span>
					<Brightness square={220} radius={160} scale={0.5} onChange={v => {
						if(v >= 0 && v < 180) {
							v += 180;
						}else {
							v -= 180;
						}
						this.setState({brightness: Math.round(v/3.6)}, () => onChange && onChange(v / 3.6))}
					} onSwitch={v => onSwitch && onSwitch(v)} onFetch={onFetch}/>
				</div>
		);
	}

}