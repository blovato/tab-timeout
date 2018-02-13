
export const set = (item) => {
  return new Promise((resolve) => {
    chrome.storage.sync.set(item, resolve);
  });
};

export const get = (item) => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(item, resolve);
  });
};


const getTabTimeoutKey = tabId => `${tabId}-timeout`;

export const setTabTimeout = (tabId, durationInMs) => {
  const key = getTabTimeoutKey(tabId);
  return set({ [key]: durationInMs });
};

export const getTabTimeout = async (tabId) => {
  const key = getTabTimeoutKey(tabId);
  const timeout = await get(key);
  return +timeout[key] || 0;
};
