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
		const {onChange, onSwitch, onFetch, _switch, values} = this.props;
		return (
				<div className={'color-circle-component'}>
					<span className={'saturation'}>{brightness}%</span>
					<Brightness square={220} radius={160} scale={0.5}
                      values={values}
                      onChange={v => this.setState({brightness: v}, () => onChange && onChange(v))}
                      onSwitch={v => onSwitch && onSwitch(v)} onFetch={onFetch} _switch={_switch}/>
				</div>
		);
	}

}
