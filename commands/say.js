exports.run = (client, message, [...umessage])=>{
    message.channel.createWebhook(message.author.username, {
        avatar: message.author.avatarURL(),
        reason: "User message"
    }).then(webhk=>{
        webhk.send(`**${umessage.join(' ')}**`).then(_=>{
            webhk.delete()
            message.delete()
        })
    })
}