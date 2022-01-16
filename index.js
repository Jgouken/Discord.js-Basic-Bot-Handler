const config = require('./config/config')
const {bot, Discord} = require('./config/config')
const fs = require('fs')
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// Finds all files ending with .js in the folder called "commands"
for (const file of commandFiles) {
  // Gets all commands and their contents
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

bot.on('ready', async () => {
  console.log(`\n\n${config.name} IS ONLINE!\n\n`);
  bot.user.setActivity(`${config.prefix}help`, { type: "WATCHING"})
	// LISTENING, WATCHING, PLAYING, STREAMING, COMPETING
  
    bot.on('messageCreate', async message => {
        if (message.author.bot) return;
        if (message.channel.type == 'dm') return;
        if (!message.content.toLocaleLowerCase().startsWith(config.prefix.toLocaleLowerCase())) return; // Remove .toLocaleLowerCase() to make the prefix case-sensitive.
        if (!(message.guild.me).permissions.has("SEND_MESSAGES")) return;

        const commandArgs = message.content.slice(config.prefix.length).trim().split(/ +/);
	      const command = commandArgs.shift().toLowerCase(); // Declares the name of the command and the arguments given
        const called = bot.commands.get(command)
        if (called) called.execute(message, commandArgs, config, bot) // If the command exists, execute it with the following parameters.

        // Want to try the test command?
        // Make sure you set up the config.js file and the package.json file.
        // In a server with your bot, type !test to execute the test file!
        // Your bot should respond to the message and give it a thumbs up.
        // If that doesn't happen, check in the console for any error messages.
    })
})

bot.login(config.TOKEN)

// CODE PUT TOGETHER BY JGOUKEN ON GITHUB
