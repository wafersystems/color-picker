/**
 * date: 2018-02-08 13:43
 * auth: XuQiang
 **/
import React from 'react';

const SCENES = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六'];

export default class extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {scene: 0, values: {}};
  }

  render() {

    return (
      <div className={'scene'}>
        <button onClick={() => this.setState({scene: this.state.scene + 1})}>添加场景</button>
        {
          Array.from({length: this.state.scene}, (v, k) => k).map(s => {
            return <div key={s}>
              <label>场景{SCENES[s]}</label> <input value={this.state.values[s]}
                                                  onChange={e => {
                                                    if (e.target.value.match(/^\d+$/) || e.target.value === '')
                                                      this.setState({
                                                        values: {
                                                          ...this.state.values,
                                                          [s]: e.target.value
                                                        }
                                                      })
                                                  }}/>
              &nbsp;&nbsp;
              <button onClick={() => this.props.setScene(this.state.values[s])} disabled={!this.state.values[s]}>控制
              </button>
            </div>
          })
        }
      </div>
    );
  }
}
