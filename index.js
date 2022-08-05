// ALL OF THE FOLLOWING PACKAGES NEED TO BE INSTALLED.
// Some services do this automatically, otherwise you must use 'npm install' in your terminal.

const { Collection } = require('discord.js');
// Declares a Discord Collection
const config = require('./config/config')
// Sets the config file as a variable
const { client } = require('./config/config')
// Gets the bot's client within the config file
const fs = require('node:fs');
// "fs" can read files
const path = require('node:path');
// "path" can find files straight from a path.

const commandsPath = path.join(__dirname, 'commands');
const sCommandsPath = path.join(__dirname, 'slash_commands');
// Finds the path of the folders titled "commands" and "slash_commands"
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const sCommandFiles = fs.readdirSync(sCommandsPath).filter(file => file.endsWith('.js'));
// Finds all JavaScript files in the folders called "commands" and "slash_commands"

const sCommands = []
// This is used to update your slash commands!

client.commands = new Collection();
client.sCommands = new Collection();
// Creates 2 collections for message and slash commands; Lists of keys and values.

for (const file of commandFiles) {
  // Gets all commands and their contents
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Gets the command
  client.commands.set(command.name, command);
  // For each file, the file is retrieved and put in the "client.commands" collection under the command's name.
  // In this instance, the key is the command's name, and the value is the command file entirely.
}

for (const file of sCommandFiles) {
  // Gets all slash commands and their contents
  const filePath = path.join(sCommandsPath, file);
  const command = require(filePath);
  // Gets the slash command
  sCommands.push(command.data)
  // This is required to do to update your slash commands!
  client.sCommands.set(command.data.name, command);
  // For each file, the file is retrieved and put in the "client.sCommands" collection under the slash command's name.
  // In this instance, the key is the command's name, and the value is the command file entirely.
}

client.once('ready', async () => {
  // Once the bot is online, do this ONCE...

  console.log(`\n\n${config.name} IS ONLINE!\n\n`);
  // When the client boots up, it'll tell you in the Output/Terminal.
  client.user.setActivity(`${config.prefix}test`, { type: "WATCHING" })
  // This sets the bots' custom status. The "type" variants are:
  // LISTENING, WATCHING, PLAYING, STREAMING, COMPETING
  // (Uppercase required)
  startup.execute(client, sCommands)
  // This gets the Slash Commands updated and ready!
  // You can also put whatever you want in the startup.js file for anything you want to do before anything else!
})

client.on('messageCreate', async message => {
  // When the bot sees that a message has been created...

  if (message.author.bot) return;
  // Don't do anything if the message is from a bot.
  if (message.channel.type == 'dm') return;
  // Don't do anything if the message is from the bots' DMs.
  if (!message.content.startsWith(config.prefix)) return; // Add .toLocaleLowerCase() to make the prefix NOT case-sensitive.
  // Don't do anything if the message does not start with the prefix.
  if (!(message.guild.me).permissions.has("SEND_MESSAGES")) return;
  // Don't do anything if the bot cannot type in the channel the message is from.

  const commandArgs = message.content.slice(config.prefix.length).trim().split(/ +/);
  // Gets all "arguments" from the message (anything typed after the prefix, including the command name).
  const command = commandArgs.shift().toLowerCase(); // Not case sensitive
  // .shift() adjusted commandArgs to make it not include the command name in it anymore.
  // "command" was set to what was removed (the command name in this instance).
  const called = client.commands.get(command)
  // Attempts to find the requested command
  if (called) called.execute(message, commandArgs, config, client)
  // This executes the files and sets the parameters as message, commandArg, config, and client.
  // If you change this parameters list, you may have to change it in all files under the "commands" folder.

  /*

    This code should already work once you set up the config.js and package.json under the "config" folder.
    Want to try the test command?
    In a server with your bot, type !test to execute the test.js file in the commands folder.
    Your bot should respond to the message and give it a thumbs up.
    If that doesn't happen, check the terminal/output for any error messages.

    Contact me on Discord at Jgouken#4861 if you have any questions or feedback on this project!

  */
})

client.on('interactionCreate', async interaction => {
  // When an "interaction" for the bot has been ran...
  if (!interaction.isChatInputCommand()) return;
  // Don't do anything if it's not a chat input command (slash command).
  // There are multiple types of interactions. We're only interested in slash command interactions here!
  const { commandName } = interaction;
  // Grabs the name of the slash command that was initiated!
  const called = client.commands.get(commandName)
  // Attempts to find the requested command
  if (called) called.execute(client, config, interaction)
  // This executes the files and sets the parameters as message, commandArg, config, and client.
  // If you change this parameters list, you may have to change it in all files under the "slash_commands" folder.

  /*

    There's no need to check if this was ran in the DMs or by a bot. Bots cannot use slash commands
    and as long as the slash commands are server-only (set by default), there's no worry for them in the DMs.

    This code should already work once you set up the config.js and package.json under the "config" folder.
    Want to try the test command?
    In a server with your bot, type /test to execute the test.js file in the slash_commands folder.
    Your bot should respond to the interaction.
    If that doesn't happen, check the terminal/output for any error messages!
    
    Contact me on Discord at Jgouken#4861 if you have any questions or feedback on this project!

  */

});

client.login(config.TOKEN)

// CODE PUT TOGETHER BY JGOUKEN ON GITHUB
