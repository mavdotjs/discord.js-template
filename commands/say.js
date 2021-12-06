exports.run = async(client, message, [...umessage])=>{
    let user = message.guild.members.cache.find(u=>u.id===message.author.id)
    let displayname = user.nickname || user.user.username
    message.channel.createWebhook(displayname, {
        avatar: message.author.avatarURL(),
        reason: "User message"
    }).then(webhk=>{
        webhk.send(`${umessage.join(' ')}`).then(_=>{
            webhk.delete()
            message.delete()
        })
    })
}
exports.help = "Send a message as a bot"