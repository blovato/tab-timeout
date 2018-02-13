
export const queryTabs = (query = {}) => {
  return new Promise((resolve) => {
    chrome.tabs.query(query, resolve);
  });
};

export const getCurrentActiveTab = async () => {
  const currentActive = await queryTabs({ active: true, currentWindow: true });
  if (currentActive.length) {
    return currentActive[0];
  }
  return null;
};

export const removeTab = (tabId) => {
  return new Promise((resolve) => {
    chrome.tabs.remove(tabId, resolve);
  });
};
