var currentPath = "Virtual_Disk_0.Users.Guest";
Call(currentPath + ")> ");
function KeyPress(kc) {
  if (kc.key == "Enter") {
    var value = document.getElementById("input").value;
    Call(value);
  }
}
function AddToLog(str) {
  setTimeout(function() {
    document.getElementById("output").innerHTML += "<br>" + str;
  }, 200);
}
function Call(str) {
  //check for command.
  var inp = str.split(currentPath + ")> ")[1];

  var result = inp;
  AddToLog(currentPath + ")> " + result);
  document.getElementById("input").value = currentPath + ")> ";
  return;
}
var Commands = {};
