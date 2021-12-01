const Discord = require("discord.js");
const fs = require('fs');
const express = require('express');
const app = express()
require('dotenv').config();
const port = process.env.PORT || 8080
const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});
const config = require("./config.json");
client.config = config;
client.commands = new Discord.Collection();
client.chanevents = new Discord.Collection();
const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}
const chanevents = fs.readdirSync("./channels").filter(file => file.endsWith(".js"));
for (const file of chanevents) {
  const chanName = file.split('.')[0];
  const event = require(`./channels/${file}`);
  if(typeof event !== 'function') continue;
  client.chanevents.set(chanName, event.bind(null, client))
}
const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${file}`);

  console.log(`Attempting to load command ${commandName}`);
  client.commands.set(commandName, command);
}
client.login(process.env.TOKEN)
app.get('/', (req, res)=>{
  res.send('Bot up!')
});