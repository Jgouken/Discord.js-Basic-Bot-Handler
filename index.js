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
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
// Finds all JavaScript files in the folder called "commands"

client.commands = new Collection();
// Creates a collection; A list of keys and values.


for (const file of commandFiles) {
  // Gets all commands and their contents
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Gets the command

  client.commands.set(command.data.name, command);
  // For each file, the file is retrieved and put in the "client.commands" collection under the command's name.
  // In this instance, the key is the command's name, and the value is the command file entirely.
}

client.on('ready', async () => {
  console.log(`\n\n${config.name} IS ONLINE!\n\n`);
  // When the client boots up, it'll tell you in the Output/Terminal.
  client.user.setActivity(`${config.prefix}test`, { type: "WATCHING" })
  // This sets the bots' custom status. The "type" variants are:
  // LISTENING, WATCHING, PLAYING, STREAMING, COMPETING
  // (Uppercase required)

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

      This code should already work once you set up the config.js and package.json file under the "config" folder.
      Want to try the test command?
      In a server with your bot, type !test to execute the test.js file.
      Your bot should respond to the message and give it a thumbs up.
      If that doesn't happen, check the terminal/output for any error messages.

    */
  })
})

client.login(config.TOKEN)

// CODE PUT TOGETHER BY JGOUKEN ON GITHUB
