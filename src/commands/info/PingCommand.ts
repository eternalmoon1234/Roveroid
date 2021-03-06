import { Command } from "../../structures/Command";

const PingCommand: Command = {
  name: "ping",
  description: "Provides the ping of the bot",
  category: "info",
  aliases: ["latency"],
  usage: "ro!ping",
  run(client, message, args) {
    return message.channel.send("Pinging...").then((msg) => {
      msg.edit(
        `WebSocket Latency: **${client.ws.ping}** MS, Discord API Latency: **${
          msg.createdTimestamp - message.createdTimestamp
        }** MS`
      );
    });
  },
};

export = PingCommand;
