module.exports = {
    name: `test`, // Name of command should be the name of the file

    execute(message, args, config, client) { // parameters set in index
        message.react('👍')
        // Any code to do! Check config.js for all configurations

        // To create new commands:
        // add a new file
        // copy what is here into there
        // Duplicate names may cause problems.

        // "message" defines the message as a whole, including author, channel, guild and otherwise
        // "args" is the arguments of the message; For example: anything after !test
        // "config" accesses all variables in the config file (defaulted Discord, bot, TOKEN, and prefix)
        // "client" is the bot client.
    }
}