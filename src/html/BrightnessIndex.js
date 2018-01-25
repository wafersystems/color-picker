import React from 'react';
import './color.css';
import Brightness from './circle/BrightnessCircle';
import {sceneChange, brightnessChange, getUrlParam, getSwitch} from './request';
import {temperatureBrightness} from '../component/constant'

export default class extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      brightness: 50,
      btnBg: {
        brightnessBg: require('./images/but_brightness.png')
      },
      area: 2,
      channel: 1,
      _switch: false,
      'debugger': false,
      agent: 'pc'
    };
    this.temp = {b: 50};
    this.fetchLighting = this.fetchLighting.bind(this);
  }

  componentWillMount() {
    document.title = 'Meeting Room';
    // console.log( this.props);
    const area = this.props.match && this.props.match.params.area || getUrlParam('area') || 2;
    const b = getUrlParam('b') || this.state.channel;
    const _debugger = Boolean(getUrlParam('debugger'));
    let u = navigator.userAgent, agent = 'pc';
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || !!u.match(/Mac OS X/)) {
      agent = 'mobile';
    }
    this.setState({area, channel: b, 'debugger': _debugger, agent});
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
    const {btnBg, area, _switch, agent} = this.state;
    return (
      <div className={`color-circle ${agent === 'pc' ? 'color-circle-edit': ''}`}>
        <div>
        <div className={'color-circle-btn'}>
          <div className={'btn-item'}
               style={{background: `url(${btnBg['brightnessBg']}) no-repeat 50%`}}>
            <span>Brightness</span>
          </div>
        </div>
        <div>
          <Brightness _switch={_switch}
                      values={temperatureBrightness}
                      onFetch={() => this.fetchLighting()}
                      onChange={v => this.setState({brightness: v})}
                      onSwitch={v => this.setState({_switch: v}, () => sceneChange(area, v ? 1 : 4))}/>
        </div>
        {
          this.state.debugger && <div className={'debugger'}>
            <p>控制台：</p>
            <p>亮度: {this.state.brightness}</p>
            <p>开关状态： {_switch ? '开' : '关'}</p>
          </div>
        }
        </div>
        {agent === 'pc' && <div className={'edit'}>
          <div><label>区域:</label><input value={this.state.area} onChange={e => this.setState({area: e.target.value})}/></div>
          <div><label>通道 - 亮度:</label><input value={this.state.channel} onChange={e => this.setState({channel: e.target.value})}/></div>
        </div>}
      </div>
    );
  }

  fetchLighting() {
    const {channel, area, brightness} = this.state;
    if(this.temp.b !== brightness) {
      brightnessChange(area, channel, brightness);
      this.temp = {b: brightness};
    }
  }
}
