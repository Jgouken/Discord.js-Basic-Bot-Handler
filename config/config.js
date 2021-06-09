const Discord = require('discord.js'); // Your only way of accessing Discord
const bot = new Discord.Client(); // Often named Client, it's the bot's client to access Discord

module.exports = {
    Discord: Discord, 
    bot: bot,
    
    TOKEN: `<BOT_TOKEN>`, // Use an env if this is public. Do not share your bot's token
    prefix: `!` // Example: !test
}