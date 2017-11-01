import React from 'react';
import '../color.css';
import Temperature from '../../component/Temperature';

export default class extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {color: {r: 255, g: 0, b: 0}, saturation: 4700}
  }

  render() {
    const {saturation} = this.state;
    const {onChange, onSwitch, onFetch, _switch} = this.props;
    return (
      <div className={'color-circle-component'}>
        <span className={'saturation'}>{saturation}K</span>
        <Temperature square={280} radius={140} scale={1} offset={12} onChange={(temperature, index) => {
          this.setState({saturation: temperature.temperature}, () => onChange && onChange(temperature, index))
        }
        } onSwitch={v => onSwitch && onSwitch(v)} onFetch={onFetch} _switch={_switch}/>
      </div>
    );
  }

}
