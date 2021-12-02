module.exports = (client, message) => {
    if (message.author.bot) return;
    if (message.webhookId) return;
    if (message.content.indexOf(client.config.prefix) !== 0) {
        if(client.chanevents.get(message.channel.name)) {
            client.chanevents.get(message.channel.name)(message)
        }
        return;
    }
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    if (!cmd) {message.reply('That command doesnt exist'); return;}
    cmd.run(client, message, args);
};
