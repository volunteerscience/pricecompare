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


$(function() {
  console.log("here2a");
//  $('.hotelName').each(function(idx) {
//    console.log($(this).text());
//  });
  
  $(document).ajaxSend(function(e, xhr, opt){
    console.log('ajaxSend');
  }); 

  $(document).ajaxSuccess(function(e, xhr, opt){
    console.log('ajaxSuccess');
  }); 

  $(document).ajaxError(function(e, xhr, opt){
    console.log('ajaxError');
  }); 
  
  $.ajaxSetup({
    beforeSend: function() {
      console.log('ajaxSetup beforeSend');
    }
  });
});