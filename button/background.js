// inject content-script on button push

function updateState() {
  let current = localStorage.getItem("enabled");
  if (current === 'on') {
    localStorage.setItem("enabled", 'off');
    browser.browserAction.setIcon({ path: `icons/icon-off.png` });
    browser.tabs.executeScript(null, { code: "location.reload();" });
  }
  else {
    localStorage.setItem("enabled", 'on');
    browser.tabs.executeScript(null, { file: "sub-emoji.js" });
    browser.browserAction.setIcon({ path: `icons/icon-on.png` });
  }
}

browser.browserAction.setIcon({ path: `icons/icon-off.png` });
browser.browserAction.onClicked.addListener(updateState);

console.log('script: background.js');