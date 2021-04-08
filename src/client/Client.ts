import { Client } from "discord.js";
import glob from "glob";
import { promisify } from "util";
import dotenv from "dotenv";

import { Command } from "../structures/Command";
import { Event } from "../structures/Event";

const globPromise = promisify(glob);
export class Astronova extends Client {
  public prefix: string = "an!";
  public commands: Array<Command> = new Array();
  public events: Array<Event> = new Array();

  public constructor() {
    super();
    dotenv.config();
  }

  public async commandHandler() {
    const commandFiles = await globPromise(
      `${__dirname}/../commands/**/*{.js,.ts}`
    );

    for (const file of commandFiles) {
      const command = (await import(file)) as Command;
      this.commands.push(command);
    }
  }

  public async eventHandler() {
    const eventFiles = await globPromise(
      `${__dirname}/../events/**/*{.js,.ts}`
    );

    for (const file of eventFiles) {
      const event = (await import(file)) as Event;
      this.events.push(event);

      this.on(event.name, event.run);
    }
  }

  public start() {
    this.commandHandler();
    this.eventHandler();
    this.login(process.env.API_KEY);
  }
}