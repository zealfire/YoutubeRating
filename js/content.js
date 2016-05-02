function threads(flag="") {
    if(flag != "") {
        flag = "#" + flag + " "; 
    }
    var resolver = flag + '.stat.view-count';
    var p = $(resolver).parent();
    var ajaxRequests = []
    for(var i=0;i < p.length; i++) {
        $(p).css('min-height', '88px');
        ajaxRequests.push(jQuery.get(p[i].href));
    }
    var p1 = $(resolver);
    for(var i=0; i < 2; i++) {
        var childGuest = document.createElement("span");
        childGuest.className = "yt-spinner-img  yt-sprite";
        p1[i].parentNode.insertBefore(childGuest, p1[i].nextSibling);
    }
    jQuery.when.apply(jQuery, ajaxRequests).done(function () {
        for (var i=0; i < 2; i++) {
            dislike_result = $(arguments[i][0]).find(".like-button-renderer-dislike-button-unclicked").text();
            var childGuest_dislike = document.createElement("span");
            childGuest_dislike.className = "stat like-button-renderer-dislike-button yt-uix-button-has-icon no-icon-markup yt-uix-button yt-uix-button-icon-wrapper yt-uix-button-has-icon.no-icon-markup yt-uix-button-opacity";
            childGuest_dislike.innerHTML = dislike_result;
            childGuest_dislike.style.marginLeft = "-1%";
            childGuest_dislike.style.marginTop = "1%";
            childGuest_dislike.style.display = "inline-block";
            p1[i].parentNode.insertBefore(childGuest_dislike, p1[i].nextSibling);
            $(childGuest_dislike).next().remove();

            like_result = $(arguments[i][0]).find(".like-button-renderer-like-button-unclicked").text();
            var childGuest = document.createElement("span");
            childGuest.className = "stat like-button-renderer-like-button yt-uix-button-has-icon no-icon-markup yt-uix-button yt-uix-button-opacity";
            childGuest.innerHTML = like_result;
            childGuest.style.marginLeft = "-4%";
            childGuest.style.display = "inline-block";
            p1[i].parentNode.insertBefore(childGuest, p1[i].nextSibling);
            

            
        }
    });
}

function dom_changes_recorder() {
    var target = document.getElementById('watch-more-related');
    var observer = new MutationObserver(function(mutations) {  
      mutations.forEach(function(mutation) {
        if(mutation.type == 'childList') {
            if (mutation.addedNodes.length > 1) {
                threads("watch-more-related");
            }
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
