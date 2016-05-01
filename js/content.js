function threads() {
    var data = $(document).find(".like-button-renderer-like-button-unclicked").text();
    var p = $('.stat.view-count').parent();
    var ajaxRequests = []
    for(var i=0;i < p.length; i++) {
        ajaxRequests.push(jQuery.get(p[i].href));
    }
    var p1 = document.getElementsByClassName('stat view-count');
    for(var i=0; i < p1.length; i++) {
        var childGuest = document.createElement("span");
        childGuest.className = "yt-spinner-img  yt-sprite";
        p1[i].parentNode.insertBefore(childGuest, p1[i].nextSibling);
    }
    jQuery.when.apply(jQuery, ajaxRequests).done(function () {
        for (var i=0; i < p.length; i++) {
            result = $(arguments[i][0]).find(".like-button-renderer-like-button-unclicked").text();
            var childGuest = document.createElement("span");
            childGuest.className = "stat";
            childGuest.innerHTML = result;
            p1[i].parentNode.insertBefore(childGuest, p1[i].nextSibling);
            $(childGuest).next().remove();
        }
    });
}
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var curr = request.data.url
    threads();
});
