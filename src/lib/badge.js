
const {
  setBadgeBackgroundColor,
  setBadgeText,
  getBadgeText,
} = chrome.browserAction;

export const addBadge = (tabId, text) => {
  setBadgeBackgroundColor({ color: 'red', tabId });
  setBadgeText({ text: text+'', tabId });
};

export const decrementBadge = (tabId) => {
  getBadgeText({ tabId }, (badgeText) => {
    setBadgeText({ text: (badgeText - 1)+'', tabId });
  })
};

export const removeBadge = (tabId) => {
  setBadgeBackgroundColor({ color: [0,0,0,0], tabId });
  setBadgeText({ text: '', tabId });
};
