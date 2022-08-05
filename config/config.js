// ALL OF THE FOLLOWING PACKAGES NEED TO BE INSTALLED.
// Some services do this automatically, otherwise you must use 'npm install' in your terminal.
const { Client, GatewayIntentBits } = require('discord.js');
// It declares the necessary variables for this file from discord.js.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// Creates the client for the bot with the proper 'intents' you may need.

module.exports = {
    client: client,
    // The bot's client
    clientId: `<CLIENT ID>`,
    // The ID of your bot/client. Check in your developer application for it.
    guildId: `<GUILD ID>`,
    // The ID of 1 server for your Slash Commands. Required for server-only slash commands! View startup.js for global vs server-only commands.
    name: '<NAME>',
    // The name of your bot so it can be changed here and referenced elsewhere. Optional use.
    TOKEN: `<BOT_TOKEN>`,
    // Use an env if this is public or Discord will reset it. Hosting services often use process.env.
    // Do not share, do not reference other than the initialization (already done).
    prefix: `!`
    // Ideal to use config.prefix in your code that uses message commands (non slash commands)!
}

//  Within the commands folder, "config" references this file and can get these properties.