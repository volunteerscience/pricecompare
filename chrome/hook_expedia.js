//alert("mi mi mi mi");

//$.ajaxSetup({
//  beforeSend: function(){
//    alert("foo");
//  }
//});
//
//$(document).bind("ajaxSend", function(){
//  alert("bar");
//});

console.log("here1")

//
$(function() {
  console.log("VS Expedia Page Loaded");
//  $('.hotelName').each(function(idx) {
//    console.log($(this).text());
//  });
  
//  $(document).ajaxSend(function(e, xhr, opt){
//    console.log('ajaxSend');
//  }); 
//
  $(document).ajaxSuccess(function(e, xhr, opt){
    console.log('ajaxSuccess');
  }); 
//
//  $(document).ajaxError(function(e, xhr, opt){
//    console.log('ajaxError');
//  }); 
//  
//  $.ajaxSetup({
//    beforeSend: function() {
//      console.log('ajaxSetup beforeSend');
//    }
//  });
  
//  chrome.runtime.sendMessage({"vs_prices": "hello"}, function(response) {
  var vs_prices = [ {"name":"Apple","price":"1.55"}, {"name":"Orange","price":"2.55"}  ];
  chrome.runtime.sendMessage({
    "vs_prices": vs_prices, 
    "query_url":window.location.href, 
    "search_id" : Math.floor(Math.random() * 99999999)}, 
    
    function(response) {
//    alert(response.uploaded);
  });
});