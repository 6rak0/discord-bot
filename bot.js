const fs = require('fs')
const Discord = require('discord.js')
const { prefix, token } = require('./config.json')

const client = new Discord.Client()
client.commands = new Discord.Collection()
const cooldowns = new Discord.Collection()

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.once('ready', () => {
  console.log('rho online and ready!')
})

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const args = message.content.slice(prefix.length).split(/ +/)
  const commandName = args.shift().toLowerCase()

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    )

  if (!command) return message.reply('comando inexistente')
  if (command.args && !args.length) {
    let reply = `No pusiste argumentos al comando, ${message.author}!`

    if (command.usage) {
      reply += `\nel uso correcto es: \`${prefix}${command.name} ${command.usage}\``
    }

    return message.channel.send(reply)
  }

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection())
  }

  const now = Date.now()
  const timestamps = cooldowns.get(command.name)
  const cooldownAmount = (command.cooldown || 3) * 1000

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000
      return message.reply(
        `espera ${timeLeft.toFixed(1)} segundos para usar \`${
          command.name
        }\` de nuevo.`
      )
    }
  }
  timestamps.set(message.author.id, now)
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply('ocurrió un error tratando de ejecutar ese comando')
  }
})
client.login(token)
