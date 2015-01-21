var css = "html {"+
"filter:invert(100%);" +
"-webkit-filter:invert(100%);" +
"-moz-filter:invert(100%);" +
"-o-filter:invert(100%);" +
"-ms-filter:invert(100%);" +
"}";

var head = document.head || document.getElementsByTagName("head")[0];
var style = document.createElement("style");
    style.type = "text/css";
if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}
head.appendChild(style);
