exports.run = async(client, message, [...umessage])=>{
    let users
    await message.guild.members.cache.find(u=>u.id===message.author.id).then(user=>{
        users = user
    })
    message.channel.createWebhook(users.displayname, {
        avatar: message.author.avatarURL(),
        reason: "User message"
    }).then(webhk=>{
        webhk.send(`**${umessage.join(' ')}**`).then(_=>{
            webhk.delete()
            message.delete()
        })
    })
}