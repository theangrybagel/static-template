var currentPath = "Users.Guest";
var displayPath = "Virtual_Disk_0." + currentPath;
function UpdateDisplayPath() {
  displayPath = "Virtual_Disk_0." + currentPath;
}
function AddFile(file) {
  if (currentDir() != "cannotNavigate") {
    var returnTxt = "";
    var endAmt = 0;
    var dir = disk;
    var p = currentPath.split(".");
    for (var i = 0; i < p.length; i++) {
      returnTxt += "[" + p[i].toLowerCase();
      endAmt = i + 1;
    }
    for (var i = 0; i < endAmt; i++) {
      returnTxt += "]";
    }
    eval(
      "disk" +
        returnTxt +
        "." +
        file.name +
        " = {name: '" +
        file.name +
        "', type: " +
        file.type +
        " }"
    );
    console.log(returnTxt);
    console.log(disk);
  }
}
function currentDir() {
  var p = currentPath.split(".");
  var cd = disk;
  console.log(p);
  console.log(cd);
  var canNav = true;
  for (var i = 0; i < p.length; i++) {
    console.log(p[i]);
    console.log(cd[p[i].toLowerCase()]);
    if (cd.hasOwnProperty([p[i].toLowerCase()])) cd = cd[p[i].toLowerCase()];
    else {
      canNav = false;
    }
  }
  if (!canNav) return "cannotNavigate";
  console.log(cd);
  return cd;
}
var Commands = {
  cd: {
    call: function(parameters) {
      var prevPath = currentPath;
      if (parameters[1] == undefined) return "Usage: cd [directory]";
      currentPath += "." + parameters[1];
      var canNavigate = true;
      if (currentDir() === "cannotNavigate") {
        currentPath = prevPath;
        return "Could not find the path specified";
      }
      AddToLog(currentDir()["name"]);
      UpdateDisplayPath();
      return "Changed directory to " + displayPath;
    }
  },
  rd: {
    call: function(parameters) {
      currentPath = "Users.Guest";
      UpdateDisplayPath();
      return "Changed to root directory.";
    }
  },
  view: {
    call: function(s) {
      var a = Object.getOwnPropertyNames(currentDir());
      var rslt = "All files in the current directory: ";
      for (var i = 0; i < a.length; i++) {
        if (a[i] != "name") {
          rslt += "<br>" + a[i];
          if (isObject(currentDir()[a[i]])) {
            if (currentDir()[a[i]].hasOwnProperty("type"))
              rslt += "." + currentDir()[a[i]]["type"];
          }
        }
      }
      return rslt;
    }
  },
  create: {
    call: function(
      p // > create [type (txt, folder, etc)] [name]
    ) {
      if (p[1] === undefined) return "Usage: create [type] [name]";
      if (p[2] == undefined) return "Invalid syntax";
      if (p[2].includes(".") || p[2].includes(",") || p[2].includes(":"))
        return "The name cannot contain any of the following characters: '.', ',', ':'.";
      if (p[1].includes(".") || p[1].includes(",") || p[1].includes(":"))
        return "The type cannot contain any of the following characters: '.', ',', ':'.";
      var rslt = "";
      //if (p[2] === "folder") {
      //disk[currentDir()[p[2]]] = { name: p[2] };
      var f = { name: p[2], type: p[1] };
      AddFile(f);
      //}
    }
  }
};
Start();
function Start() {
  Call(displayPath + ")> rd");
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
function KeyPress(kc) {
  if (kc.key === "Enter") {
    var value = document.getElementById("input").value;
    Call(value);
  }
}
function KeyDown() {
  if (!document.getElementById("input").value.startsWith(displayPath + ")> ")) {
    document.getElementById("input").value = displayPath + ")> ";
  }
}
function AddToLog(str) {
  setTimeout(function() {
    document.getElementById("output").innerHTML += "<br>" + str;
  }, 200);
}

function Call(str) {
  //check for command.
  var inp = str.split(displayPath + ")> ")[1];
  var result = inp;
  if (Commands.hasOwnProperty(inp.split(" ")[0])) {
    //do stuff
    result = Commands[inp.split(" ")[0]].call(inp.split(" "));
  } else {
    result = '"' + inp.split(" ")[0] + '" is not a known command.';
  }
  AddToLog(str);
  AddToLog(result);
  document.getElementById("input").value = displayPath + ")> ";
  return;
}
