# Simple discord.js bot template
## Setup
To set the bot up first open your command line and run:
```
npm i
```
Next you want to create a `.env` file and put this in:
```
TOKEN=<Bot Token>
BUILD=F
```
BUILD env variable can be used for checking if you are on a webserver or not (I recommend [heroku](https://signup.heroku.com/) as that is what this is already optimized for)  
after setting up heroku add the same env variables in the heroku settings but set BUILD to litteally anything except for F this is automatically converted to a boolean value and stored in client.beta  
## Adding events
### `channels` (and `events`) Folder
The channels folder allows you to add message sent events that only work in the specified channel (the filename is the channel name) eg.
```js
// imports and extra functions
module.exports = (message, client)=>{
    // code will run when the event is invoked
}
```
the events folder is for client.on events eg.
```js
// imports and extra functions
module.exports = (/*event args*/, client)=>{
    // code will run when the event is invoked
}
```
### `commands` Folder
discord bot commands
```js
// imports and extra functions
exports.run = (client, message, args /*can be destrucured, eg. [user, amount]*/)=>{
    // code will run when the command is ran
}
```