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

	componentWillReceiveProps(np) {
		if(np.color && np.color.htmlColor) {
			this.setState({color: np.color.htmlColor});
		}
	}

	render() {
		const {onChange, onSwitch, onFetch, _switch} = this.props;
		const {color} = this.state;
		return (
			<div className={'color-circle-component'}>
				<div style={{backgroundColor: color}} className={'color-bg'}/>
				<ColorRing square={280} radius={140} scale={1} offset={12} color={this.props.color} onFetch={onFetch} _switch={_switch}
				           onChange={v => this.setState({color: v.htmlColor}, () => onChange && onChange(v))} onSwitch={v => onSwitch && onSwitch(v)}/>
			</div>
		);
	}

}
