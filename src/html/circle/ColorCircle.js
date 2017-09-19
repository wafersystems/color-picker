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
		const {onChange} = this.props;
		const {color} = this.state;
		return (
			<div className={'color-circle-component'}>
				<div style={{backgroundColor: color}} className={'color-bg'}/>
				<ColorRing square={260} radius={180} scale={0.5} offset={18} color={this.props.color}
				           onChange={v => this.setState({color: v.htmlColor}, () => onChange && onChange(v))}/>
			</div>
		);
	}

}