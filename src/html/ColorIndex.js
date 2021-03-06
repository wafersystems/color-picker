import React from 'react';
import './color.css';
import ColorCircle from './circle/ColorCircle';
import SaturationCircle from './circle/SaturationCircle';
import Brightness from './circle/BrightnessCircle';
import {sceneChange, colorChange, getUrlParam, getSwitch, getAreaForBar} from './request';
import {colorBrightness} from '../component/constant'
import Scene from '../component/Scene';

export default class extends React.Component {
	constructor() {
		super(...arguments);
		this.state = {
			color: {htmlColor: '#ff0000', rgb: {r: 255, g: 0, b: 0}, hsl: {h: 0, s: 50, l: 50}},
			saturation: 4300,
			brightness: 50,
			btnBg: {
				colorBg: require('./images/but_color_small.png'),
				saturationBg: require('./images/but_saturability.png'),
				brightnessBg: require('./images/but_brightness.png'),
				normalBg: require('./images/but_normal.png')
			},
			selected: 'colorBg',
			area: 1,
      channel: {r:1, g: 2, b: 3},
      _switch: false,
      'debugger': false,
      agent: 'pc'
		};
		this.temp = {r: 255, g: 0, b: 0, brightness: 50};
		this.fetchLighting = this.fetchLighting.bind(this);
	}

	componentWillMount() {
		document.title = 'Meeting Room';
		// console.log(this.props)
    const _debugger = Boolean(getUrlParam('debugger'));

    let u = navigator.userAgent, agent = 'pc';
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      agent = 'mobile';
    }
    getAreaForBar().then(data => data.json()).then(s => {
      const area = this.props.match && this.props.match.params.area || getUrlParam('area') || s.area ||2;
      const r = getUrlParam('r') || s.colorChannel && s.colorChannel.r || this.state.channel.r;
      const g = getUrlParam('g') || s.colorChannel && s.colorChannel.g || this.state.channel.g;
      const b = getUrlParam('b') || s.colorChannel && s.colorChannel.b || this.state.channel.b;
      this.setState({area, channel: {r, g, b}, 'debugger': _debugger, agent});
    });
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
		const {color, btnBg, selected, area, _switch, brightness, agent} = this.state;
		return (
			<div className={`color-circle ${agent === 'pc' ? 'color-circle-edit': ''}`}>
        <div>
				<div className={'color-circle-btn'}>
					<div className={'btn-item'} onClick={() => this.setState({selected: 'colorBg'})}
					     style={{background: `url(${btnBg[selected === 'colorBg' ? selected : 'normalBg']}) no-repeat 50%`}}>
						<span>Color</span>
					</div>
					<div className={'btn-item'} onClick={() => this.setState({selected: 'saturationBg'})}
					     style={{background: `url(${btnBg[selected === 'saturationBg' ? selected : 'normalBg']}) no-repeat 50%`}}>
						<span>Saturability</span>
					</div>
					<div className={'btn-item'} onClick={() => this.setState({selected: 'brightnessBg'})}
					     style={{background: `url(${btnBg[selected === 'brightnessBg' ? selected : 'normalBg']}) no-repeat 50%`}}>
						<span>Brightness</span>
					</div>
				</div>
				<div style={{display: selected === 'colorBg' ? 'block' : 'none'}}>
					<ColorCircle onFetch={() => this.fetchLighting()}
                       color={color} _switch={_switch}
                       onChange={v => this.setState({color: v})}
                       onSwitch={v => this.setState({_switch: v}, () => sceneChange(area, v ? 1 : 4))}/>
				</div>
				<div style={{display: selected === 'saturationBg' ? 'block' : 'none'}}>
					<SaturationCircle onFetch={() => this.fetchLighting()}
                            color={color} _switch={_switch}
                            onChange={v => this.setState({color: v})}
                            onSwitch={v => this.setState({_switch: v}, () => sceneChange(area, v ? 1 : 4))}/>
				</div>
				<div style={{display: selected === 'brightnessBg' ? 'block' : 'none'}}>
					<Brightness  _switch={_switch}
                       values={colorBrightness}
                       onChange={v => this.setState({brightness: v})}
                       onFetch={() => this.fetchLighting()}
                       onSwitch={v => this.setState({_switch: v}, () => sceneChange(area, v ? 1 : 4))}/>
				</div>
        {
          this.state.debugger && <div className={'debugger'}>
            <p>HSL: 色相：{color.hsl.h.toFixed(0)}    饱和度：{color.hsl.s.toFixed(0)}    亮度：{brightness.toFixed(0)}</p>
            <p>RGB: R：{color.rgb.r}->{Math.round(color.rgb.r/2.55)}   G：{color.rgb.g}->{Math.round(color.rgb.g/2.55)}    B：{color.rgb.b}->{Math.round(color.rgb.b/2.55)}</p>
            <p style={{color: color.htmlColor}}>Hex: {color.htmlColor}</p>
            <p>开关状态： {_switch ? '开' : '关'}</p>
          </div>
        }
        </div>
        {this.state.agent === 'pc' && <div className={'edit'}>
          <div><a href={'/temperature'}><button>色温</button></a>  <a href={'/brightness'}><button>亮度</button></a></div>
          <div />
          <div><label>区域:</label><input value={this.state.area} onChange={e => this.setState({area: e.target.value})}/></div>
          <div><label>通道 - R:</label><input value={this.state.channel.r} onChange={e => this.setState({channel: {...this.state.channel, r: e.target.value}})}/></div>
          <div><label>通道 - G:</label><input value={this.state.channel.g} onChange={e => this.setState({channel: {...this.state.channel, g: e.target.value}})}/></div>
          <div><label>通道 - B:</label><input value={this.state.channel.b} onChange={e => this.setState({channel: {...this.state.channel, b: e.target.value}})}/></div>
          <Scene setScene={scene => sceneChange(area, scene)}/>
        </div>}
			</div>
		);
	}

	fetchLighting() {
	  const {color, channel, area, brightness} = this.state;
    let {rgb} = color;
	  if(this.temp.r !== rgb.r || this.temp.g !== rgb.g || this.temp.b !== rgb.b || this.temp.brightness !== brightness) {
      this.temp = rgb;
      this.temp.brightness = brightness;
      rgb = {r: Math.round(rgb.r / 2.55 * brightness / 100), g: Math.round(rgb.g / 2.55 * brightness / 100), b: Math.round(rgb.b / 2.55 * brightness / 100)};
      colorChange(area, {r: channel.r, g: channel.g, b: channel.b}, rgb);
    }
  }
}
