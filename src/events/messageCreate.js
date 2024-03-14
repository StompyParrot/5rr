module.exports = (client) => {
  console.log("inside the recieveMessages");

  // when last messsage is from a bot, return
  client.on("messageCreate", (message) => {
    if (message.author.bot) {
      console.log("message was a bot");
      return;
    }

    // if a message is not a +, return
    if (!message.content.startsWith("+")) {
      console.log("returning because not a +");
      return;
    }

    const handleNewCommand = require("../commands/new");
    const handleStatusCommand = require("../commands/status");
    const handleUpdateCommand = require("../commands/update");

    if (message.content.startsWith("+new")) {
      // handle "+new" Command
      handleNewCommand(message);
    } else if (message.content.startsWith("+?")) {
      // handle "+?" Command
      handleStatusCommand(message);
    } else if (
      // handle a +
      message.content.startsWith("+") &&
      message.content.length === 2 &&
      typeof parseInt(message.content[1] === "number")
    ) {
      handleUpdateCommand(message);
    }
  });
};
