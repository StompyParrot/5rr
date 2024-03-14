let names = []; // will hold all the names that have plussed in
let currentPlus = 5; // the current status of the plus

const handleNewCommand = (message) => {
  const author = message.author.globalName;
  const uid = message.author.id;

  currentPlus = 4;
  names.push({ name: author, id: uid });

  let currentPlayers = "";
  for (let i = 0; i < names.length; i++) {
    if (i === names.length - 1) {
      currentPlayers += `${names[i].name}.`;
    } else {
      currentPlayers += `${names[i].name}, `;
    }
  }

  message.channel.send(
    `**New+ started.**\n+${currentPlus}\n **Following players:**  ${currentPlayers}`
  );
};

const handleStatusCommand = (message) => {
  let currentPlayers = "";
  for (let i = 0; i < names.length; i++) {
    if (i === names.length - 1) {
      currentPlayers += `${names[i].name}.`;
    } else {
      currentPlayers += `${names[i].name}, `;
    }
  }
  message.channel.send(
    `+${currentPlus}\n **Following players:**  ${currentPlayers}`
  );
};

const handleUpdateCommand = (message) => {
  const plus = parseInt(message.content[1]); // changes the string to a number
  const author = message.author.globalName; // name of the user that typed
  const uid = message.author.id; // unique id of the user

  // when plussing in
  if (currentPlus - plus === 1) {
    currentPlus -= 1; // decrease the current plus
    names.push({ name: author, id: uid }); // add name and id to the names array
    console.log("name added to array");
  }

  // when plussing out
  if (currentPlus - plus === -1) {
    currentPlus += 1; // increase the current plus
    names = names.filter((user) => user.id !== message.author.id); // removes the user from the names array
    console.log("name removed from array");
  }

  // when a team is full
  if (currentPlus === 0) {
    // function to randomises names
    const rando = (names) => {
      const rotations = [];
      const n = names.length;

      for (let i = 0; i < n; i++) {
        const rotation = [];
        for (let j = 0; j < n; j++) {
          rotation.push(names[(j + i) % n].name);
        }
        rotations.push(rotation);
      }

      return rotations;
    };

    // array to hold the rando
    const randoArray = rando(names);

    const teamNames = ["Team 1", "Team 2", "Team 3", "Team 4", "Team 5"]; // team names
    let messageContent = "**5r Ready to go!**\n"; // header message

    for (let i = 0; i < 5; i++) {
      messageContent += `**${teamNames[i]}**: `;
      for (let j = 0; j < 5; j++) {
        if (j === 4) {
          messageContent += `  ${randoArray[i][j]}`; // adds last team
        } else {
          messageContent += `  ${randoArray[i][j]} / `; // adds team
        }
      }
      messageContent += "\n"; // new line between teams
    }

    message.channel.send(messageContent); // sends the team rando message

    console.log(names);
    console.log(plus, "plus", currentPlus, "currentPlus");
  }
};

module.exports = { handleNewCommand, handleStatusCommand, handleUpdateCommand };
