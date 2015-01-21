var css = "time.highlight { background:red!important; color:white!important; }";
var head = document.head || document.getElementsByTagName("head")[0];
var style = document.createElement("style");
    style.type = "text/css";
if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}
head.appendChild(style);

var last_t = new Date();

Heim.actions.sendMessage.listen(function() {
    last_t = new Date();
}); 

function annotate() {
    var times = document.querySelectorAll("time");
    for (var i = 0; i < times.length; i++) {
        var delta = (last_t - (new Date(times[i].getAttribute("datetime"))));
        times[i].className = (delta < 300000) ? "highlight" : "";
    }
}

var observer = new window.MutationObserver(function(mutations) {
    annotate();
});
observer.observe(document.querySelector("div.message-list"), { childList: true, subtree: true });

annotate();
