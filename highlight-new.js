var css = [
            "div.messages-container { padding-left:7px!important; }",
            "time { left:-20px!important; width:5px!important; }",
            "time.highlight { background:red!important; }",
            "div.topcount { border:1px #CCC solid; color:red; position:absolute; right:50px; text-align:center; top:10px; width:40px; z-index:100; }"
          ].join("\n");
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

var topcount = document.createElement("div");
    topcount.className = "topcount";
document.body.appendChild(topcount);    

function computeOffsetTop(element) {
    var offset = 0;
    while (element) {
        offset += element.offsetTop;
        element = element.offsetParent;
    }
    return offset;
}

var container = document.querySelector(".messages-container");

function annotate(no_highlight) {
    var i, time_t, delta,
        is_new = false,
        scroll_top = container.scrollTop,
        offscreen_count = 0,
        times = document.querySelectorAll("time");
    for (i = 0; i < times.length; i++) {
        time_t = new Date(times[i].getAttribute("datetime"));
        delta = last_t - time_t;
        is_new = (delta < 300000);
        if (!no_highlight) {
            times[i].className = (is_new) ? "highlight" : "";
            times[i].innerHTML = "";
            times[i].parentNode.querySelector("span.nick")
                    .setAttribute("title", time_t.toLocaleString());
        }
        if (is_new && (computeOffsetTop(times[i]) < scroll_top)) {
            offscreen_count++;
        }
    }
    topcount.innerHTML = "^ " + offscreen_count + " ^";
}

var observer = new window.MutationObserver(function(mutations) {
    annotate();
});
observer.observe(document.querySelector("div.message-list"), { childList: true, subtree: true });

container.addEventListener("scroll", function() { annotate(true); });

annotate();
