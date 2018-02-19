/**
 * Send a message from content script or popup to background script
 *
 * @param message {Object}
 * @return {Promise}
 */
export const sendMessage = (message) => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(message, (response) => {
      resolve(response);
    });
  });
};

/**
 * Helper function to send message to background to start the tab's timeout
 *
 * @param tabId
 * @param timeout
 * @return {Promise}
 */
export const startTabTimeout = (tabId, timeout) => {
  return sendMessage({ tabRemovalTimeoutStart: { tabId, timeout } });
};

/**
 * Helper function to send message to background to cancel the tab's timeout
 *
 * @param tabId
 * @param timeout
 * @return {Promise}
 */
export const cancelTabTimeout = (tabId) => {
  return sendMessage({ tabRemovalTimeoutCancel: { tabId } });
};

export const { onMessage } = chrome.runtime;
