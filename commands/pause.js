exports.run = (client, message, [time, ...reason])=>{
    message.delete()
    if(!message.member.permissionsIn(message.channel).has("MANAGE_CHANNELS", true)) return;
    reason = reason? ` for ${reason.join(' ')}` : undefined
    role = message.guild.roles.cache.find(r=>r.name==="Verified")
    message.channel.send(`**MOMENT OF SILENCE**${reason || ''}: Chat will be muted for ${time}s.`)
    message.channel.sendTyping();
    message.channel.permissionOverwrites.edit(role, {
        SEND_MESSAGES: false
    }).then(channel => {
        setTimeout(() => {
            channel.permissionOverwrites.edit(role, {
                SEND_MESSAGES: true
            })
            channel.send('moment of silence over.')
        }, time*1000)
    })
}
exports.help = "moment of silence. **must have manage channel perms**"