import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './duration.less';

export default class Duration extends Component {
  static propTypes = {
    alarm: PropTypes.shape({
      scheduledTime: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    duration: '',
  };

  componentDidMount() {
    this.setDuration();
    this.intervalId = setInterval(this.setDuration, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  setDuration = () => {
    const duration = this.formatDuration(this.getDuration());
    this.setState({ duration });
  };

  getDuration = () => {
    const { scheduledTime } = this.props.alarm;
    const now = moment();
    const end = moment(scheduledTime);
    return moment.duration(end.diff(now));
  };

  formatDuration = (duration) => {
    const s = duration.seconds();
    const m = duration.minutes();
    return `${m} minute${m === 1 ? '' : 's'} ${s} second${s === 1 ? '' : 's'}`;
  };

  render() {
    return (
      <p className="duration">{this.state.duration}</p>
    );
  }
}
