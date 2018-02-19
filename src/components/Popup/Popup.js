import React, { Component } from 'react';
import { getCurrentActiveTab } from '../../lib/tabs';
import { startTabTimeout, cancelTabTimeout } from '../../lib/messages';
import { getTimeoutAlarm } from '../../lib/alarms';
import Duration from '../Duration';
import './popup.less';

export default class Popup extends Component {
  state = {
    tab: {},
    timeout: 0,
    alarm: {},
  };

  componentWillMount = async () => {
    const tab = await getCurrentActiveTab() || {};
    const alarm = await getTimeoutAlarm(tab.id) || {};
    this.setState({ tab, alarm });
  };

  onChange = async (e) => {
    const timeout = +e.target.value;
    this.setState({ timeout });
  };

  onStart = async () => {
    const { tab, timeout } = this.state;
    await startTabTimeout(tab.id, timeout * 60 * 1000);
    const alarm = await getTimeoutAlarm(tab.id);
    this.setState({ alarm });
  };

  onCancel = async () => {
    const { tab } = this.state;
    await cancelTabTimeout(tab.id);
    this.setState({ alarm: {} });
  };

  render() {
    const { timeout, alarm } = this.state;
    return (
      <div className="popup">
        {alarm.scheduledTime ? (
          <div>
            <Duration alarm={alarm} />
            <button onClick={this.onCancel}>Stop</button>
          </div>
        ) : (
          <div>
            <p>In how many minutes would you like this tab to close?</p>
            <input type="number" onChange={this.onChange} value={timeout} />
            <button onClick={this.onStart}>Start</button>
          </div>
        )}
      </div>
    );
  }
}
