function threads(flag="") {
    if(flag != "") {
        flag = "#" + flag + " "; 
    }
    var resolver = flag + '.stat.view-count';
    var p = $(resolver).parent();
    var ajaxRequests = []
    for(var i=0;i < 2; i++) {
        ajaxRequests.push(jQuery.get(p[i].href));
    }
    var p1 = $(resolver);
    for(var i=0; i < p1.length; i++) {
        var childGuest = document.createElement("span");
        childGuest.className = "yt-spinner-img  yt-sprite";
        p1[i].parentNode.insertBefore(childGuest, p1[i].nextSibling);
    }
    jQuery.when.apply(jQuery, ajaxRequests).done(function () {
        for (var i=0; i < 2; i++) {
            result = $(arguments[i][0]).find(".like-button-renderer-like-button-unclicked").text();
            var childGuest = document.createElement("span");
            childGuest.className = "stat";
            childGuest.innerHTML = result;
            p1[i].parentNode.insertBefore(childGuest, p1[i].nextSibling);
            $(childGuest).next().remove();
        }
    });
}

function dom_changes_recorder() {
    var target = document.getElementById('watch-more-related');
    var observer = new MutationObserver(function(mutations) {  
      mutations.forEach(function(mutation) {
        if(mutation.type == 'childList') {
            threads("watch-more-related");
        }
      });    
    });
    var config = { attributes: true, childList: true, characterData: true };
    observer.observe(target, config);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var curr = request.data.url
    dom_changes_recorder();
    threads();
});
