const config = require('./config/config') // Gets the information from the configuration file
const {bot, Discord} = require('./config/config') // Gets the information from the configuration file
const fs = require('fs') // Reads files
bot.commands = new Discord.Collection(); // Collector for all commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js')); // Finds all files ending with .js in a folder called "commands"
for (const file of commandFiles) { // Automatically updates any altered, removed, or added commands
  const command = require(`./commands/${file}`); // Calls the file to be used as a command
  bot.commands.set(command.name, command); // Adds the file to the database
}

bot.on('ready', async () => {
    setTimeout(() => { // This repeats every set time
      bot.user.setPresence({
        status: 'online', // online, offline, dnd, away
        activity: {
          name: `${bot.guilds.cache.size} servers! | ${config.prefix}help`, // Any text
          type: 'WATCHING', // LISTENING, WATCHING, PLAYING, STREAMING, and COMPETING
        }
      })
    }, 30 * 1000) // x * 1000 are seconds
  
    console.log('\n\nBOT IS RUNNING!\n\n');
  
    bot.on('message', async message => {
        if (message.author.bot) return; // If the author is a bot
        if (message.channel.type == 'dm') return; // If the command is requested in the DMs
        if (!message.content.toLocaleLowerCase().startsWith(config.prefix)) return; // If the message does not start with the prefix
        if (!(message.guild.me).hasPermission("SEND_MESSAGES")) return; // If the bot is not allowed to type in the channel
        const input = message.content.slice(config.prefix.length).trim() // The content of the message without the prefix
        if (!input.length) return; // If the message is just the prefix
        const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/); // Declares the name of the command and the arguments given
        const called = bot.commands.get(command) // Attempts to get the command name using what the user gave
        if (called) called.execute(message, commandArgs, config, bot) // If such a command exists, execute it. For specific parameters for specific commands, use a switch case and not an if chain.

        // Want to try the test command? Make sure you set up the config.js file and the package.json file.
        // Currently, the only command is "test" and the prefix is defaulted to !
        // In a server with your bot, type !test to execute the test file!
        // What should happen is the bot should add a 👍 reaction to your message.
        // If that doesn't happen, check in the console for any error messages.
    })
})

bot.login(config.TOKEN) // Logs in to the bot using the config token

// CODE PUT TOGETHER BY JGOUKEN