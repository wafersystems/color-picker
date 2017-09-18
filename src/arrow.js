import React from 'react';

class Arrow extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {clientX: 0, clientY: 0}
	}

	componentDidMount() {
	}

	render() {
		const {rotate = 0, scale = 0.8, radius, onMouseDown} = this.props;
		const x = radius - 25;
		const y = 2;
		return <polygon fill={'#c9c9c9'} points="25 50 0 0 50 0 25 50"
		                transform={`translate(${x}, ${y}) rotate(${rotate} ${radius} ${radius}) scale(${scale})`}
		                onMouseDown={() => onMouseDown()}/>

	}
}

export default Arrow;