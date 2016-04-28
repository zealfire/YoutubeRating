/* When the browser-action button is clicked... */
//document.getElementsByTagName("body")[0].innerHTML = "hello";
//alert("Code Executed ... ");
$(document).ready(function() {
    /*var xhr = new XMLHttpRequest();
    xhr.open("GET", "document.location.href", true);
    xhr.send(); 
    xhr.onreadystatechange = function() {
	    var json = JSON.parse(xhr.responseText);
	    populateDiv(json);    
    };
    var populateDiv = function(json) {
		for (i = 0, len = json.length; i < len; i++) {     
		    e = json[i];
		 	document.getElementById('try')
		            .appendChild(createNode(e,i));
		}
    };      */
    var data = $(document).find(".like-button-renderer-like-button-unclicked").text();
    console.log("hello");
    //$(body).html(data);
    console.log(data);
    alert("asdas"+data);
});