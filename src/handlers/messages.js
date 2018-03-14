import {
  createAlarm,
  getIntervalAlarmName,
  getTimeoutAlarmName,
  clearIntervalAlarm,
  clearTimeoutAlarm,
} from '../lib/alarms';
import {
  addBadge,
  removeBadge,
} from '../lib/badge';


const logger = {
  name: 'logger',
  shouldCall: () => true, // always call
  fn: message => console.info('onMessage:', message), // eslint-disable-line no-console
};

const onStartTabTimeout = {
  name: 'tabRemovalTimeoutStart',
  shouldCall: message => !!message.tabRemovalTimeoutStart,
  fn: async ({ tabId, timeout }) => {
    // initialize badge
    addBadge(tabId, timeout / 60 / 1000);
    // create interval alarm
    createAlarm(getTimeoutAlarmName(tabId), { when: Date.now() + timeout });
    // create timeout alarm
    createAlarm(getIntervalAlarmName(tabId), { periodInMinutes: 1 });
  },
};

const onCancelTabTimeout = {
  name: 'tabRemovalTimeoutCancel',
  shouldCall: message => !!message.tabRemovalTimeoutCancel,
  fn: async ({ tabId }) => {
    // clean up badge
    removeBadge(tabId);
    // clean up alarms
    await clearTimeoutAlarm(tabId);
    await clearIntervalAlarm(tabId);
  },
};


const messageHandlers = [
  logger,
  onStartTabTimeout,
  onCancelTabTimeout,
];

const registerMessageHandler = (handler) => {
  chrome.runtime.onMessage.addListener(async (message) => {
    if (typeof message === 'object' && handler.shouldCall(message)) {
      await handler.fn(message[handler.name] || message);
    }
  });
};

export default () => messageHandlers.forEach(registerMessageHandler);
