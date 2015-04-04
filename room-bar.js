function RoomBar(rooms) {
        // we pass the room names taken as arguments, to the context constructor
    this.init.call(this, rooms);
}

RoomBar.prototype = {
defaults: {
    base_url: "https://euphoria.io/room/",
    css_class: "ApolRoomBar",
    display_text: "&&",
    room_prefix: "&"
},
init: function(rooms) {
    var that = this; // pointer for use in event handlers for context

    this.div = document.createElement("div");
    with (this.div) {
        className = this.defaults.css_class;
        style.position = "absolute";
        style.right = "200px";
        style.bottom = "70px";
        style.padding = "2px";
        style.background = "#FCC";
        style.color = "black";
        style.border = "1px solid red";
        appendChild(document.createTextNode(this.defaults.display_text));
    }

    this.list = document.createElement("ul");
    with (this.list) {
        style.display = "none";
        style.visibility = "hidden";
        style.listType = "none";
        style.margin = "2px";
        style.padding = "0";
    }
    var i, li, a;
    for (i = 0; i < rooms.length; i++) {
        li = document.createElement("li");
        with (li) {
            style.display = "block";
            style.padding = "0";
        }
        a = document.createElement("a");
        a.href = this.defaults.base_url + rooms[i] + "/";
        a.appendChild(document.createTextNode(this.defaults.room_prefix + rooms[i]));
        li.appendChild(a);
        this.list.appendChild(li);
    }
    this.div.appendChild(this.list);

    document.body.appendChild(this.div);

    this.div.onmouseover = function() {
        with (that.list) {
            style.display = "block";
            style.visibility = "visible";
        }
    }

    this.div.onmouseout = function() {
        with (that.list) {
            style.display = "none";
            style.visibility = "hidden";
        }
    }
}
};

var my_rooms = prompt("Rooms?", "room1|room2|room3");
    my_rooms = my_rooms.split("|");
var my_rb = new RoomBar(my_rooms);
