const { MessageEmbed } = require('discord.js')
const fetch = require("node-fetch");
var fromReddit = async function(sub, message) {
    let meme
    await fetch(
      "https://www.reddit.com/r/" + sub + "/hot/.json?count=100"
    )
      .then(res => res.json())
      .then(async json => {
        let error = false;
        try {
            json.data.children[0].data
        } catch {
            message.channel.send('that sub doesnt exist')
            error = true
        }
        if(error) return
        let postID =
        json.data.children[
            Math.floor(Math.random() * json.data.children.length)
        ];
        let pfp
        await fetch(`https://www.reddit.com/user/${postID.data.author}/about.json`)
        .then(res=>res.json())
        .then(morejson=>{
            pfp = morejson.data.icon_img.split('?')[0]
        })
        let comments
        await fetch(`https://www.reddit.com${postID.data.permalink}.json`)
        .then(res=>res.json())
        .then(morejson=>{
            comments = morejson[1].data.children.length
        })
        meme = {
          image: postID.data.url,
          category: postID.data.link_flair_text,
          caption: postID.data.title,
          permalink: postID.data.permalink,
          author: postID.data.author,
          pfp: pfp,
          comments: comments
        };
      });
    return meme? meme : {
        pfp: "https://pic.onlinewebfonts.com/svg/img_268185.png",
        image: "https://pic.onlinewebfonts.com/svg/img_268185.png",
        category: "error",
        caption: "error",
        permalink: "error",
        comments: 404,
        author: "error"
    };
  };
exports.run = (client, message, [sub]) => {
    fromReddit(sub, message).then(meme=>{
        message.channel.sendTyping()
        const embed = new MessageEmbed()
        .setTitle(`${meme.caption}`)
        .setURL(`https://www.reddit.com${meme.permalink}`)
        .setDescription(`Category: ${meme.category || "Random"}`)
        .setFooter(`💬 | ${meme.comments}`)
        .setAuthor(`u/${meme.author}`, `${meme.pfp}`, `https://www.reddit.com/user/${meme.author}`)
        .setImage(meme.image)
    message.reply({embeds: [embed]})
    })
}
exports.help = "Random post from your favorite subreddit"