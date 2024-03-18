const createRandoMessage = (randoArray) => {
  const teamNames = ["Team 1", "Team 2", "Team 3", "Team 4", "Team 5"]; // team names

  const formatOpen = "```ansi\n";
  const formatClose = "```";
  const redText = "[0;31m";
  const greenText = "[0;32m";
  const yellowText = "[0;33m";
  const blueText = "[0;34m";
  const whiteText = "[1;37m";

  let messageContent = `${formatOpen}${whiteText}5r Ready to go!\n`; // header message

  for (let i = 0; i < 5; i++) {
    messageContent += `${whiteText}${teamNames[i]}: `;
    for (let j = 0; j < 5; j++) {
      if (j === 0) {
        messageContent += `${redText}${randoArray[i][j]} ${whiteText}/ `; // adds name and colour fromats for attackers
      }
      if (j === 1) {
        messageContent += `${redText}${randoArray[i][j]} ${whiteText}/ `; // adds name and colour fromats for attackers
      }
      if (j === 2) {
        messageContent += `${greenText}${randoArray[i][j]} ${whiteText}/ `; // adds name and colour fromats for healer
      }
      if (j === 3) {
        messageContent += `${yellowText}${randoArray[i][j]} ${whiteText}/ `; // adds name and colour fromats for collector
      }
      if (j === 4) {
        messageContent += `${blueText}${randoArray[i][j]}`; // adds last name and colour fromats for defender
      }
      if (i === 4 && j === 4) {
        messageContent += `\n${formatClose}`;
      }
    }
    messageContent += "\n"; // new line between teams
  }
  return messageContent;
};

module.exports = { createRandoMessage };
