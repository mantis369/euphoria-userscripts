var css = [
            "time.highlight { border-right:5px #0F0 solid!important; box-sizing:border-box; }",
            "div.counter-display { background:#0F0; border:2px green solid; color:black; font-family:monospace; font-size:14px; padding:0 2px 0 0; position:absolute; right:150px; text-align:center; top:36px; width:60px; z-index:100; }"
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

var counter_div = document.createElement("div");
    counter_div.className = "counter-display";
document.body.appendChild(counter_div);    

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
        screen_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        offset,
        upcount = 0,
        downcount = 0,
        unread_count = 0,
        times = document.querySelectorAll("time");
    for (i = 0; i < times.length; i++) {
        time_t = new Date(times[i].getAttribute("datetime"));
        delta = last_t - time_t;
        is_new = (delta < 60000);
        if (!no_highlight) {
            times[i].className = (is_new) ? "highlight" : "";
        }
        if (is_new) {
            offset = computeOffsetTop(times[i]);
            unread_count++;
            if (offset < scroll_top) {
                upcount++;
            } else if (offset > (scroll_top + screen_height)) {
                downcount++;
            }
        }
    }
    counter_div.innerHTML = [upcount, unread_count, downcount].join("|"); 
}

var observer = new window.MutationObserver(function(mutations) {
    annotate();
});
observer.observe(document.querySelector("div.message-list"), { childList: true, subtree: true });

container.addEventListener("scroll", function() { annotate(true); });

annotate();
