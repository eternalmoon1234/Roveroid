import { Command } from "../../structures/Command";

const DeadChatCommand: Command = {
  name: "DeadChat",
  description: "Evaluates mathematics",
  category: "utils",
  run(client, message, args) {
      message.channel.send("Yo, we got a dead chat here")
      message.delete(1000);
  },
};

export = DeadChatCommand;
