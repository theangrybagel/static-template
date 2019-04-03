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
