// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


//function loadIntoPage() {
//  chrome.tabs.executeScript(null, {"file": "jquery-2.2.0.min.js"});
//  chrome.tabs.executeScript(null, {"file": "hook_expedia.js"});
//}

var reportURL = "localhost:7677/reportPrice/";

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//  loadIntoPage();
  if (tab.url.indexOf("https://www.expedia.com/") == 0) {
//    chrome.browserAction.setBadgeBackgroundColor([255,0,0,255]);
//    chrome.browserAction.setBadgeText("foo");
//    chrome.browserAction.setIcon("images/icon_g19.png");
//    chrome.browserAction.setIcon({
//          "tabId": tabId,
//          "imageData": {
//            "19": "images/icon_g19.png",
//            "38": "images/icon_g38.png"}});
    if (tab.url.indexOf("https://www.expedia.com/Hotel-Search") == 0) {
      chrome.tabs.executeScript(tabId, {"file": "jquery-2.2.0.min.js"});
      chrome.tabs.executeScript(tabId, {"file": "hook_expedia.js"});
      $("#bgLog").append("<p>hi "+tab.url+"</p>");
      chrome.browserAction.enable(tabId);
      return;
    }
    
  }
//  chrome.browserAction.disable(tabId);
});

chrome.webRequest.onCompleted.addListener(
    function(details) {
//      var leng = "?";
//      try {
//        leng = details.responseHeaders.
//      }
      $("#bgLog").append("<p>"+details.method+" "+details.url+"</p>");
    },
    {urls:["https://www.expedia.com/Hotel-Search*"]
});


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.hasOwnProperty('vs_prices')) {
        // sender.tab
//        chrome.browserAction.setIcon("images/icon_g19.png");
//        chrome.browserAction.setIcon({path: "images/icon_g19.png"});
//        console.log("vs_prices tab:"+sender.tab.id)
        chrome.browserAction.setIcon({
          path : {
            "19": "images/icon_g19.png",
            "38": "images/icon_g38.png"
          },
          tabId: sender.tab.id
        });
        
//        chrome.browserAction.setIcon({path: "images/icon_g19.png",  tabId: sender.tab});
        
        
//        sendResponse({"uploaded": request.vs_prices[0]["name"]});        
//        sendResponse({uploaded: "success"});        
      }
//      console.log(sender.tab ?
//                  "from a content script:" + sender.tab.url :
//                  "from the extension");
//      if (request.vs_prices == "hello")
//        sendResponse({farewell: "goodbye"});
});

//// When the extension is installed or upgraded ...
//chrome.runtime.onInstalled.addListener(function() {
//  // Replace all rules ...
//  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//    // With a new rule ...
//    chrome.declarativeContent.onPageChanged.addRules([
//      {
//        // That fires when a page's URL contains a 'g' ...
//        conditions: [
//          new chrome.declarativeContent.PageStateMatcher({
//            pageUrl: { hostEquals: 'www.expedia.com', schemes: ['https'] },
//          })
//        ],
//        // And shows the extension's page action.
//        actions: [ new chrome.declarativeContent.ShowPageAction() ]
//      }
//    ]);
//  });
//});
//
//chrome.pageAction.onClicked.addListener(function(tab) {
//  loadIntoPage();
////  chrome.pageAction.show(tab.id);
//});