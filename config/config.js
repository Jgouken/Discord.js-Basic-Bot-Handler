const Discord = require('discord.js');
const bot = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES] });

module.exports = {
    Discord: Discord, 
    bot: bot,
    
    name: '<NAME>', // The name of your bot. Optional use.
    TOKEN: `<BOT_TOKEN>`, // Use an env if this is public. Do not share your bot's token
    prefix: `!` // Ideal to use config.prefix to mention the prefix, just in case it changes.
}
