var css = [
            "time.highlight { border-right:5px #0F0 solid!important; box-sizing:border-box; }",
            ".arrow { display:inline; width:0; height:0; margin:5px; border-left:5px transparent solid; border-right:5px transparent solid; }",
            ".arrow-down { float:right; border-top:5px black solid; }",
            ".arrow-up {  float:left; border-bottom:5px black solid; }",
            "div.counter-display { background:#0F0; border:2px green solid; color:black; font-family:monospace; font-size:14px; padding:0 2px 0 0; position:absolute; right:200px; text-align:center; top:36px; width:120px; z-index:100; }",
            "div.counter-inner { display:inline; width:100px }"
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

function newDiv(className) {
    var div = document.createElement("div");
    if (className) {
        div.className = className;
    }
    return div;
}

var counter_div = newDiv("counter-display");
document.body.appendChild(counter_div);

var arrow_up = newDiv("arrow arrow-up"); 
counter_div.appendChild(arrow_up);

var inner_counter = newDiv("counter-inner");
counter_div.appendChild(inner_counter);

var arrow_down = newDiv("arrow arrow-down"); 
counter_div.appendChild(arrow_down);

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
        user_nick = Heim.chat.store.state.nick,
        scroll_top = container.scrollTop,
        screen_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        offset,
        upcount = 0,
        downcount = 0,
        unread_count = 0,
        times = document.querySelectorAll("time");
    for (i = 0; i < times.length; i++) {
        if (user_nick == times[i].nextSibling.textContent) {
            continue;
        }
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
    inner_counter.innerHTML = [upcount, unread_count, downcount].join("|"); 
}

var observer = new window.MutationObserver(function(mutations) {
    annotate();
});
observer.observe(document.querySelector("div.message-list"), { childList: true, subtree: true });

container.addEventListener("scroll", function() { annotate(true); });

annotate();
