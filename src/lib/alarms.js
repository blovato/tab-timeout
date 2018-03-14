
export const getTimeoutAlarmName = tabId => `${tabId}-timeout-alarm`;
export const getIntervalAlarmName = tabId => `${tabId}-interval-alarm`;

export const getTabIdFromAlarmName = name => Number.parseInt(name.slice(0, name.indexOf('-')));

export const isTimeoutAlarm = name => name.includes('-timeout-alarm');
export const isIntervalAlarm = name => name.includes('-interval-alarm');

/**
 * Create a new alarm
 *
 * @param name {String}
 * @param options {Object}
 */
export const createAlarm = (name, options = {}) => {
  chrome.alarms.create(name+'', options);
};

/**
 * Get an alarm
 *
 * @param name {String}
 * @return {Promise}
 */
export const getAlarm = (name) => {
  return new Promise((resolve) => {
    chrome.alarms.get(name+'', resolve);
  });
};

/**
 * Get the timeout alarm
 *
 * @param tabId {String}
 * @return {Promise}
 */
export const getTimeoutAlarm = (tabId) => {
  const name = getTimeoutAlarmName(tabId);
  return getAlarm(name);
};

/**
 * Clear an alarm
 *
 * @param name {String}
 * @return {Promise}
 */
export const clearAlarm = (name) => {
  return new Promise((resolve, reject) => {
    chrome.alarms.clear(name, (wasCleared) => {
      if (wasCleared) {
        resolve();
      }
      reject()
    });
  });
};

/**
 * Cancels interval alarm by tabId
 *
 * @param tabId {Number}
 * @return {Promise}
 */
export const clearIntervalAlarm = (tabId) => {
  const intervalAlarmName = getIntervalAlarmName(tabId);
  return clearAlarm(intervalAlarmName);
};

/**
 * Cancels timeout alarm by tabId
 *
 * @param tabId {Number}
 * @return {Promise}
 */
export const clearTimeoutAlarm = (tabId) => {
  const timeoutAlarmName = getTimeoutAlarmName(tabId);
  return clearAlarm(timeoutAlarmName);
};
