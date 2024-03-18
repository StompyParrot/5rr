const { createRandoMessage } = require("./functions/createRandoMessage");
const { rando } = require("./functions/rando");

let names = []; // will hold all the names that have plussed in
let currentPlus = 5; // the current status of the plus

const handleNewCommand = (message) => {
  console.log(message);
  const author = message.author.globalName;
  const uid = message.author.id;

  currentPlus = 4;

  for (let i = 0; i < names.length; i++) {
    names.pop();
  }

  names.push({ name: author, id: uid });
  let currentPlayers = names[0].name;

  message.channel.send(
    `\`\`\`ansi\n[1;37mNew + started.\n+${currentPlus}\nFollowing players:  [0;37m${currentPlayers}.\`\`\``
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
    `\`\`\`ansi\n[0;37m+${currentPlus}\n[1;37mFollowing players:  [0;37m${currentPlayers}\`\`\``
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
    // array to hold the rando
    const randoArray = rando([
      { name: "a", id: "184434802013896705" },
      { name: "b", id: "184434802013896705" },
      { name: "c", id: "184434802013896705" },
      { name: "d", id: "184434802013896705" },
      { name: "e", id: "184434802013896705" },
    ]);

    const messageContent = createRandoMessage(randoArray);

    message.channel.send(messageContent); // sends the team rando message
  }
};

const handleRandoCommand = (message) => {
  const names = message.content.split(" ").slice(1);

  const randoArray = rando(names);

  const messageContent = createRandoMessage(randoArray);

  message.channel.send(messageContent);
};

module.exports = {
  handleNewCommand,
  handleStatusCommand,
  handleUpdateCommand,
  handleRandoCommand,
};
