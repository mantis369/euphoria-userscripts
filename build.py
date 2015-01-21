import os, os.path, urllib

def bmify(code):
    before = "javascript:(function(){"
    after = "}());"
    return before + urllib.quote(code.encode("utf8"), "") + after

bookmarklets = {}
for js in [f for f in os.listdir(".") if f.endswith(".js")]:
    fn, ext = os.path.splitext(js)        
    with open(js, "r") as jsf:
        bookmarklets[fn] = bmify(jsf.read())

html = """<!DOCTYPE html>
<html>
<head>
    <title>bookmarklets</title>
</head>
<body>
    <h1>bookmarklets</h1>
    <ul>
        {}
    </ul>
</body>
</html>"""

li = "<li><a href=\"{1}\" title=\"{0}\">{0}</a></li>"

names = bookmarklets.keys()
names.sort()
ul = "\n".join([li.format(n, bookmarklets[n]) for n in names])

with open("bookmarklets.html", "w") as htmlfile:
    htmlfile.write(html.format(ul))
