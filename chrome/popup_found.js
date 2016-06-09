var reportURL = "http://localhost:7677/reportPrice/";

var myTab = null;
var mySearchId = null;

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

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.hasOwnProperty('vs_column')) { // from the hook
    if (request.tab==myTab) {
      // it's for me
      if (request.search_id != mySearchId) {
        mySearchId = request.search_id;
        resetTable();
      }
      
//      $('#status').append('<p>Tab:'+myTab+' search_id:'+request.search_id+' Got data for '+request.vs_column+'</p>');
      addColumn(request.vs_column, request.data);
//      chrome.runtime.sendMessage({"vs_price": myTab, "query_url":request.query_url}, function(response) {
//      
//      });
    }
  }
});

var allColumns = {};  

function resetTable() {
  allColumns = {};
  $("#price_table").html("");
}

var allColumns = {};
    
var maxRows = 10;
function addColumn(name, data) {
  allColumns[name] = data;
  var users = [];
  for (var u in allColumns) {
    users.push(u);
    console.log("Adding user "+u+" length "+allColumns[u].length);
  }

  var s = '<tr>';
  for (var uidx in users) {
    s+='<th colspan=2>'+users[uidx]+'</th>';
  }
  s+='</tr>';
  $("#price_table").html(s);

  for (var i = 0; i < maxRows; i++) {
    s = '<tr>';
    for (var uidx in users) {
      var u = users[uidx];
      var name = "";
      var price = "";
      if (i < allColumns[u].length) {
//        console.log(JSON.stringify(allColumns[u][i]));
        name = allColumns[u][i]["name"];
        price = allColumns[u][i]["price"];
      }
      s+='<td>'+name+'</td><td>'+price+'</td>';
    }
    s+='</tr>';
    $("#price_table").append(s);
  }
  
//  $('#status').append('<pre>'+JSON.stringify(data)+'</pre>');
//  $('#status').append('<pre>'+data.length+'</pre>');
//  var dIdx = 0;
//  $("#price_table thead tr").append('<th colspan="2">'+name+'</th>');
//  $("#price_table tbody tr").each(function() {
//    var name = "";
//    var price = "";
//    if (dIdx <= data.length) {
//      name = data[dIdx].name;
//      price = data[dIdx].price;
//    }
//    $(this).append('<td>'+name+'</td><td>'+price+'</td>')
//    dIdx++;
//  });
  
//  while(dIdx < data.length) {
//    var name = data[dIdx].name;
//    var price = data[dIdx].price;
//    $('#price_table body').append('<tr><td>'+name+'</td><td>'+price+'</td></tr>')
//    dIdx++;    
//  }
  
}
    
document.addEventListener('DOMContentLoaded', function() {
  console.log("VS popup loaded");
  getCurrentTab();
});
