module.exports = {
    name: `test`,
    //     ^^^^ Preferably Lowercase; Spaces aren't read;
    // Duplicate names will cause problems.
    // This file is run by typing "!test" in Discord
    // If this was named 'help', it would run by typing "!help"

    async execute(message, args, config, client) {
        // These parameters are set in index.js. If index.js is changed, this may have to change as well.
        message.channel.send(`Hello world and and all who inhabit it!`)
        // Send a message to the channel that the message was typed in.
        message.react('👍')
        // Reacts to the message.

        /*
        Any code to do!

        Create a new command:
        - Add a new file (name it whatever you want).
        - Create a new module.exports like this file.
        - At the top of the file, you can set name to any (lowercase) string.

        Parameters:
        - "message" https://discord.js.org/#/docs/main/stable/class/Message
        - "args" is the arguments of the message; Ex.: '!test This works' --> 'This works'
        - "config" accesses all variables in the config file.
        - "client" is the bot's client.

        - Any added parameters must be set in index.js in an identical order. Execute parameters must be the same in all files.
        - Parameters work as local variables; Their values can be changed within the function.
        */

    }
}
