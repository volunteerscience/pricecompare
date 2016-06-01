/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */

var myTab = null;

function getCurrentTab() {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
//    var url = tab.url;
    myTab = tab.id;
    
    chrome.runtime.sendMessage({"vs_column_rebroadcast": myTab}, function(response) {
      
    });
  });
}

function renderStatus(statusText) {
//  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  console.log("VS popup loaded");
  getCurrentTabUrl(function(url) {
    if (url.indexOf("https://www.expedia.com/") == 0) {
      $('#status').html('Please Do a Search on Expedia.');    
      return;
    }
    $('#status').html('This page is incompatible with Price Personalization.');
    
    
    
//    // Put the image URL in Google search.
//    renderStatus('Performing Google Image search for ' + url);
//
//    getImageUrl(url, function(imageUrl, width, height) {
//
//      renderStatus('Search term: ' + url + '\n' +
//          'Google image search result: ' + imageUrl);
//      var imageResult = document.getElementById('image-result');
//      // Explicitly set the width/height to minimize the number of reflows. For
//      // a single image, this does not matter, but if you're going to embed
//      // multiple external images in your page, then the absence of width/height
//      // attributes causes the popup to resize multiple times.
//      imageResult.width = width;
//      imageResult.height = height;
//      imageResult.src = imageUrl;
//      imageResult.hidden = false;
//
//    }, function(errorMessage) {
//      renderStatus('Cannot display image. ' + errorMessage);
//    });
  });
});
