const { prefix } = require('../config.json')
module.exports = {
  name: 'help',
  description: 'Lista de los comandos o ayuda sobre alguno en específico',
  aliases: ['commands', 'ayuda', 'comandos'],
  usage: '[comando]',
  cooldown: 5,
  execute(message, args) {
    const data = []
    const { commands } = message.client

    if (!args.length) {
      data.push('Esta es la lista de comandos:')
      data.push(commands.map((command) => command.name).join(', '))
      data.push(
        `\nPuedes utilizar \`${prefix}ayuda [nombre del comando]\` para obtener información sobre ese comando en específico`
      )

      return message.author
        .send(data, { split: true })
        .then(() => {
          if (message.channel.type === 'dm') return
          message.reply('Lista de comandos enviada vía DM')
        })
        .catch((error) => {
          console.error(
            `No se pudo enviar DM a ${message.author.tag}.\n`,
            error
          )
          message.reply('No puedo enviarte DM, ¿los tienes habilitados?')
        })
    }
    const name = args[0].toLowerCase()
    const command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name))

    if (!command) {
      return message.reply('comando inválido')
    }

    data.push(`**Nombre:** ${command.name}`)

    if (command.aliases) data.push(`**Alias:** ${command.aliases.join(', ')}`)
    if (command.description)
      data.push(`**Descripción:** ${command.description}`)
    if (command.usage)
      data.push(`**Uso:** ${prefix}${command.name} ${command.usage}`)

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`)

    message.channel.send(data, { split: true })
  },
}
