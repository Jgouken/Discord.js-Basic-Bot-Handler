const { SlashCommandBuilder } = require('discord.js');
// This is to help set up the slash command!

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
        // Lowercase only, Duplicates may cause problems with confusion
		.setDescription('Replies with a test command!'),
        // Set's the description of the command.

        // For all of the options you can use for the builder, use the link below and experiment!
        // https://discordjs.guide/interactions/slash-commands.html#registering-slash-commands

	async execute(client, config, interaction) {
		await interaction.reply('Hey, it works!');
        // Replies to the interaction with a message!

        /*
        Using the builder at the top of the file, the Slash Command will already but updated in whatever server

        Any code to do!

        Create a new command:
        - Add a new file (name it whatever you want).
        - Create a new module.exports like this file.
        - At the top of the file, you can set name and description to any string.

        Parameters:
        - "client" is the bot's client.
        - "config" accesses all variables in the config file.
        - "interaction" https://discord.com/developers/docs/interactions/receiving-and-responding
        
        - Any added parameters must be set in index.js in an identical order. Execute parameters must be the same in all files.
        - Parameters work as local variables; Their values can be changed within the function.
        */
	}
}