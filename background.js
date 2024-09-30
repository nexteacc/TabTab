chrome.tabs.onCreated.addListener(function(tab) {
  chrome.storage.local.get('selectedHomepage', function(data) {
    if (data.selectedHomepage && tab.url === 'chrome://newtab/') {
      chrome.tabs.update(tab.id, { url: data.selectedHomepage });
    }
  });
});
