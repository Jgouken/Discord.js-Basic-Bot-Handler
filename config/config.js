// ALL OF THE FOLLOWING PACKAGES NEED TO BE INSTALLED.
// Some services do this automatically, otherwise you must use 'npm install' in your terminal.
const { Client, GatewayIntentBits } = require('discord.js');
// It declares the necessary variables for discord.js
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// Creates the client for the bot with the proper 'intents' you may need.

module.exports = {
    client: client,
    // The bot's client
    name: '<NAME>',
    // The name of your bot so it can be changed here and referenced elsewhere. Optional use.
    TOKEN: `<BOT_TOKEN>`,
    // Use an env if this is public or Discord will reset it. Hosting services often use process.env.
    // Do not share, do not reference other than the initialization (already done).
    prefix: `!`
    // It's ideal to use config.prefix to mention the prefix, just in case it changes.
}

/*
    Within the commands folder, "config" references this file and can get either:
    config.Discord, config.client, config.name, config.TOKEN, or config.prefix.
*/

