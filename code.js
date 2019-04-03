var currentPath = "Users.Guest";
var displayPath = "Virtual_Disk_0." + currentPath;
function UpdateDisplayPath() {
  displayPath = "Virtual_Disk_0." + currentPath;
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
    if(cd.hasOwnProperty([p[i].toLowerCase()]))
    cd = cd[p[i].toLowerCase()];
    else
    {
      canNav = false;
    }
  }
  if(!canNav)
  return "cannotNavigate"
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
      if(currentDir() === "cannotNavigate")
        {
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
    call: function(s)
    {
      var a = Object.getOwnPropertyNames(currentDir());
      var rslt = "All files in the current directory: ";
      for(var i = 0; i < a.length; i++)
      {
        if(a[i] != "name")
        {
          rslt += "<br>" + a[i];
        }
      }
      return rslt;
    }
  }
};
Start();
function Start()
{
Call(displayPath + ")> rd");
}

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
