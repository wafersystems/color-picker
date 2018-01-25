import React from 'react';
import './color.css';
import Temperature from './circle/TemperatureCircle';
import Brightness from './circle/BrightnessCircle';
import {sceneChange, temperatureChange, getUrlParam, getSwitch} from './request';
import {temperatureList, temperatureBrightness} from '../component/constant'

export default class extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      brightness: 50,
      index: 4,
      btnBg: {
        temperatureBg: require('./images/but_color-temperature_small.png'),
        brightnessBg: require('./images/but_brightness.png'),
        normalBg: require('./images/but_normal.png')
      },
      selected: 'temperatureBg',
      area: 2,
      channel: {c: 1, w: 2},
      _switch: false,
      'debugger': false,
      agent: 'pc'
    };
    this.temp = {t: 4700, b: 50};
    this.fetchLighting = this.fetchLighting.bind(this);
  }

  componentWillMount() {
    document.title = 'Meeting Room';
    // console.log( this.props);
    const area = this.props.match && this.props.match.params.area || getUrlParam('area') || 2;
    const c = getUrlParam('c') || this.state.channel.c;
    const w = getUrlParam('w') || this.state.channel.w;
    const _debugger = Boolean(getUrlParam('debugger'));
    let u = navigator.userAgent, agent = 'pc';
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || !!u.match(/Mac OS X/)) {
      agent = 'mobile';
    }
    this.setState({area, channel: {c, w}, 'debugger': _debugger, agent});
  }

  componentDidMount() {
    const area = this.props.match && this.props.match.params.area || getUrlParam('area') || 2;
    let _switch = false;
    new Promise(resolve => {
      setTimeout(() => resolve(getSwitch(area)), 2000);
    }).then(d => d.text()).then(data => {
      _switch = data && typeof data === 'string' && Number(data.split('=')[1]) !== 4;
      this.setState({_switch});
    });
  }

  render() {
    const {btnBg, selected, area, _switch, agent} = this.state;
    return (
      <div className={`color-circle ${agent === 'pc' ? 'color-circle-edit': ''}`}>
        <div>
        <div className={'color-circle-btn'}>
          <div className={'btn-item'} onClick={() => this.setState({selected: 'temperatureBg'})}
               style={{background: `url(${btnBg[selected === 'temperatureBg' ? selected : 'normalBg']}) no-repeat 50%`}}>
            <span className={'item-lang'}>Color Temperature</span>
          </div>
          <div className={'btn-item'} onClick={() => this.setState({selected: 'brightnessBg'})}
               style={{background: `url(${btnBg[selected === 'brightnessBg' ? selected : 'normalBg']}) no-repeat 50%`}}>
            <span>Brightness</span>
          </div>
        </div>

        <div style={{display: selected === 'temperatureBg' ? 'block' : 'none'}}>
          <Temperature _switch={_switch} onFetch={() => this.fetchLighting()}
                       onChange={(temperature, index) => this.setState({index: index})}
                       onSwitch={v => this.setState({_switch: v}, () => sceneChange(area, v ? 1 : 4))}/>
        </div>
        <div style={{display: selected === 'brightnessBg' ? 'block' : 'none'}}>
          <Brightness _switch={_switch}
                      values={temperatureBrightness}
                      onFetch={() => this.fetchLighting()}
                      onChange={v => this.setState({brightness: v})}
                      onSwitch={v => this.setState({_switch: v}, () => sceneChange(area, v ? 1 : 4))}/>
        </div>
        {
          this.state.debugger && <div className={'debugger'}>
            <p>控制台：</p>
            <p>色温: {temperatureList[this.state.index].temperature}</p>
            <p>亮度: {this.state.brightness}</p>
            <p>开关状态： {_switch ? '开' : '关'}</p>
          </div>
        }
        </div>
        {agent === 'pc' && <div className={'edit'}>
          <div><label>区域:</label><input value={this.state.area} onChange={e => this.setState({area: e.target.value})}/></div>
          <div><label>通道 - 冷色:</label><input value={this.state.channel.c} onChange={e => this.setState({channel: {...this.state.channel, c: e.target.value}})}/></div>
          <div><label>通道 - 暖色:</label><input value={this.state.channel.w} onChange={e => this.setState({channel: {...this.state.channel, w: e.target.value}})}/></div>
        </div>}
      </div>
    );
  }

  fetchLighting() {
    const {channel, area, brightness, index} = this.state;
    if(this.temp.t !== temperatureList[index].temperature || this.temp.b !== brightness) {
      temperatureChange(area, {c: channel.c, w: channel.w}, temperatureList[index], brightness);
      this.temp = {t: temperatureList[index].temperature, b: brightness};
    }
  }
}
