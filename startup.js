const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
// More info here https://www.npmjs.com/package/@discordjs/rest
const { clientId, guildId, token } = require('./config/config.js');
// Pulling variables from config.js. These need to be set up.

module.exports = {
    name: 'startup',

    async execute(client, sCommands) {
        const rest = new REST({ version: '10' }).setToken(token);
        // This sets your authorization token that should be used for requests. Your bots' token is your key to any listeners.
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: sCommands.map(command => command.toJSON()) })
            .then(() => console.log(`Successfully re-registered application commands.\n\n`))
            .catch(console.error);
        // (Basically) updates and creates all slash commands in the slash_commands folder!

        /*
            Delete a Slash Command: Follow the guide linked below. It's a slow process, but it works!
            https://discordjs.guide/slash-commands/deleting-commands.html#deleting-specific-commands

            Want Global Slash Commands? Change line 13 to the following
            await rest.put(Routes.applicationCommands(clientId), body: sCommands.map(command => command.toJSON() });

            If you want a mixture of Global and Server-Only Slash Commands, you would need to change some code.
            This code sets all files within the slash_commands folder to either Server-Only or Global commands.

            Slash Commands are independent of message commands unless you make them not be.
            Have fun, experiment, and enjoy this highly requested Slash Commands addition!
        */
    }
}
