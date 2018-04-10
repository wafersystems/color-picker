/**
 * date: 2018-04-10 10:04
 * auth: XuQiang
 **/

import React, {Component} from 'react';
import {getAreaForBar, sceneChange, brightnessChange, temperatureChange} from './request';
import './color.css';
import Slider from 'antd/lib/slider';
import 'antd/lib/slider/style/index.css';
import 'antd/lib/tooltip/style/index.css';
import {temperatureList} from '../component/constant';

export default class extends Component {
  constructor() {
    super(...arguments);
    this.state = {config: {}, brightness: 50, temperature: 4}
  }

  componentWillMount() {
    getAreaForBar().then(data => data.json()).then(r => {
      this.setState({config: r});
    });
  }

  render() {
    const {config, brightness, temperature} = this.state;
    return (
      <div>
        <div className={'bar-slider'}>
          <div className={'slider-title'}>灯光调节</div>
          <div className={'slider-ctrl'}><label>色温：</label><Slider defaultValue={temperature} min={1} max={9} step={1} onChange={v => {
            temperatureChange(config.area, {c: config.tChannel, w: config.wChannel}, temperatureList[v], brightness);
          }}/></div>
          <div className={'slider-ctrl'}><label>亮度：</label><Slider defaultValue={brightness} min={20} max={100} step={10} onChange={v => {
            this.setState({brightness: v});
            brightnessChange(config.area, config.bChannel, v);
          }}/></div>
        </div>
        <div className={'bar-scene'}>
          {config.scene && config.scene.map(scene => {
            return (
              <div key={scene.value}>
                <button onClick={() => sceneChange(config.area || 1, scene.value)}>{scene.label}</button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
