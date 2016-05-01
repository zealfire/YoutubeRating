function threads() {
    console.log("enterted in threads");
    var data = $(document).find(".like-button-renderer-like-button-unclicked").text();
    var p = $('.stat.view-count').parent();
    var ajaxRequests = []
    for(var i=0;i < p.length; i++) {
        ajaxRequests.push(jQuery.get(p[i].href));
    }
    var p1 = document.getElementsByClassName('stat view-count');
    jQuery.when.apply(jQuery, ajaxRequests).done(function () {
        for (var i=0; i < arguments.length; i++) {
            result = $(arguments[i][0]).find(".like-button-renderer-like-button-unclicked").text();
            var childGuest = document.createElement("span");
            childGuest.className = "stat";
            childGuest.innerHTML = result;
            console.log(result);
            p1[i].parentNode.insertBefore(childGuest, p1[i].nextSibling);
        }
    });
}
//var prev = window.location.href;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("getElementsByClassName");
  var curr = request.data.url
 // if (request.data.url != prev && request.data.url.indexOf('watch') > -1 ){
    console.log("URL CHANGED: " + request.data.url);
    threads();
    prev = curr
    console.log("new prev = " + prev)
  //}
});