module.exports = {
    name: `test`,
    // Lowercase is preferable; Spaces aren't read; Ex. !test

    execute(message, args, config, client) {
        // parameters set in index.js
        message.channel.send(`Hello world and and all who inhabit it!`)
        message.react('👍')

        /*
        Any code to do!

        Create a new command:
        - Add a new file (name it whatever you want).
        - Create a new module.exports like this.
        - Duplicate names may cause problems.

        Parameters:
        - "message" https://discord.js.org/#/docs/main/stable/class/Message
        - "args" is the arguments of the message; Ex.: '!test This works' --> 'This works'
        - "config" accesses all variables in the config file (defaulted Discord, bot, TOKEN, and prefix)
        - "client" is the bot client.

        - Any added parameters must be set in index.js in identical order.
        - The parameters above work as constants; All their names can be changed with the same properties.
        */
    }
}
