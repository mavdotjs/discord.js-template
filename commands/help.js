const { MessageEmbed } = require('discord.js')
exports.run = (client, message, args)=>{
    const embed = new MessageEmbed()
        .setColor([0, 255, 50])
        .setAuthor(client.user.username, client.user.defaultAvatarURL)
        .setTitle('Help')
        .setFooter('You need help? i got u fam')
    for(const command of client.commands) {
        embed.addField(`${client.config.prefix}${command[0]}`, `[${command[1].help?command[1].help:"dev never added a help message for this command -_-"}]`, true)
    }
    message.channel.send({ embeds: [embed]})
}
exports.help = "Help Command"
