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
  bot.user.setPresence({
    status: 'online',
          // online, offline, dnd, idle
    activity: {
      name: `${config.prefix}test`,
      type: 'WATCHING',
          // LISTENING (to), WATCHING, PLAYING, STREAMING, COMPETING (in)
    }
  })
  
    bot.on('message', async message => {
        if (message.author.bot) return;
        if (message.channel.type == 'dm') return;
        if (!message.content.toLocaleLowerCase().startsWith(config.prefix)) return;
        if (!(message.guild.me).hasPermission("SEND_MESSAGES")) return;

        const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/); // Declares the name of the command and the arguments given
        if (bot.commands.get(command)) called.execute(message, commandArgs, config, bot) // If the command exists, execute it with the following parameters.

        // Want to try the test command?
        // Make sure you set up the config.js file and the package.json file.
        // In a server with your bot, type !test to execute the test file!
        // Your bot should respond to the message and give it a thumbs up.
        // If that doesn't happen, check in the console for any error messages.
    })
})

bot.login(config.TOKEN)

// CODE PUT TOGETHER BY JGOUKEN ON GITHUB