import {
  startIntervalAlarm,
  startTimeoutAlarm,
  clearIntervalAlarm,
  clearTimeoutAlarm,
} from './lib/alarms';
import { removeTab } from './lib/tabs';
import { onMessage } from './lib/messages';
import {
  addBadge,
  decrementBadge,
  removeBadge,
} from './lib/badge';


const onStartTabTimeoutMessageHandler = async ({ tabRemovalTimeoutStart }) => {
  if (tabRemovalTimeoutStart) {
    const { tabId, timeout } = tabRemovalTimeoutStart;
    // initialize badge and set interval to update the badge every minute
    addBadge(tabId, timeout / 60 / 1000);
    startIntervalAlarm(tabId, () => decrementBadge(tabId));
    // start a timeout alarm for the tab to be removed
    await startTimeoutAlarm(tabId, timeout);
    // when timer ends remove the interval alarm for the badge
    await clearIntervalAlarm(tabId);
    // then remove the tab
    await removeTab(tabId);
  }
};

const onCancelTabTimeoutMessageHandler = async ({ tabRemovalTimeoutCancel }) => {
  if (tabRemovalTimeoutCancel) {
    const { tabId } = tabRemovalTimeoutCancel;
    // clean up badge
    removeBadge(tabId);
    // clean up alarms
    await clearTimeoutAlarm(tabId);
    await clearIntervalAlarm(tabId);
  }
};

const messageHandlers = [
  onStartTabTimeoutMessageHandler,
  onCancelTabTimeoutMessageHandler,
];

messageHandlers.forEach(fn => onMessage.addListener(fn));
