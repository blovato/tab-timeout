import React, { Component } from 'react';
import { getCurrentActiveTab } from '../../lib/tabs';
import { setTabTimeout, getTabTimeout } from '../../lib/storage';
import './popup.less';

export default class Popup extends Component {
  state = {
    tab: {},
    timeout: 0,
  };

  componentDidMount = async () => {
    const tab = await getCurrentActiveTab() || {};
    const timeout = await getTabTimeout(tab.id);
    this.setState({ tab, timeout });
  };

  onChange = async (e) => {
    const timeout = e.target.value;
    this.setState({ timeout });
    await setTabTimeout(this.state.tab.id, timeout);
  };

  render() {
    const { tab, timeout } = this.state;
    return (
      <div className="popup">
        <p>When would you like this active tab ({tab.title}) to timeout?</p>
        <input type="number" onChange={this.onChange} value={timeout} />
      </div>
    );
  }
}
