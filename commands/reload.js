module.exports = {
  name: 'reload',
  description: 'Reloads a command',
  aliases: ['recargar'],
  args: true,
  cooldown: 10,
  usage: '[comando]',
  execute(message, args) {
    const commandName = args[0].toLowerCase()
    const command =
      message.client.commands.get(commandName) ||
      message.client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
      )

    if (!command)
      return message.channel.send(
        `no existe un comando con el nombre \`${commandName}\`, intenta de nuevo ${message.author}!`
      )
    delete require.cache[require.resolve(`./${commandName}.js`)]
    try {
      const newCommand = require(`./${commandName}.js`)
      message.client.commands.set(newCommand.name, newCommand)
      message.channel.send(`comando recargado de manera correcta`)
    } catch (error) {
      console.log(error)
      message.channel.send(
        `hubo un error recargando el comando \`${commandName}\`:\n\`${error.message}\``
      )
    }
  },
}
