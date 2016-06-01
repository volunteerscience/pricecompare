var reportURL = "http://localhost:7677/reportPrice/";

var tabToSearchId = {} // tabId -> search_id
var priceStore = {} // search_id -> col_name -> [ {name, price} ] 

// detect compatible page by url, inject hook
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
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
      console.log("Setting Expedia Hook");
      chrome.tabs.executeScript(tabId, {"file": "jquery-2.2.0.min.js"});
      chrome.tabs.executeScript(tabId, {"file": "hook_expedia.js"});
      $("#bgLog").append("<p>hi "+tab.url+"</p>");
      chrome.browserAction.enable(tabId);
      return;
    }

    // set searchable
    chrome.browserAction.setIcon({
      path : {
        "19": "images/icon_search19.png",
        "38": "images/icon_search38.png"
      },
      tabId: tabId
    });
    return
  }
  
  // set normal
  chrome.browserAction.setIcon({
    path : {
      "19": "images/icon19.png",
      "38": "images/icon38.png"
    },
    tabId: tabId
  });
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


// receive messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.hasOwnProperty('vs_prices')) { // from the hook
    tabToSearchId[sender.tab.id] = request.search_id;
    priceStore[request.search_id] = {}
    priceStore[request.search_id]["You"] = request.vs_prices
    
    // p:popup_found.html;
    chrome.browserAction.setPopup({
      tabId: sender.tab.id,
      popup: 'popup_found.html'
    });
    
    
    // Light up found_icon;
    chrome.browserAction.setIcon({
      path : {
        "19": "images/icon_found19.png",
        "38": "images/icon_found38.png"
      },
      tabId: sender.tab.id
    });
    
    broadcastVsColumn(sender.tab.id,"You");
    
    requestPriceComparisons();
    
    sendResponse({success: "true"});        
    return;
  }
  
  if (request.hasOwnProperty('vs_column_rebroadcast')) { // from the hook
    broadcastVsColumns(request.vs_column_rebroadcast);
    sendResponse({success: "true"});            
  }
});

// to popup
function broadcastVsColumn(tabId, key) {
  var search_id = tabToSearchId[tabId];
  var data = priceStore[search_id][key];
  chrome.runtime.sendMessage({'vs_column': key, 'tab':tabId, 'data':data, 'search_id':search_id}, function(response) {
//    console.log(response.farewell);
  });
}

function broadcastVsColumns(tabId) {
  for (var key in priceStore[tabToSearchId[tabId]]) {
    broadcastVsColumn(tabId, key);
  }
}

function requestPriceComparisons() {
  requestPriceCompare("Generic")
}

function requestPriceCompare(searchUser) {
  var x = new XMLHttpRequest();
  x.open('POST', reportURL);
  x.responseType = 'json';
  x.onload = function() {
  // Parse and process the response from Google Image Search.
    var response = x.response;
//    if (!response || !response.responseData || !response.responseData.results ||
//        response.responseData.results.length === 0) {
//      errorCallback('No response from Google Image search!');
//      return;
//    }
//    var firstResult = response.responseData.results[0];
//    // Take the thumbnail instead of the full image to get an approximately
//    // consistent image size.
//    var imageUrl = firstResult.tbUrl;
//    var width = parseInt(firstResult.tbWidth);
//    var height = parseInt(firstResult.tbHeight);
//    console.assert(
//        typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
//        'Unexpected respose from the Google Image Search API!');
//    callback(imageUrl, width, height);
    console.log("ajax success "+response);
  };
  x.onerror = function() {
    console.log("ajax error");
  };
  x.send();
}

//chrome.browserAction.onClicked.addListener(function(tab) {
//  
//});

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