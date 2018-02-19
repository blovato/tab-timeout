
/**
 * Query all tabs
 *
 * @param query {Object}
 * @return {Promise}
 */
export const queryTabs = (query = {}) => {
  return new Promise((resolve) => {
    chrome.tabs.query(query, resolve);
  });
};

/**
 * Get tab by id
 *
 * @param tabId {Number}
 * @return {Promise}
 */
export const getTabById = (tabId) => {
  return new Promise((resolve, reject) => {
    queryTabs().then((tabs) => {
      const tab = tabs.find(tab => tab.id === tabId);
      if (tab) {
        resolve(tab);
      }
      reject(`No tab with id: ${tabId}`);
    });
  });
};

/**
 * Get the current active tab
 *
 * @return {Promise}
 */
export const getCurrentActiveTab = async () => {
  const currentActive = await queryTabs({ active: true, currentWindow: true });
  if (currentActive.length) {
    return currentActive[0];
  }
  return null;
};

/**
 * Remove a tab by id
 *
 * @param tabId {Number}
 * @return {Promise}
 */
export const removeTab = (tabId) => {
  return new Promise((resolve) => {
    chrome.tabs.remove(tabId, resolve);
  });
};
