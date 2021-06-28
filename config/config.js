const Discord = require('discord.js');
const bot = new Discord.Client();

module.exports = {
    Discord: Discord, 
    bot: bot,
    
    TOKEN: `<BOT_TOKEN>`, 
    // Use an env if this is public. Do not share your bot's token
    prefix: `!`
}