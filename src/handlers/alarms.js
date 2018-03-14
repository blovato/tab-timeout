import {
  clearIntervalAlarm,
  getTabIdFromAlarmName,
  isIntervalAlarm,
  isTimeoutAlarm,
} from '../lib/alarms';
import {
  removeTab,
} from '../lib/tabs';
import {
  decrementBadge,
} from '../lib/badge';


const logger = {
  shouldCall: () => true, // always call
  fn: alarm => console.info('onAlarm:', alarm), // eslint-disable-line no-console
};

const onIntervalAlarm = {
  shouldCall: ({ name }) => isIntervalAlarm(name),
  fn: ({ name }) => {
    const tabId = getTabIdFromAlarmName(name);
    decrementBadge(tabId);
  },
};

const onTimeoutAlarm = {
  shouldCall: ({ name }) => isTimeoutAlarm(name),
  fn: async ({ name }) => {
    const tabId = getTabIdFromAlarmName(name);
    await clearIntervalAlarm(tabId);
    await removeTab(tabId);
  },
};


const alarmHandlers = [
  logger,
  onIntervalAlarm,
  onTimeoutAlarm,
];

const registerAlarmHandler = (handler) => {
  chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (handler.shouldCall(alarm)) {
      await handler.fn(alarm);
    }
  });
};

export default () => alarmHandlers.forEach(registerAlarmHandler);
