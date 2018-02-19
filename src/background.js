import * as alarms from './lib/alarms';
import { removeTab } from './lib/tabs';
import { onMessage } from './lib/messages';


const onStartTabTimeoutMessageHandler = ({ tabRemovalTimeoutStart }, sender, next) => {
  if (tabRemovalTimeoutStart) {
    const { tabId, timeout } = tabRemovalTimeoutStart;
    alarms
      .timeoutInMs(tabId, timeout)
      .then(() => removeTab(tabId))
      .then(next);
  }
};

const onCancelTabTimeoutMessageHandler = ({ tabRemovalTimeoutCancel }, sender, next) => {
  if (tabRemovalTimeoutCancel) {
    const { tabId } = tabRemovalTimeoutCancel;
    alarms
      .clear(tabId)
      .then(next);
  }
};

const onMessageHandlers = [
  onStartTabTimeoutMessageHandler,
  onCancelTabTimeoutMessageHandler,
];

onMessageHandlers.forEach(fn => onMessage.addListener(fn));
