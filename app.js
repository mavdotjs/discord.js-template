const Discord = require("discord.js");
const fs = require('fs'); // filesystem library for getting filenames
const express = require('express'); // library for hosting webserver to keep the app alive (use a service like uptimerobot)
const app = express() // start express app
require('dotenv').config(); // read .env files and add them to process.env
const port = process.env.PORT || 8080
const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]
});
const config = require("./config.json"); // configuration file

// add variables that all commands can access
client.beta = process.env.BUILD === "F"
client.config = config;
client.commands = new Discord.Collection();
client.chanevents = new Discord.Collection();
// get all events and register them
if(!fs.existsSync('./events')) {
  fs.mkdirSync('./events')
}
const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  if(typeof event !== 'function') continue;
  client.on(eventName, event.bind(null, client));
}
// get all channel events (set name of file to name of channel you want the event to run for)
if(!fs.existsSync('./channels')) {
  fs.mkdirSync('./channels')
}
const chanevents = fs.readdirSync("./channels").filter(file => file.endsWith(".js"));
for (const file of chanevents) {
  const chanName = file.split('.')[0];
  const event = require(`./channels/${file}`);
  if(typeof event !== 'function') continue;
  client.chanevents.set(chanName, event.bind(null, client))
}
// get all commands
if(!fs.existsSync('./commands')) {
  fs.mkdirSync('./commands')
}
const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${file}`);

  // console.log(`Attempting to load command ${commandName}`);
  client.commands.set(commandName, command);
}
// login to bot account
client.login(process.env.TOKEN)
app.get('/', (req, res)=>{
  res.send('Bot up!')
});
app.listen(port, '0.0.0.0',()=>{
  console.log('running')
})