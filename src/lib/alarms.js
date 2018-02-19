
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
 * Cancel an alarm
 *
 * @param name {String}
 * @return {Promise}
 */
export const clear = (name) => {
  return new Promise((resolve) => {
    chrome.alarms.clear(name+'', resolve);
  });
};

/**
 * Register an alarm event,
 * The promise will resolve if the alarm name is called
 *
 * @param name {String}
 * @return {Promise}
 */
export const onAlarm = (name) => {
  return new Promise((resolve) => {
    chrome.alarms.onAlarm.addListener((alarm) => {
      if (alarm.name === name+'') {
        resolve(alarm);
      }
    });
  });
};

/**
 * Create a new alarm and register a callback for it
 *
 * @param name {String}
 * @param delayInMs {Number}
 * @return {Promise}
 */
export const timeoutInMs = (name, delayInMs) => {
  create(name, { when: Date.now() + delayInMs });
  return onAlarm(name)
};
