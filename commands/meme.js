const { MessageEmbed } = require('discord.js')
import fetch from 'node-fetch';
var fromReddit = async function(subredditlocale) {
  let subredditname;
  const subreddits = {
    br: "MemesBrasil",
    de: "GermanMemes",
    en: "dankmemes",
    es: "memesesp",
    fr: "FrenchMemes",
    in: "IndianDankMemes",
    it: "italianmemes",
    ru: "YouSeeComrade",
    tr: "burdurland"
  };
  subredditname = subreddits[subredditlocale];
  if (subreddits[subredditlocale] === undefined)
    subredditname = subreddits["en"];
  await fetch(
    "https://www.reddit.com/r/" + subredditname + "/hot/.json?count=100"
  )
    .then(res => res.json())
    .then(async json => {
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
  return meme;
};
exports.run = (client, message, args) => {
    fromReddit('en').then(meme=>{
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
exports.help = "some sub-par **ok** memes"