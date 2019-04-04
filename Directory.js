function file(rawText) {
  this.raw = rawText;
}

var disk = {
  users: {
    name: "Users",
    guest: {
      name: "Guest",
      documents: {
        name: "Documents",
        readme: {
          name: "Readme",
          type: "txt",
          data: new file("This is a file of some sort.")
        }
      }
    }
  }
};
var Apps = {
  virtualText: {
    name: "Virtual Text Editor",
    sup: ["txt"],
    execute: function(fil) {
      var wind = new Window();
    }
  }
};
var AppF = {
  Supported: function(fileType) {
    console.log(fileType);
    var a = Object.getOwnPropertyNames(Apps);
    console.log(a);
    var s = [];
    for (var i = 0; i < a.length; i++) {
      console.log(Apps[a[i]]);
      if (ArrayContains(Apps[a[i]]["sup"], fileType)) {
        s.push(a[i]);
      }
    }
    return s;
  }
};
function ArrayContains(arr, thing) {
  for (var ari = 0; ari < arr.length; ari++) {
    if (arr[ari] === thing) {
      return true;
    }
  }
  return false;
}
