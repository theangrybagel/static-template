//note that this is for window/section functionallity. Don't confuse this with Microsoft Windows.
var windowId = 0;
function Window() {
  //used for displaying a program.
  windowId += 1;
  this.id = windowId;
  var id = "'window" + windowId + "'";
  var headId = "'head" + windowId + "'";
  document.getElementById("main").innerHTML +=
    "<div class='window' id=" +
    id +
    "><div class='head' id='" +
    "window" +
    windowId +
    "header" +
    "' id=>" +
    "<button class='close' onclick='closeWindow(" +
    windowId +
    ");'></button>" +
    "</div></div>";
  dragElement(document.getElementById("window" + windowId));
}
function WindowSelf(attachedWindow) {
  this.win = attachedWindow;
  this.AddText = function(txt) {
    document.getElementById("window" + this.win.id).innerHTML += txt;
  };
}

function closeWindow(id) {
  var w = document.getElementById("window" + id);
  w.innerHTML = "";
  w.classList.remove("window");
}
//window dragging
// Make the DIV element draggable:

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
