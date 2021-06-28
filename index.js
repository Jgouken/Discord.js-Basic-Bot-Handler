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
    setTimeout(() => {
      // This repeats every set time
      bot.user.setPresence({
        status: 'online',
        // online, offline, dnd, idle
        activity: {
          name: `${bot.guilds.cache.size} servers! | ${config.prefix}test`,
          type: 'WATCHING',
          // LISTENING, WATCHING, PLAYING, STREAMING, and COMPETING
        }
      })
    }, 30 * 1000)
    // x * 1000 are seconds
  
    console.log('\n\nBOT IS RUNNING!\n\n');
  
    bot.on('message', async message => {
        if (message.author.bot) return;
        if (message.channel.type == 'dm') return;
        if (!message.content.toLocaleLowerCase().startsWith(config.prefix)) return;
        if (!(message.guild.me).hasPermission("SEND_MESSAGES")) return;

        const input = message.content.slice(config.prefix.length).trim()
        if (!input.length) return; // If the message is just the prefix

        const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/); // Declares the name of the command and the arguments given
        if (bot.commands.get(command)) called.execute(message, commandArgs, config, bot) // If the command exists, execute it.

        // Want to try the test command? Make sure you set up the config.js file and the package.json file.
        // Currently, the only command is "test" and the prefix is defaulted to !
        // In a server with your bot, type !test to execute the test file!
        // What should happen is the bot should add a 👍 reaction to your message.
        // If that doesn't happen, check in the console for any error messages.
    })
})

bot.login(config.TOKEN)

// CODE PUT TOGETHER BY JGOUKEN ON GITHUB