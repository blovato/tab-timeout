
export const getTimeoutAlarmName = (tabId) => `tab:${tabId}-timeout-alarm`;
export const getIntervalAlarmName = (tabId) => `tab:${tabId}-interval-alarm`;
/**
 * Create a new alarm
 *
 * @param name {String}
 * @param options {Object}
 */
export const create = (name, options = {}) => {
  chrome.alarms.create(name+'', options);
};

/**
 * Get an alarm
 *
 * @param name {String}
 * @return {Promise}
 */
export const get = (name) => {
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
  return get(name);
};

/**
 * Clear an alarm
 *
 * @param name {String}
 * @return {Promise}
 */
export const clear = (name) => {
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
  return clear(intervalAlarmName);
};

/**
 * Cancels timeout alarm by tabId
 *
 * @param tabId {Number}
 * @return {Promise}
 */
export const clearTimeoutAlarm = (tabId) => {
  const timeoutAlarmName = getTimeoutAlarmName(tabId);
  return clear(timeoutAlarmName);
};

/**
 * Register a one time alarm event,
 * The promise will resolve if the alarm name is called
 *
 * @param name {String}
 * @return {Promise}
 */
export const onceAlarm = (name) => {
  return new Promise((resolve) => {
    chrome.alarms.onAlarm.addListener((alarm) => {
      if (alarm.name === name) {
        resolve(alarm);
      }
    });
  });
};

/**
 * Create a new alarm and register a one time callback for it
 *
 * @param tabId {String}
 * @param delayInMs {Number}
 * @return {Promise}
 */
export const startTimeoutAlarm = (tabId, delayInMs) => {
  const name = getTimeoutAlarmName(tabId);
  create(name, { when: Date.now() + delayInMs });
  return onceAlarm(name);
};

/**
 * Create a reoccurring alarm and register a callback for it
 *
 * @param tabId {Number}
 * @param callback {Function}
 */
export const startIntervalAlarm = (tabId, callback) => {
  const name = getIntervalAlarmName(tabId);
  create(name, { periodInMinutes: 1 });
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === name) {
      callback(alarm);
    }
  });
};
