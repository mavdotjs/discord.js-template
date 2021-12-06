const { MessageEmbed } = require('discord.js')
exports.run = (client, message, args)=>{
    const embed = new MessageEmbed()
        .setColor([0, 255, 50])
        .setAuthor('PaintBot', 'https://cdn.discordapp.com/avatars/915266271464013834/029b2bfae9ee35227f4e51ce2a1de1c2.png?size=256')
        .setTitle('Help')
        .setFooter('You need help? i got u fam')
    for(const command of client.commands) {
        embed.addField(`${client.config.prefix}${command[0]}`, `[${command[1].help?command[1].help:"dev never added a help message for this command -_-"}]`, true)
    }
    message.channel.send({ embeds: [embed]})
}
exports.help = "Help Command"
