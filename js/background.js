chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
   var url = tab.url;          
   if (url !== undefined && changeInfo && changeInfo.status == "complete") {
        chrome.tabs.sendMessage(tabId, {data: tab}, function(response) {});
   }
});